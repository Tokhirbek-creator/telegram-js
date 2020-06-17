import { listen, mount, svgEl } from 'core/dom';
import { useObservable } from 'core/hooks';
import { getAttributeAudio } from 'helpers/files';
import { Document } from 'mtproto-js';
import { Observable } from 'rxjs';
import { MediaPlaybackState } from 'services/audio';
import './waveform.scss';

// Ref: https://github.com/telegramdesktop/tdesktop/blob/0743e71ab6b928d2ee5bae1aed991849b1e2b291/Telegram/SourceFiles/data/data_document.cpp#L1018
function decodeWaveform(encoded5bit: Uint8Array) {
  const bitsCount = encoded5bit.length * 8;
  const valuesCount = Math.floor(bitsCount / 5);
  if (!valuesCount) {
    return [];
  }

  // Read each 5 bit of encoded5bit as 0-31 unsigned char.
  // We count the index of the byte in which the desired 5-bit sequence starts.
  // And then we read a uint16 starting from that byte to guarantee to get all of those 5 bits.
  //
  // BUT! if it is the last byte we have, we're not allowed to read a uint16 starting with it.
  // Because it will be an overflow (we'll access one byte after the available memory).
  // We see, that only the last 5 bits could start in the last available byte and be problematic.
  // So we read in a general way all the entries in a general way except the last one.
  const result = Array(valuesCount);
  const bitsData = encoded5bit;
  for (let i = 0, l = valuesCount - 1; i !== l; ++i) {
    const byteIndex = Math.floor((i * 5) / 8);
    const bitShift = Math.floor((i * 5) % 8);
    const value = bitsData[byteIndex] + (bitsData[byteIndex + 1] << 8);
    result[i] = ((value >> bitShift) & 0x1F);
  }
  const lastByteIndex = Math.floor(((valuesCount - 1) * 5) / 8);
  const lastBitShift = Math.floor(((valuesCount - 1) * 5) % 8);
  const lastValue = bitsData[lastByteIndex] + (bitsData[lastByteIndex + 1] << 8);
  result[valuesCount - 1] = (lastValue >> lastBitShift) & 0x1F;

  return result;
}

function interpolateArray(data: number[], fitCount: number) {
  const newData = new Array(fitCount);
  const springFactor = data.length / fitCount;
  const leftFiller = data[0];
  const rightFiller = data[data.length - 1];
  for (let i = 0; i < fitCount; i++) {
    const idx = Math.floor(i * springFactor);
    newData[i] = ((data[idx - 1] ?? leftFiller) + (data[idx] ?? leftFiller) + (data[idx + 1] ?? rightFiller)) / 3;
  }
  return newData;
}

type Props = {
  doc: Document.document;
  barsCount: number;
  audioInfo: Observable<MediaPlaybackState>;
  onSeek?: (position: number) => void;
  className?: string;
};

export default function waveform({ doc, barsCount, audioInfo, onSeek, className }: Props) {
  const info = getAttributeAudio(doc);

  let waveformDecoded = decodeWaveform(info && info.waveform ? new Uint8Array(info.waveform) : new Uint8Array(0));

  let thumbX = -Infinity;
  let playProgress = -Infinity;

  waveformDecoded = interpolateArray(waveformDecoded, barsCount);
  const peak = Math.max(...waveformDecoded);

  const bars: SVGLineElement[] = [];
  const svg = svgEl('svg', { class: 'waveform', width: barsCount * 4, height: 23, viewBox: `0 0 ${barsCount * 4} 23` });
  if (className) {
    svg.classList.add(className);
  }

  if (onSeek) {
    listen(svg, 'click', (e) => {
      onSeek((e.clientX - svg.getBoundingClientRect().left) / svg.clientWidth);
    });
  }

  const height = 21;
  for (let i = 0; i < barsCount; i++) {
    const value = waveformDecoded[i];
    const barHeight = Math.max(0, Math.round((value * height) / peak));
    const bar = svgEl('line', {
      x1: i * 4 + 1,
      x2: i * 4 + 1,
      y1: 1 + height - barHeight,
      y2: 1 + height,
      'stroke-width': '2',
      stroke: '#F00',
      'stroke-linecap': 'round',
    });
    bars[i] = bar;
    mount(svg, bar);
  }

  const currentBar = svgEl('line', {
    'stroke-width': '2',
    stroke: '#F00',
    'stroke-linecap': 'round',
    opacity: 1,
    class: 'active',
  });
  mount(svg, currentBar);

  const render = () => {
    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i];
      bar.classList.toggle('active', i < playProgress * bars.length - 1);
    }
    const thumbIndex = Math.round(thumbX / 4);
    if (thumbIndex >= 0 && thumbIndex < bars.length) {
      bars[thumbIndex].classList.add('active');
    }

    const pp = Math.max(0, Math.min(1, playProgress));
    const index = Math.trunc(pp * bars.length);
    const x = index * 4 + 1;
    if (index < waveformDecoded.length) {
      const val = waveformDecoded[index];
      const h = Math.round((val * height) / peak);
      currentBar.setAttribute('opacity', ((pp * bars.length) % 1).toString());
      currentBar.setAttribute('x1', x.toString());
      currentBar.setAttribute('x2', x.toString());
      currentBar.setAttribute('y1', (1 + height - h).toString());
      currentBar.setAttribute('y2', (1 + height).toString());
    }
  };

  listen(svg, 'mousemove', (e) => {
    thumbX = e.clientX - 1 - svg.getBoundingClientRect().left;
    render();
  });

  listen(svg, 'mouseleave', () => {
    thumbX = -Infinity;
    render();
  });

  useObservable(svg, audioInfo, true, (newInfo) => {
    playProgress = newInfo.playProgress;
    render();
  });

  render();
  return svg;
}
