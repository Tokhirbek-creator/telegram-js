import { map } from 'rxjs/operators';
import { Peer } from 'cache/types';
import { chatCache, userCache } from 'cache';
import { MaybeObservable } from 'core/types';
import { span, text } from 'core/html';
import { mount } from 'core/dom';

export default function peerTitle(peer: Peer) {
  const element = span();
  let content: MaybeObservable<string> = 'Unknown';

  switch (peer._) {
    case 'peerUser': {
      const userSubject = userCache.useItemBehaviorSubject(element, peer.user_id);
      content = userSubject.pipe(map((user) => user ? `${user.first_name} ${user.last_name}` : 'Unknown'));
      break;
    }

    case 'peerChat': {
      const chatSubject = chatCache.useItemBehaviorSubject(element, peer.chat_id);
      content = chatSubject.pipe(map((chat) => chat ? chat.title : 'Unknown'));
      break;
    }

    case 'peerChannel': {
      const chatSubject = chatCache.useItemBehaviorSubject(element, peer.channel_id);
      content = chatSubject.pipe(map((chat) => chat ? chat.title : 'Unknown'));
      break;
    }

    default:
  }

  mount(element, text(content));
  return element;
}
