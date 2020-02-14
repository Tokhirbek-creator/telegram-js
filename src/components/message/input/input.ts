import { div } from 'core/html';
import { mount, listen } from 'core/dom';
import { smile, attach } from 'components/icons';
import { message, media } from 'services';
import { getInterface, useListenWhileMounted } from 'core/hooks';
import { Document } from 'cache/types';
import stickMojiPanel from './input_stickmoji';
import messageTextarea from './input_textarea';
import './input.scss';

export default function messageInput() {
  const element = div`.msginput`();
  const textarea = messageTextarea({ onSend: message.sendMessage });
  const emojiIcon = div`.msginput__emoji`(smile());
  const attchIcon = div`.msginput__attach`(attach());
  const stickmojiPanelEl = stickMojiPanel({
    onSelectEmoji: (emoji: string) => {
      getInterface(textarea).insertText(emoji);
    },
    onSelectSticker: (sticker: Document) => {
      message.sendMediaMessage({
        _: 'inputMediaDocument',
        id: {
          _: 'inputDocument',
          id: sticker.id,
          access_hash: sticker.access_hash,
          file_reference: sticker.file_reference,
        },
      });
    },
  });

  const container = div`.msginput__container`(
    div`.msginput__bubble_wrap`(
      stickmojiPanelEl,
      div`.msginput__bubble`(
        emojiIcon,
        textarea,
        attchIcon,
      ),
    ),
    div`.msginput__btn`(),
  );

  let closeTimer: number | undefined;
  const closeDelay = 300;

  const openPanel = () => {
    if (closeTimer) clearTimeout(closeTimer);
    stickmojiPanelEl.classList.add('opened');
    emojiIcon.classList.add('active');
  };

  const closePanel = () => {
    stickmojiPanelEl.classList.remove('opened');
    emojiIcon.classList.remove('active');
  };

  const closePanelDelayed = () => {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(closePanel as TimerHandler, closeDelay);
  };

  listen(emojiIcon, 'mouseenter', openPanel);
  listen(emojiIcon, 'mouseleave', closePanelDelayed);
  listen(stickmojiPanelEl, 'mouseenter', openPanel);
  listen(stickmojiPanelEl, 'mouseleave', closePanelDelayed);

  mount(element, container);
  container.classList.remove('hidden');

  // upload with dragndrop
  useListenWhileMounted(element, document, 'dragenter', (event: Event) => event.preventDefault());
  useListenWhileMounted(element, document, 'dragleave', (event: Event) => event.preventDefault());
  useListenWhileMounted(element, document, 'dragover', (event: Event) => event.preventDefault());
  useListenWhileMounted(element, document, 'drop', (event: DragEvent) => {
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      media.attachFiles(event.dataTransfer.files);
    }

    event.preventDefault();
  });

  return element;
}
