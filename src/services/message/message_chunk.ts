import { BehaviorSubject } from 'rxjs';
import { IdsChunk, MessagesChunk } from 'cache/fastStorages/indices/messageHistory';
import { Peer } from 'mtproto-js';
import { messageCache } from 'cache';
import { Direction } from './types';
import { LOAD_CHUNK_LENGTH, loadContinuousMessages } from './helpers';

export interface MessageHistoryChunk extends IdsChunk {
  readonly loadingNewer?: boolean;
  readonly loadingOlder?: boolean;
}

export interface MessageChunkService {
  readonly history: BehaviorSubject<MessageHistoryChunk>;

  // Returns <0 if the message is older than chunk, =0 if inside chunk, >0 if newer than chunk, null when unknown.
  getMessageRelation(messageId: number): number | null;

  loadMore(direction: Direction.Newer | Direction.Older): void;

  // Also makes sure that the `history` subject won't be updated
  destroy(): void;
}

/**
 * Drives 1 chunk of a message history.
 *
 * Tip: give messageId = Infinity to make a chunk of the newest messages.
 */
export default function makeMessageChunk(peer: Peer, messageId: Exclude<number, 0>): MessageChunkService {
  let isDestroyed = false;
  let isUpdatingCacheChunk = false;

  const historySubject = new BehaviorSubject<MessageHistoryChunk>({ ids: [] });

  const cacheChunkRef = messageCache.indices.history.makeChunkReference(peer, messageId);
  const cacheSubscription = cacheChunkRef.history.subscribe((chunk) => {
    if (!isUpdatingCacheChunk) {
      historySubject.next({
        ...historySubject.value,
        ...chunk,
      });
    }
  });

  async function loadMessages(direction: Direction, fromId?: number, toId?: number) {
    if (
      ((direction === Direction.Around || direction === Direction.Older) && historySubject.value.loadingOlder)
      || ((direction === Direction.Around || direction === Direction.Newer) && historySubject.value.loadingNewer)
    ) {
      return;
    }

    try {
      historySubject.next({
        ...historySubject.value,
        loadingOlder: direction === Direction.Around || direction === Direction.Older ? true : historySubject.value.loadingOlder,
        loadingNewer: direction === Direction.Around || direction === Direction.Newer ? true : historySubject.value.loadingNewer,
      });

      let result: MessagesChunk;
      try {
        result = await loadContinuousMessages(peer, direction, fromId, toId);
      } catch (err) {
        if (!isDestroyed && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('Failed to load messages history part', { peer, direction, fromId, toId, err });
        }
        return;
      }

      if (isDestroyed) {
        return;
      }

      try {
        isUpdatingCacheChunk = true;
        cacheChunkRef.putChunk(result);
      } finally {
        isUpdatingCacheChunk = false;
      }
    } finally {
      if (!isDestroyed) {
        historySubject.next({
          ...cacheChunkRef.history.value,
          loadingOlder: direction === Direction.Around || direction === Direction.Older ? false : historySubject.value.loadingOlder,
          loadingNewer: direction === Direction.Around || direction === Direction.Newer ? false : historySubject.value.loadingNewer,
        });
      }
    }
  }

  function loadMore(direction: Direction.Newer | Direction.Older) {
    if (isDestroyed) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('Called `loadMore` on a destroyed message chunk. Ignoring the call.');
      }
      return;
    }

    const history = cacheChunkRef.history.value;
    switch (direction) {
      case Direction.Newer:
        if (!history.newestReached) {
          const offset_id = history.ids[0];
          loadMessages(Direction.Newer, offset_id);
        }
        break;
      case Direction.Older:
        if (!history.oldestReached) {
          const offset_id = history.ids[history.ids.length - 1];
          loadMessages(Direction.Older, offset_id);
        }
        break;
      default:
    }
  }

  function destroy() {
    if (isDestroyed) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('Called `destroy` on a destroyed message chunk. Ignoring the call.');
      }
      return;
    }

    isDestroyed = true;
    cacheSubscription.unsubscribe();
    cacheChunkRef.revoke();
  }

  function makeSureChunkHasMessages() {
    const { ids, newestReached, oldestReached } = cacheChunkRef.history.value;

    if (messageId === Infinity) {
      if (ids.length < LOAD_CHUNK_LENGTH && !oldestReached) {
        loadMessages(Direction.Older, ids.length ? ids[ids.length - 1] : undefined);
      }
      return;
    }

    if (messageId === -Infinity) {
      if (ids.length < LOAD_CHUNK_LENGTH && !newestReached) {
        loadMessages(Direction.Older, ids.length ? ids[0] : undefined);
      }
      return;
    }

    const messageIndex = cacheChunkRef.getMessageIndex(messageId);
    const minSideCount = Math.floor(LOAD_CHUNK_LENGTH / 2) - 1;
    if (
      (messageIndex < minSideCount && !newestReached)
      || (ids.length - messageIndex - 1 < minSideCount && !oldestReached)
    ) {
      loadMessages(Direction.Around, messageId);
    }
  }

  makeSureChunkHasMessages();

  return {
    history: historySubject,
    loadMore,
    getMessageRelation: cacheChunkRef.getMessageRelation,
    destroy,
  };
}
