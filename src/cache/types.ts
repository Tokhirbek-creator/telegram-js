/**
 * Transform a type with required fields to type with `min` property with the corresponding meaning
 * Ref: https://core.telegram.org/api/min
 */
type WithMin<T> = { id: number } & ({ min: false } & T | { min: true } & Partial<T>);

/**
 * Peer Reference
 * Ref: https://core.telegram.org/type/Peer
 */
export type Peer = {
  _: 'peerUser',
  user_id: number,
} | {
  _: 'peerChat',
  chat_id: number,
} | {
  _: 'peerChannel',
  channel_id: number,
};

/**
 * Peer Reference
 * Ref: https://core.telegram.org/type/InputPeer
 */
export type InputPeer = {
  _: 'inputPeerEmpty',
} | {
  _: 'inputPeerUser',
  user_id: number,
  access_hash: string,
} | {
  _: 'inputPeerChannel',
  channel_id: number,
  access_hash: string,
} | {
  _: 'inputPeerChat',
  chat_id: number,
} | {
  _: 'inputUserFromMessage',
  peer: InputPeer,
  msg_id: number,
  user_id: number,
} | {
  _: 'inputChannelFromMessage',
  peer: InputPeer,
  msg_id: number,
  channel_id: number,
};

/**
 * Dialog data
 * Ref: https://core.telegram.org/type/dialog
 */
export type Dialog = {
  peer: Peer,
  pinned: boolean,
  top_message: number,
  unread_count: number,
  unread_mark: boolean,
  unread_mentions_count: number,
};

/**
 * User object
 * Ref: https://core.telegram.org/constructor/user
 */
export type User = WithMin<{
  first_name: string,
  last_name: string,
  access_hash: string,
  photo: UserProfilePhoto,
}>;

/**
 * User photo object
 * Ref: https://core.telegram.org/type/UserProfilePhoto
 */
export type UserProfilePhoto = {
  _: 'userProfilePhotoEmpty',
} | {
  _: 'userProfilePhoto',
  photo_small: FileLocation,
  photo_big: FileLocation,
  dc_id: number,
};

/**
 * Chat object
 * Ref: https://core.telegram.org/constructor/chat
 */
export type Chat = {
  id: number,
  title: string,
  access_hash: string,
  photo: Object,
};

/**
 * Chat photo object
 * Ref: https://core.telegram.org/type/ChatPhoto
 */
export type ChatPhoto = {
  _: 'chatPhotoEmpty',
} | {
  _: 'chatPhoto',
  photo_small: FileLocation,
  photo_big: FileLocation,
  dc_id: number,
};

/**
 * Channel object
 * Ref: https://core.telegram.org/constructor/channel
 */
export type Channel = WithMin<{
  title: string,
  photo: ChatPhoto,
}>;

/**
 * Message object
 * Ref: https://core.telegram.org/constructor/message
 */
export type Message = {
  id: number,
  from_id: number,
  message: string,
  date: number,
  to_id: Peer,
};

/**
 * File location object
 * Ref: https://core.telegram.org/type/FileLocation
 */
export type FileLocation = {
  volume_id: number,
  local_id: number,
};
