import { Peer, Message } from 'cache/types';
import { peerToId } from 'helpers/api';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import Collection from '../collection';
import { orderBy } from '.';

export default function sharedMediaIndex(collection: Collection<Message, any>) {
  const createInvertedIndex = () => ({ invertedOrder: orderBy<Message>((m1, m2) => m2.id - m1.id) });
  const createEmptySnapshot = () => new Collection<Message, ReturnType<typeof createInvertedIndex>, number>({
    getId: (item) => item.id,
    indices: createInvertedIndex(),
  });

  const cache: Record<string, { snapshot: ReturnType<typeof createEmptySnapshot>, subject: Subject<Message[]> }> = {};

  collection.changes.subscribe((collectionChanges) => {
    collectionChanges.forEach(([action, item]) => {
      switch (action) {
        case 'remove': {
          if (item._ === 'message') {
            const cacheLine = cache[`user_${item.from_id}`];
            if (cacheLine) {
              cacheLine.snapshot.remove(item.id);
              cacheLine.subject.next(cacheLine.snapshot.getAll());
            }
          }
          break;
        }
        default:
      }
    },
    );
  });

  function getCacheLine(peer: Peer) {
    let cacheLine = cache[peerToId(peer)];
    if (!cacheLine) {
      cacheLine = { snapshot: createEmptySnapshot(), subject: new ReplaySubject(1) };
      cache[peerToId(peer)] = cacheLine;
    }
    return cacheLine;
  }

  return {
    putMediaMessages(peer: Peer, messages: Message[]) {
      if (!messages.length) {
        return;
      }

      collection.put(messages);
      const cacheLine = getCacheLine(peer);
      cacheLine.snapshot.batchChanges(() => messages.forEach((m) => cacheLine.snapshot.put(m)));
      const snapshot = cacheLine.snapshot.indices.invertedOrder.getItems();
      cacheLine.subject.next(snapshot);
    },

    getPeerMedia(peer: Peer): Observable<Message[]> {
      return getCacheLine(peer).subject;
    },

    getEarliestPeerMedia(peer: Peer): Message | undefined {
      const cacheLine = getCacheLine(peer);
      return cacheLine.snapshot.indices.invertedOrder.getItemAt(cacheLine.snapshot.indices.invertedOrder.getLength() - 1);
    },
  };
}
