import { div, text, nothing } from 'core/html';
import { mount, unmountChildren } from 'core/dom';
import { useOnMount, useObservable, useInterface, getInterface, hasInterface } from 'core/hooks';
import { Peer, MessageCommon, Message } from 'cache/types';
import { messageCache } from 'cache';
import { datetime, formattedMessage } from 'components/ui';
import { profileAvatar, profileTitle } from 'components/profile';
import { userIdToPeer } from 'helpers/api';
import { idToColorCode } from 'cache/accessors';
import { isEmoji } from 'helpers/message';
import { auth } from 'services';
import serviceMessage from './message_service';
import messageMedia from './message_media';
import './message.scss';
import emojiMessage from './message_emoji';
import messageReply from './message_reply';

interface MessageHooks {
  getFromID(): number;
}

export default function message(uniqueId: string, peer: Peer) {
  const inner = div`.message__inner`();
  const container = div`.message`(inner);
  const subject = messageCache.useItemBehaviorSubject(container, uniqueId);
  const msg = subject.value;

  // todo return null
  if (!msg || msg._ === 'messageEmpty') return div();
  if (msg._ === 'messageService') return serviceMessage(msg);

  const out = msg.from_id === auth.userID ? 'out' : '';

  if (out) container.classList.add('out');

  let prev: MessageCommon | undefined;
  let picture: HTMLElement | undefined;
  let title: HTMLElement | undefined;
  let media: HTMLElement | null | undefined;
  let reply: HTMLElement | null;

  // Rerender on change
  const rerender = (next: Message) => {
    if (!next || next._ === 'messageEmpty') return;
    if (next._ === 'messageService') return;

    let wrapper = null;
    let shouldRerender = false;

    // mount picture if it is first call
    if ((!picture || !prev) && !out && peer._ !== 'peerUser') {
      const fromPeer = userIdToPeer(msg.from_id);
      picture = profileAvatar(fromPeer, next);
      title = div`.message__title${`color-${idToColorCode(next.from_id)}`}`(profileTitle(fromPeer));

      container.classList.add('chat');

      shouldRerender = true;
    }

    if (!prev || prev.media !== next.media) {
      shouldRerender = true;

      if (msg.media && msg.media._ !== 'messageMediaEmpty') {
        media = messageMedia(msg.media);
      } else {
        media = null;
      }
    }

    // Rerender if message text changed
    if (!prev || prev.message !== next.message) shouldRerender = true;

    if (shouldRerender) {
      // Render only media, without message text
      if (!next.message && media) {
        container.classList.add('media');

        if (media.classList.contains('sticker')) {
          wrapper = media;
        } else {
          wrapper = div`.message__baloon`(media);
        }
      } else {
        container.classList.remove('media');
      }

      // Display only emoji
      if (!media && next.message.length <= 6 && isEmoji(next.message)) {
        wrapper = emojiMessage(next.message, next.date);
        container.classList.add('as-emoji');
      } else {
        container.classList.remove('as-emoji');
      }

      // Display reply
      if (next.reply_to_msg_id) {
        reply = messageReply(peer, next.reply_to_msg_id);
      }

      // Common message
      if (!wrapper && next.message) {
        wrapper = div`.message__baloon`(
          media || nothing,
          div`.message__content`(
            div`.message__text`(
              title || nothing,
              reply || nothing,
              formattedMessage(next),
            ),
          ),
          div`.message__date`(
            datetime({ timestamp: msg.date, date: false }),
          ),
        );

        if (media) container.classList.add('with-media');
        else container.classList.remove('with-media');
      }

      // Fallback
      if (!wrapper && !next.message) {
        wrapper = div`.message__baloon`(
          div`.message__content`(
            div`.message__text.fallback`(
              title || nothing,
              text('This type of message is not implemented yet'),
            ),
          ),
          div`.message__date`(
            datetime({ timestamp: msg.date, date: false }),
          ),
        );
      }

      unmountChildren(inner);
      if (picture) mount(inner, picture);
      if (wrapper) mount(inner, wrapper);
    }

    prev = next;
  };

  rerender(msg);

  useObservable(container, subject, (next) => next && rerender(next));

  useOnMount(container, () => {
    const nextEl = container.nextElementSibling;
    const pinterface = nextEl && hasInterface<MessageHooks>(nextEl) ? getInterface(nextEl) : null;

    if (!nextEl) container.classList.add('last');
    if (nextEl && pinterface && pinterface.getFromID && msg.from_id !== pinterface.getFromID()) {
      nextEl.classList.add('first');
      container.classList.add('last');
    }
  });

  return useInterface(container, {
    getFromID() {
      return msg.from_id;
    },
  });
}
