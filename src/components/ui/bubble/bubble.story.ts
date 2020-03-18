/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/html';
import centered from '@storybook/addon-centered/html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withMountTrigger, withChatLayout } from 'storybook/decorators';
import { div, text, img } from 'core/html';
import { getInterface } from 'core/hooks';
import bubble from './bubble';

const stories = storiesOf('UI Elements | Bubble', module)
  .addDecorator(centered)
  .addDecorator(withMountTrigger)
  .addDecorator(withChatLayout)
  .addDecorator(withKnobs);

stories.add('Common Usage', () => {
  const out = boolean('Out', false);
  const bubbleControl = bubble({ out }, div(text('Line 1')), div(text('Line 2')), div(text('Line 3')));
  const isFirst = boolean('First', true);
  const isLast = boolean('Last', true);
  getInterface(bubbleControl).updateBorders(isFirst, isLast);
  return bubbleControl;
});

stories.add('Image Full', () => {
  const img500x300 = img({ class: 'raw', src: 'https://picsum.photos/500/300' });
  const out = boolean('Out', false);
  const bubbleControl = bubble({ out, masked: true, onlyMedia: true }, img500x300);
  const isFirst = boolean('First', true);
  const isLast = boolean('Last', true);
  getInterface(bubbleControl).updateBorders(isFirst, isLast);
  return bubbleControl;
});

stories.add('Image Top', () => {
  const img400x300 = img({ class: 'raw', src: 'https://picsum.photos/400/300' });
  const out = boolean('Out', false);
  const bubbleControl = bubble({ out }, img400x300, div(text('Some Text')));
  const isFirst = boolean('First', true);
  const isLast = boolean('Last', true);
  getInterface(bubbleControl).updateBorders(isFirst, isLast);
  return bubbleControl;
});

stories.add('Image Bottom', () => {
  const img400x300 = img({ class: 'raw', src: 'https://picsum.photos/400/300' });
  const out = boolean('Out', false);
  const bubbleControl = bubble({ out, masked: true }, div(text('Quoted Message')), img400x300);
  const isFirst = boolean('First', true);
  const isLast = boolean('Last', true);
  getInterface(bubbleControl).updateBorders(isFirst, isLast);
  return bubbleControl;
});
