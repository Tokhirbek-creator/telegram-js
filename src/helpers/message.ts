import { Document, InputMedia, Message, MessageMedia } from 'mtproto-js';

// eslint-disable-next-line
const re = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

export function isEmoji(text: string): boolean {
  const match = text.match(re);
  return !!match && match.length === text.length / 2;
}

export function documentToInputMedia(document: Document.document): InputMedia {
  return {
    _: 'inputMediaDocument',
    id: {
      _: 'inputDocument',
      id: document.id,
      access_hash: document.access_hash,
      file_reference: document.file_reference,
    },
  };
}

export type MediaMessage<M extends MessageMedia> = Omit<Message.message, 'media'> & { media: M };

export function isPollMessage(message?: any): message is MediaMessage<MessageMedia.messageMediaPoll> {
  return message?._ === 'message' && message.media?._ === 'messageMediaPoll';
}

const timezoneOffset = new Date().getTimezoneOffset() * 60;

export function getDayOffset(msg: Message.message | Message.messageService) {
  return Math.floor((msg.date - timezoneOffset) / (3600 * 24)).toString();
}

export function getMessageTooltipTitle(msg: Message.message) {
  let title = new Date(msg.date * 1000).toLocaleString();
  if (msg.edit_date && !msg.edit_hide) title += `\nEdited: ${new Date(msg.edit_date * 1000).toLocaleString()}`;

  return title;
}
