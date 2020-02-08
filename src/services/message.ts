import { BehaviorSubject } from 'rxjs';
import client from 'client/client';
import { Message, Peer, AnyUpdateMessage, AnyUpdateShortMessage } from 'cache/types';
import { chatCache, messageCache, userCache } from 'cache';
import { peerToInputPeer } from 'cache/accessors';
import { MessagesChunkReference } from 'cache/fastStorages/indices/messagesByPeers';
import { getUserMessageId, peerMessageToId, peerToId, shortMessageToMessage, shortChatMessageToMessage } from 'helpers/api';

const enum Direction {
  Older,
  Newer,
  Around,
}

export const enum LoadingSide {
  Old,
  New,
}

const LOAD_CHUNK_LENGTH = 35;

const DIRECTION_TO_SIDE: Record<Direction, LoadingSide[]> = {
  [Direction.Older]: [LoadingSide.Old],
  [Direction.Newer]: [LoadingSide.New],
  [Direction.Around]: [LoadingSide.Old, LoadingSide.New],
};

/**
 * Singleton service class for handling messages stuff
 */
export default class MessagesService {
  activePeer = new BehaviorSubject<Peer | null>(null);

  loadingSides = new BehaviorSubject<LoadingSide[]>([]);

  focusedMessageId = new BehaviorSubject<number | undefined>(undefined);

  history = new BehaviorSubject<Readonly<number[]>>([]);

  protected cacheChunkRef?: MessagesChunkReference;

  constructor() {
    client.updates.on('updateNewMessage', (update: AnyUpdateMessage) => {
      this.handleMessagePush(update.message);
    });

    client.updates.on('updateShortMessage', (update: AnyUpdateShortMessage) => {
      const message = shortMessageToMessage(client.getUserID(), update);
      this.handleMessagePush(message);
    });

    client.updates.on('updateShortChatMessage', (update: AnyUpdateShortMessage) => {
      const message = shortChatMessageToMessage(update);
      this.handleMessagePush(message);
    });

    client.updates.on('updateNewChannelMessage', (update: AnyUpdateMessage) => {
      this.handleMessagePush(update.message);
    });

    client.updates.on('updateDeleteMessages', (update: any) => {
      // console.log('updateDeleteMessage', update);
      update.messages.forEach((messageId: number) => messageCache.remove(getUserMessageId(messageId)));
    });

    client.updates.on('updateDeleteChannelMessages', (update: any) => {
      // console.log('updateDeleteChannelMessages', update);
      update.messages.forEach((messageId: number) => messageCache.remove(
        peerMessageToId({ _: 'peerChannel', channel_id: update.channel_id }, messageId),
      ));
    });
  }

  selectPeer(peer: Peer | null) {
    if (
      (peer && this.activePeer.value && peerToId(peer) === peerToId(this.activePeer.value))
      || (!peer && !this.activePeer.value)
    ) {
      return;
    }

    if (this.cacheChunkRef) {
      this.cacheChunkRef.revoke();
      this.cacheChunkRef = undefined;
    }

    this.loadingSides.next([]);
    this.activePeer.next(peer);
    this.focusedMessageId.next(undefined);

    if (peer) {
      this.cacheChunkRef = messageCache.indices.peers.makeChunkReference(peer, Infinity);
      this.cacheChunkRef.history.subscribe(({ ids }) => this.history.next(ids));
      const { ids } = this.cacheChunkRef.history.value;
      if (ids.length < LOAD_CHUNK_LENGTH) {
        this.loadMessages(Direction.Older, ids[0] /* undefined is welcome here */);
      }
      if (ids.length > 0) {
        this.loadMessages(Direction.Newer, ids[0], 0);
      }
    }
  }

  /**
   * Messages with id equal fromId and toId are not included to the result
   */
  protected loadMessages(direction: Direction, fromId?: number, toId?: number) {
    if (!this.activePeer.value) {
      return;
    }

    const loadingSides = DIRECTION_TO_SIDE[direction];
    if (this.loadingSides.value.some((side) => loadingSides.includes(side))) {
      return;
    }
    this.loadingSides.next(loadingSides);

    if (direction === Direction.Newer && toId !== undefined) {
      direction = Direction.Older; // eslint-disable-line no-param-reassign
      [fromId, toId] = [toId, fromId]; // eslint-disable-line no-param-reassign
    }

    if (process.env.NODE_ENV === 'development') {
      if (direction === Direction.Around && toId !== undefined) {
        // eslint-disable-next-line no-console
        console.warn('The toId parameter gives no effect with Direction.Around');
      }
    }

    const cacheChunkRef = this.cacheChunkRef!; // Remember for the case when the peer or chunk changes during the loading
    const payload = {
      peer: peerToInputPeer(this.activePeer.value),
      offset_id: 0,
      offset_date: 0,
      add_offset: 0,
      limit: 0,
      max_id: 0,
      min_id: 0,
      hash: 0,
    };
    switch (direction) {
      case Direction.Older:
        payload.offset_id = fromId || 0;
        if (toId === undefined) {
          payload.limit = LOAD_CHUNK_LENGTH;
        } else {
          payload.min_id = toId;
        }
        break;
      case Direction.Newer:
        payload.offset_id = fromId || 1;
        payload.add_offset = -LOAD_CHUNK_LENGTH - 1; // -1 to not include fromId itself
        payload.limit = LOAD_CHUNK_LENGTH;
        break;
      case Direction.Around:
        payload.offset_id = fromId || 0;
        payload.add_offset = Math.round(-LOAD_CHUNK_LENGTH / 2);
        payload.limit = LOAD_CHUNK_LENGTH;
        break;
      default:
    }

    // console.log('loadMessages - request', payload);
    client.call('messages.getHistory', payload, (_err: any, res: any) => {
      // Another peer or chunk is loading at the moment
      const isLoadedChunkActual = cacheChunkRef === this.cacheChunkRef;

      try {
        if (res) {
          const data = res;
          // console.log('loadMessages - response', data);

          userCache.put(data.users);
          chatCache.put(data.chats);

          // todo: The replied messages are not included. Load the messages that aren't loaded.

          if (isLoadedChunkActual) {
            const isLoadedChunkFull = data.messages.length >= LOAD_CHUNK_LENGTH - 10; // -10 just in case
            let oldestReached = false;
            let newestReached = false;
            switch (direction) {
              case Direction.Older:
                if (!fromId) {
                  newestReached = true;
                }
                if (!toId && !isLoadedChunkFull) {
                  oldestReached = true;
                }
                break;
              case Direction.Newer:
                if (!fromId) {
                  oldestReached = true;
                }
                if (!isLoadedChunkFull) {
                  newestReached = true;
                }
                break;
              default:
            }

            cacheChunkRef.putChunk({
              messages: data.messages,
              newestReached,
              oldestReached,
            });
          } else {
            messageCache.put(data.messages);
          }
        }
      } finally {
        if (isLoadedChunkActual) {
          this.loadingSides.next(this.loadingSides.value.filter((side) => !loadingSides.includes(side)));
        }
      }
    });
  }

  loadMoreHistory() {
    const history = this.cacheChunkRef && this.cacheChunkRef.history.value;
    if (history && !history.oldestReached) {
      const offset_id = history.ids[history.ids.length - 1];
      this.loadMessages(Direction.Older, offset_id);
    }
  }

  protected handleMessagePush(message: Message) {
    if (message._ === 'messageEmpty') {
      return;
    }

    messageCache.indices.peers.putNewestMessage(message);
  }
}
