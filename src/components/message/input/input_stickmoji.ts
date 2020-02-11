import { div, text } from 'core/html';
import emojiPanel from 'components/media/emoji/panel';
import stickerPanel from 'components/media/sticker/panel';
import './input_stickmoji.scss';
import { listen, getAttribute, mount, listenOnce, unmount } from 'core/dom';
import { getInterface, hasInterface } from 'core/hooks';
import { Document } from 'cache/types';

type Props = {
  onSelectEmoji: (emoji: string) => void,
  onSelectSticker: (sticker: Document) => void,
};

export default function stickMojiPanel({ onSelectEmoji, onSelectSticker }: Props) {
  const tabs = [
    div`.stickmoji-panel__tab`({ 'data-index': '0' }, text('Emoji')),
    div`.stickmoji-panel__tab`({ 'data-index': '1' }, text('Stickers')),
  ];

  const panels = [
    emojiPanel(onSelectEmoji),
    stickerPanel(onSelectSticker),
  ];

  let selected = 0;
  let isLocked = false;

  tabs[selected].classList.add('active');

  const content = div`.stickmoji-panel__content`(
    panels[selected],
  );

  const clickHandler = (event: MouseEvent) => {
    if (!event.currentTarget) return;
    if (isLocked) return;

    const next = +getAttribute(event.currentTarget as HTMLElement, 'data-index');

    if (selected === next) return;

    isLocked = true;

    const removingEl = panels[selected];

    let direction = 'left';
    if (next < selected) direction = 'right';

    tabs[selected].classList.remove('active');
    tabs[next].classList.add('active');
    panels[next].classList.add(`appearing-${direction}`);

    removingEl.classList.add(`removing-${direction}`);

    listenOnce(removingEl, 'transitionend', () => {
      removingEl.classList.remove(`removing-${direction}`);
      unmount(removingEl);
      panels[selected].classList.remove(`appearing-${direction}`);
      isLocked = false;
    });

    selected = next;

    mount(content, panels[selected]);
  };

  for (let i = 0; i < tabs.length; i += 1) listen(tabs[i], 'click', clickHandler);

  const container = div`.stickmoji-panel`(
    div`.stickmoji-panel__tabs`(
      ...tabs,
    ),
    content,
  );

  listenOnce(container, 'transitionend', () => {
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      if (hasInterface<{ update:() => void }>(panel)) getInterface(panel).update();
    }
  });

  return container;
}
