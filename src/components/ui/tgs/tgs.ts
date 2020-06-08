import loadLottie from 'lazy-modules/lottie';
import { div } from 'core/html';
import { useInterface, useOnUnmount } from 'core/hooks';
import { watchVisibility } from 'core/dom';
import { TGSManager } from './lottie.browser';
import './tgs.scss';

interface Props {
  src: string,
  className?: string,
  autoplay?: boolean,
  loop?: boolean,
  playOnHover?: boolean,
  offscreen?: boolean,
  width?: number,
  height?: number,
  onLoad?: () => void;
}

export function tgsFreeze() {}
export function tgsUnFreeze() {}

export default function tgs({
  src,
  className,
  autoplay = true,
  loop = false,
  offscreen = true,
  onLoad,
}: Props) {
  const animation = new TGSManager(src, { loop, offscreen, onLoad });
  const container = div({ className }, animation.element);

  useOnUnmount(container, () => {
    animation.destroy();
  });

  watchVisibility(container, (isVisible) => {
    if (isVisible && autoplay) animation.play();
    else animation.pause();
  });

  return useInterface(container, animation);
}

/**
 * Call it to preload the required assets before creating a TGS element. It can be called multiple times.
 *
 * It should be used when you load a TGS URL before creating a TGS element.
 * Such way the TGS and the assets will be loading simultaneously.
 */
export function preloadTgsAssets() {
  if (!('transferControlToOffscreen' in HTMLCanvasElement.prototype)) loadLottie();
}
