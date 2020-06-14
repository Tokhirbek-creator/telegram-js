import { BehaviorSubject, Observable } from 'rxjs';
import client from 'client/client';
import { Document, Peer, StickerSet, MessagesFilter, MessagesMessages, MessagesSavedGifs } from 'mtproto-js';
import { el } from 'core/dom';
import { peerToInputPeer } from 'cache/accessors';
import { chatCache, messageCache, userCache, stickerSetCache } from 'cache';
import { peerToId } from 'helpers/api';
import { getAttributeAudio } from 'helpers/files';
import { stream } from 'client/media';
import { TaskQueue } from 'client/workers/extensions/quene';
import { stickerSetToInput } from 'helpers/photo';
import type MainService from './main';

export const enum MediaPlaybackStatus {
  NotStarted,
  Downloading,
  Playing,
  Stopped,
}

export type MediaPlaybackState = {
  downloadProgress: number,
  playProgress: number,
  status: MediaPlaybackStatus,
};

/**
 * Singleton service class for handling media-related queries
 */
export default class MediaService {
  /** Saved Gifs */
  savedGifsMap = new Map<string, Document.document>();
  savedGifsIds = new BehaviorSubject<string[]>([]);

  mediaLoading: Record<string /* peerId */, Partial<Record<MessagesFilter['_'], boolean>>> = {};

  /** Hash values for sticker sync */
  #recentStickersHash = 0;
  #stickerSetLoadQueue: TaskQueue<StickerSet>;

  /** Attached files for sending */
  attachedFiles = new BehaviorSubject<FileList | undefined>(undefined);

  main: MainService;

  private currentAudioSource?: HTMLSourceElement;
  private currentAudio?: HTMLAudioElement;
  private docPlaying?: Document.document;
  private audioPlayingTimer: any;

  constructor(main: MainService) {
    this.main = main;

    this.#stickerSetLoadQueue = new TaskQueue<StickerSet>({
      process: async (set, complete) => {
        // don't overload thread with requests
        try {
          const result = await client.call('messages.getStickerSet', { stickerset: stickerSetToInput(set) });
          stickerSetCache.indices.stickers.putStickers(set.id, result.documents as Document.document[]);
          complete();
        } catch (err) {
          throw new Error(`Unable to load sticker set: ${JSON.stringify(err)}`);
        }
      },
    });
  }

  /**
   * Load saved gifs
   * Ref: https://core.telegram.org/method/messages.getAllStickers
   */
  async loadSavedGis() {
    let result: MessagesSavedGifs;
    try {
      result = await client.call('messages.getSavedGifs', { hash: 0 });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }

    // save gifs
    if (result._ === 'messages.savedGifs') {
      const ids: string[] = [];

      for (let i = 0; i < result.gifs.length; i++) {
        const doc = result.gifs[i];
        if (doc._ === 'document') {
          this.savedGifsMap.set(doc.id, doc);
          ids.push(doc.id);
        }
      }
      this.savedGifsIds.next(ids);
    }
  }

  /**
   * Load recent sticker sets
   * Ref: https://core.telegram.org/method/messages.getRecentStickers
   */
  async loadSavedStickers() {
    // load recent
    try {
      const result = await client.call('messages.getRecentStickers', { hash: this.#recentStickersHash });

      // update recent stickers cache
      if (result._ === 'messages.recentStickers') {
        this.#recentStickersHash = result.hash;
        stickerSetCache.put({
          _: 'stickerSet',
          id: 'recent',
          access_hash: '',
          title: 'Recent',
          short_name: 'recent',
          count: result.stickers.length,
          hash: 0,
          installed_date: 0xFFFFFFF,
        });
        stickerSetCache.indices.stickers.putStickers('recent', result.stickers as Document.document[]);
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }

    // load saved
    try {
      const result = await client.call('messages.getAllStickers', { hash: 0 });
      if (result._ === 'messages.allStickers') {
        stickerSetCache.put(result.sets);
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  async loadStickerSet(setId: string) {
    const set = stickerSetCache.get(setId);
    const count = stickerSetCache.indices.stickers.getStickers(setId).length;

    if (!set || count > 0) return;

    this.#stickerSetLoadQueue.register(set);
  }

  async loadMedia(peer: Peer, filterType: MessagesFilter['_'], offsetMessageId = 0) {
    const peerId = peerToId(peer);
    if (!this.mediaLoading[peerId]) {
      this.mediaLoading[peerId] = {};
    }
    if (this.mediaLoading[peerId][filterType]) return;

    const chunk = 40;
    const filter = { _: filterType };
    const payload = {
      peer: peerToInputPeer(peer),
      q: '',
      filter,
      min_date: 0,
      max_date: 0,
      offset_id: offsetMessageId || 0,
      add_offset: 0,
      limit: chunk,
      max_id: 0,
      min_id: 0,
      hash: 0,
    };

    let index: typeof messageCache.indices.photoVideos;
    switch (filterType) {
      case 'inputMessagesFilterPhotoVideo':
        index = messageCache.indices.photoVideos;
        break;
      case 'inputMessagesFilterDocument':
        index = messageCache.indices.documents;
        break;
      case 'inputMessagesFilterUrl':
        index = messageCache.indices.links;
        break;
      default:
        throw Error('Unknown filter');
    }

    this.mediaLoading[peerId][filterType] = true;

    let res: MessagesMessages | undefined;
    try {
      res = await client.call('messages.search', payload);
    } catch (err) {
      // todo: handle the error
    } finally {
      this.mediaLoading[peerId][filterType] = false;
    }
    if (res && res._ !== 'messages.messagesNotModified') {
      userCache.put(res.users);
      chatCache.put(res.chats);
      index.putMediaMessages(peer, res.messages);
    }
  }

  isMediaLoading(peer: Peer, filterType: MessagesFilter['_']) {
    return !!this.mediaLoading[peerToId(peer)]?.[filterType];
  }

  attachFiles = (files: FileList) => {
    this.attachedFiles.next(files);
    if (this.main.popup.value !== 'sendMedia') this.main.showPopup('sendMedia');
  };

  private audioInfos: Record<string, BehaviorSubject<Readonly<MediaPlaybackState>>> = {};

  private getPlaybackState(doc: Document.document) {
    let info = this.audioInfos[doc.id];
    if (!info) {
      info = new BehaviorSubject<MediaPlaybackState>({ downloadProgress: 0, playProgress: 0, status: MediaPlaybackStatus.NotStarted });
      this.audioInfos[doc.id] = info;
    }
    return info;
  }

  audioInfo(doc: Document.document): Observable<Readonly<MediaPlaybackState>> {
    return this.getPlaybackState(doc);
  }

  play(doc: Document.document, url: string, position?: number) {
    const audioAttribute = getAttributeAudio(doc)!;

    const time = position !== undefined ? position * audioAttribute.duration : 0;
    if (this.docPlaying) {
      if (this.docPlaying.id === doc.id) {
        this.currentAudio!.currentTime = time;
        return;
      }
      const currentAudioAttribute = getAttributeAudio(this.docPlaying)!;
      if (currentAudioAttribute.voice) {
        this.stopAudio(this.docPlaying);
      } else {
        this.pauseAudio(this.docPlaying);
      }
    }

    this.currentAudioSource!.src = url;
    this.docPlaying = doc;
    this.currentAudio!.load();
    this.currentAudio!.currentTime = time;
    this.currentAudio!.play();
    this.getPlaybackState(doc).next({ downloadProgress: 1, playProgress: position ?? 0, status: MediaPlaybackStatus.Playing });
    this.audioPlayingTimer = setInterval(() => {
      const progress = Math.min(1, this.currentAudio!.currentTime / audioAttribute.duration);
      if (this.currentAudio!.ended) {
        this.getPlaybackState(doc).next({ downloadProgress: 1, playProgress: 0, status: MediaPlaybackStatus.Stopped });
        clearInterval(this.audioPlayingTimer);
        delete this.docPlaying;
      } else {
        this.getPlaybackState(doc).next({ downloadProgress: 1, playProgress: progress, status: MediaPlaybackStatus.Playing });
      }
    }, Math.min(100, audioAttribute.duration * 10));
  }

  stopAudio(doc: Document.document) {
    if (this.currentAudio && doc.id === this.docPlaying?.id) {
      clearInterval(this.audioPlayingTimer);
      this.currentAudio.pause();
      this.getPlaybackState(this.docPlaying!).next({ downloadProgress: 0, playProgress: 0, status: MediaPlaybackStatus.Stopped });
      delete this.docPlaying;
    }
  }

  pauseAudio(doc: Document.document) {
    if (this.currentAudio && doc.id === this.docPlaying?.id) {
      clearInterval(this.audioPlayingTimer);
      this.currentAudio.pause();
      const state = this.getPlaybackState(doc);
      state.next({ ...state.value, status: MediaPlaybackStatus.Stopped });
      delete this.docPlaying;
    }
  }

  resumeAudio(doc: Document.document) {
    const state = this.getPlaybackState(doc);
    this.playAudio(doc, state.value.playProgress);
  }

  playAudio(doc: Document.document, position?: number) {
    if (!this.currentAudio) {
      this.currentAudioSource = el('source');
      this.currentAudio = el('audio', undefined, [this.currentAudioSource]);
    }

    const state = this.getPlaybackState(doc);
    if (state.value.status === MediaPlaybackStatus.NotStarted) {
      state.next({ ...state.value, status: MediaPlaybackStatus.Playing });
    }

    this.play(
      doc,
      stream(doc),
      position,
    );
    // }, (progress) => {
    //   state = this.getPlaybackState(doc);
    //   this.getPlaybackState(doc).next({ ...state.value, downloadProgress: progress / doc.size });
    // });
  }

  downloadAudio(doc: Document.document) {
    // const location = getDocumentLocation(doc);
    // let state = this.getPlaybackState(doc);
    // state.next({ downloadProgress: 0, playProgress: 0, status: MediaPlaybackStatus.Downloading });
    // download(location, { size: doc.size }, () => {
    //   state.next({ downloadProgress: 1, playProgress: 0, status: MediaPlaybackStatus.Stopped });
    // }, (progress) => {
    //   console.log(progress, doc.size);
    //   state = this.getPlaybackState(doc);
    //   this.getPlaybackState(doc).next({ ...state.value, downloadProgress: progress / doc.size });
    // });
  }
}
