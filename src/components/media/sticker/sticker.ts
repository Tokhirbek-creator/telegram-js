import { div, img } from 'core/html';
import { Document } from 'cache/types';
import { mount, listenOnce, unmount, listen } from 'core/dom';
import { getThumbnail } from 'helpers/photo';
import { getDocumentLocation } from 'helpers/files';
import media from 'client/media';
import { tgs } from 'components/ui';
import './sticker.scss';

type StickerOptions = {
  size: string,
  autoplay: boolean,
  onClick?: (sticker: Document) => void,
};

export default function stickerRenderer(sticker: Document, { size = '200px', autoplay = true, onClick }: StickerOptions) {
  const container = div`.sticker`({ style: { width: size, height: size } });
  let thumbnail: HTMLElement | undefined;

  const render = (src: string) => {
    if (sticker.mime_type === 'application/x-tgsticker') {
      const animated = tgs({ src, className: `sticker__tgs${thumbnail ? ' animated' : ''}`, autoplay, loop: true });
      mount(container, animated);

      if (thumbnail) {
        thumbnail.classList.add('removed');
        listenOnce(thumbnail, 'animationend', () => {
          unmount(thumbnail!);
        });
      }
      return;
    }

    if (sticker.mime_type === 'image/webp') {
      const stickerImage = img({ src, className: `sticker__image${thumbnail ? ' animated' : ''}` });
      mount(container, stickerImage);

      // remove thumbnail
      if (thumbnail) {
        thumbnail.classList.add('removed');
        listenOnce(thumbnail, 'animationend', () => {
          unmount(thumbnail!);
        });
      }
    }
  };

  const location = getDocumentLocation(sticker);
  const cached = media.cached(location);

  if (cached) {
    render(cached);
  } else {
    const thumbnailUrl = getThumbnail(sticker.thumbs);
    if (thumbnailUrl) {
      thumbnail = div`.sticker__thumb`(
        img({ src: thumbnailUrl, alt: 'Sticker Preview' }),
      );

      mount(container, thumbnail);
    }

    media.get(location, render, sticker.dc_id, sticker.mime_type);
  }

  if (onClick) listen(container, 'click', () => onClick(sticker));

  return container;
}
