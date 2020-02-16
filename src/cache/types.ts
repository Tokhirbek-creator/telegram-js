/* eslint-disable max-len */
/* eslint-disable semi-style */

import { ClientError } from 'client/worker.types';

/**
 * Transform a type with required fields to type with `min` property with the corresponding meaning
 * Ref: https://core.telegram.org/api/min
 */
export type WithMin<T> = { id: number } & ({ min: false } & T | { min: true } & Partial<T>);

/* CONSTRUCTORS */

/**
 * Ref: https://core.telegram.org/type/Error
 */
export type Error =
  | Error.error
;

export namespace Error {
  export type error = {
    _: 'error',
    code: number,
    text: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPeer
 */
export type InputPeer =
  | InputPeer.inputPeerEmpty
  | InputPeer.inputPeerSelf
  | InputPeer.inputPeerChat
  | InputPeer.inputPeerUser
  | InputPeer.inputPeerChannel
  | InputPeer.inputPeerUserFromMessage
  | InputPeer.inputPeerChannelFromMessage
;

export namespace InputPeer {
  export type inputPeerEmpty = {
    _: 'inputPeerEmpty',
  };
  export type inputPeerSelf = {
    _: 'inputPeerSelf',
  };
  export type inputPeerChat = {
    _: 'inputPeerChat',
    chat_id: number,
  };
  export type inputPeerUser = {
    _: 'inputPeerUser',
    user_id: number,
    access_hash: string,
  };
  export type inputPeerChannel = {
    _: 'inputPeerChannel',
    channel_id: number,
    access_hash: string,
  };
  export type inputPeerUserFromMessage = {
    _: 'inputPeerUserFromMessage',
    peer: InputPeer,
    msg_id: number,
    user_id: number,
  };
  export type inputPeerChannelFromMessage = {
    _: 'inputPeerChannelFromMessage',
    peer: InputPeer,
    msg_id: number,
    channel_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputUser
 */
export type InputUser =
  | InputUser.inputUserEmpty
  | InputUser.inputUserSelf
  | InputUser.inputUser
  | InputUser.inputUserFromMessage
;

export namespace InputUser {
  export type inputUserEmpty = {
    _: 'inputUserEmpty',
  };
  export type inputUserSelf = {
    _: 'inputUserSelf',
  };
  export type inputUser = {
    _: 'inputUser',
    user_id: number,
    access_hash: string,
  };
  export type inputUserFromMessage = {
    _: 'inputUserFromMessage',
    peer: InputPeer,
    msg_id: number,
    user_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputContact
 */
export type InputContact =
  | InputContact.inputPhoneContact
;

export namespace InputContact {
  export type inputPhoneContact = {
    _: 'inputPhoneContact',
    client_id: string,
    phone: string,
    first_name: string,
    last_name: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputFile
 */
export type InputFile =
  | InputFile.inputFile
  | InputFile.inputFileBig
;

export namespace InputFile {
  export type inputFile = {
    _: 'inputFile',
    id: string,
    parts: number,
    name: string,
    md5_checksum: string,
  };
  export type inputFileBig = {
    _: 'inputFileBig',
    id: string,
    parts: number,
    name: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputMedia
 */
export type InputMedia =
  | InputMedia.inputMediaEmpty
  | InputMedia.inputMediaUploadedPhoto
  | InputMedia.inputMediaPhoto
  | InputMedia.inputMediaGeoPoint
  | InputMedia.inputMediaContact
  | InputMedia.inputMediaUploadedDocument
  | InputMedia.inputMediaDocument
  | InputMedia.inputMediaVenue
  | InputMedia.inputMediaGifExternal
  | InputMedia.inputMediaPhotoExternal
  | InputMedia.inputMediaDocumentExternal
  | InputMedia.inputMediaGame
  | InputMedia.inputMediaInvoice
  | InputMedia.inputMediaGeoLive
  | InputMedia.inputMediaPoll
;

export namespace InputMedia {
  export type inputMediaEmpty = {
    _: 'inputMediaEmpty',
  };
  export type inputMediaUploadedPhoto = {
    _: 'inputMediaUploadedPhoto',
    file: InputFile,
    stickers?: InputDocument[],
    ttl_seconds?: number,
  };
  export type inputMediaPhoto = {
    _: 'inputMediaPhoto',
    id: InputPhoto,
    ttl_seconds?: number,
  };
  export type inputMediaGeoPoint = {
    _: 'inputMediaGeoPoint',
    geo_point: InputGeoPoint,
  };
  export type inputMediaContact = {
    _: 'inputMediaContact',
    phone_number: string,
    first_name: string,
    last_name: string,
    vcard: string,
  };
  export type inputMediaUploadedDocument = {
    _: 'inputMediaUploadedDocument',
    nosound_video?: boolean,
    file: InputFile,
    thumb?: InputFile,
    mime_type: string,
    attributes: DocumentAttribute[],
    stickers?: InputDocument[],
    ttl_seconds?: number,
  };
  export type inputMediaDocument = {
    _: 'inputMediaDocument',
    id: InputDocument,
    ttl_seconds?: number,
  };
  export type inputMediaVenue = {
    _: 'inputMediaVenue',
    geo_point: InputGeoPoint,
    title: string,
    address: string,
    provider: string,
    venue_id: string,
    venue_type: string,
  };
  export type inputMediaGifExternal = {
    _: 'inputMediaGifExternal',
    url: string,
    q: string,
  };
  export type inputMediaPhotoExternal = {
    _: 'inputMediaPhotoExternal',
    url: string,
    ttl_seconds?: number,
  };
  export type inputMediaDocumentExternal = {
    _: 'inputMediaDocumentExternal',
    url: string,
    ttl_seconds?: number,
  };
  export type inputMediaGame = {
    _: 'inputMediaGame',
    id: InputGame,
  };
  export type inputMediaInvoice = {
    _: 'inputMediaInvoice',
    title: string,
    description: string,
    photo?: InputWebDocument,
    invoice: Invoice,
    payload: string,
    provider: string,
    provider_data: DataJSON,
    start_param: string,
  };
  export type inputMediaGeoLive = {
    _: 'inputMediaGeoLive',
    stopped?: boolean,
    geo_point: InputGeoPoint,
    period?: number,
  };
  export type inputMediaPoll = {
    _: 'inputMediaPoll',
    poll: Poll,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputChatPhoto
 */
export type InputChatPhoto =
  | InputChatPhoto.inputChatPhotoEmpty
  | InputChatPhoto.inputChatUploadedPhoto
  | InputChatPhoto.inputChatPhoto
;

export namespace InputChatPhoto {
  export type inputChatPhotoEmpty = {
    _: 'inputChatPhotoEmpty',
  };
  export type inputChatUploadedPhoto = {
    _: 'inputChatUploadedPhoto',
    file: InputFile,
  };
  export type inputChatPhoto = {
    _: 'inputChatPhoto',
    id: InputPhoto,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputGeoPoint
 */
export type InputGeoPoint =
  | InputGeoPoint.inputGeoPointEmpty
  | InputGeoPoint.inputGeoPoint
;

export namespace InputGeoPoint {
  export type inputGeoPointEmpty = {
    _: 'inputGeoPointEmpty',
  };
  export type inputGeoPoint = {
    _: 'inputGeoPoint',
    lat: number,
    long: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPhoto
 */
export type InputPhoto =
  | InputPhoto.inputPhotoEmpty
  | InputPhoto.inputPhoto
;

export namespace InputPhoto {
  export type inputPhotoEmpty = {
    _: 'inputPhotoEmpty',
  };
  export type inputPhoto = {
    _: 'inputPhoto',
    id: string,
    access_hash: string,
    file_reference: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputFileLocation
 */
export type InputFileLocation =
  | InputFileLocation.inputFileLocation
  | InputFileLocation.inputEncryptedFileLocation
  | InputFileLocation.inputDocumentFileLocation
  | InputFileLocation.inputSecureFileLocation
  | InputFileLocation.inputTakeoutFileLocation
  | InputFileLocation.inputPhotoFileLocation
  | InputFileLocation.inputPeerPhotoFileLocation
  | InputFileLocation.inputStickerSetThumb
;

export namespace InputFileLocation {
  export type inputFileLocation = {
    _: 'inputFileLocation',
    volume_id: string,
    local_id: number,
    secret: string,
    file_reference: string,
  };
  export type inputEncryptedFileLocation = {
    _: 'inputEncryptedFileLocation',
    id: string,
    access_hash: string,
  };
  export type inputDocumentFileLocation = {
    _: 'inputDocumentFileLocation',
    id: string,
    access_hash: string,
    file_reference: string,
    thumb_size: string,
  };
  export type inputSecureFileLocation = {
    _: 'inputSecureFileLocation',
    id: string,
    access_hash: string,
  };
  export type inputTakeoutFileLocation = {
    _: 'inputTakeoutFileLocation',
  };
  export type inputPhotoFileLocation = {
    _: 'inputPhotoFileLocation',
    id: string,
    access_hash: string,
    file_reference: string,
    thumb_size: string,
  };
  export type inputPeerPhotoFileLocation = {
    _: 'inputPeerPhotoFileLocation',
    big?: boolean,
    peer: InputPeer,
    volume_id: string,
    local_id: number,
  };
  export type inputStickerSetThumb = {
    _: 'inputStickerSetThumb',
    stickerset: InputStickerSet,
    volume_id: string,
    local_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Peer
 */
export type Peer =
  | Peer.peerUser
  | Peer.peerChat
  | Peer.peerChannel
;

export namespace Peer {
  export type peerUser = {
    _: 'peerUser',
    user_id: number,
  };
  export type peerChat = {
    _: 'peerChat',
    chat_id: number,
  };
  export type peerChannel = {
    _: 'peerChannel',
    channel_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/storage.FileType
 */
export type StorageFileType =
  | StorageFileType.storageFileUnknown
  | StorageFileType.storageFilePartial
  | StorageFileType.storageFileJpeg
  | StorageFileType.storageFileGif
  | StorageFileType.storageFilePng
  | StorageFileType.storageFilePdf
  | StorageFileType.storageFileMp3
  | StorageFileType.storageFileMov
  | StorageFileType.storageFileMp4
  | StorageFileType.storageFileWebp
;

export namespace StorageFileType {
  export type storageFileUnknown = {
    _: 'storage.fileUnknown',
  };
  export type storageFilePartial = {
    _: 'storage.filePartial',
  };
  export type storageFileJpeg = {
    _: 'storage.fileJpeg',
  };
  export type storageFileGif = {
    _: 'storage.fileGif',
  };
  export type storageFilePng = {
    _: 'storage.filePng',
  };
  export type storageFilePdf = {
    _: 'storage.filePdf',
  };
  export type storageFileMp3 = {
    _: 'storage.fileMp3',
  };
  export type storageFileMov = {
    _: 'storage.fileMov',
  };
  export type storageFileMp4 = {
    _: 'storage.fileMp4',
  };
  export type storageFileWebp = {
    _: 'storage.fileWebp',
  };
}

/**
 * Ref: https://core.telegram.org/type/User
 */
export type User =
  | User.userEmpty
  | User.user
;

export namespace User {
  export type userEmpty = {
    _: 'userEmpty',
    id: number,
  };
  export type user = WithMin<{
    _: 'user',
    self?: boolean,
    contact?: boolean,
    mutual_contact?: boolean,
    deleted?: boolean,
    bot?: boolean,
    bot_chat_history?: boolean,
    bot_nochats?: boolean,
    verified?: boolean,
    restricted?: boolean,
    min?: boolean,
    bot_inline_geo?: boolean,
    support?: boolean,
    scam?: boolean,
    id: number,
    access_hash?: string,
    first_name?: string,
    last_name?: string,
    username?: string,
    phone?: string,
    photo?: UserProfilePhoto,
    status?: UserStatus,
    bot_info_version?: number,
    restriction_reason?: RestrictionReason[],
    bot_inline_placeholder?: string,
    lang_code?: string,
  }>;
}

/**
 * Ref: https://core.telegram.org/type/UserProfilePhoto
 */
export type UserProfilePhoto =
  | UserProfilePhoto.userProfilePhotoEmpty
  | UserProfilePhoto.userProfilePhoto
;

export namespace UserProfilePhoto {
  export type userProfilePhotoEmpty = {
    _: 'userProfilePhotoEmpty',
  };
  export type userProfilePhoto = {
    _: 'userProfilePhoto',
    photo_id: string,
    photo_small: FileLocation,
    photo_big: FileLocation,
    dc_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/UserStatus
 */
export type UserStatus =
  | UserStatus.userStatusEmpty
  | UserStatus.userStatusOnline
  | UserStatus.userStatusOffline
  | UserStatus.userStatusRecently
  | UserStatus.userStatusLastWeek
  | UserStatus.userStatusLastMonth
;

export namespace UserStatus {
  export type userStatusEmpty = {
    _: 'userStatusEmpty',
  };
  export type userStatusOnline = {
    _: 'userStatusOnline',
    expires: number,
  };
  export type userStatusOffline = {
    _: 'userStatusOffline',
    was_online: number,
  };
  export type userStatusRecently = {
    _: 'userStatusRecently',
  };
  export type userStatusLastWeek = {
    _: 'userStatusLastWeek',
  };
  export type userStatusLastMonth = {
    _: 'userStatusLastMonth',
  };
}

/**
 * Ref: https://core.telegram.org/type/Chat
 */
export type Chat =
  | Chat.chatEmpty
  | Chat.chat
  | Chat.chatForbidden
  | Chat.channel
  | Chat.channelForbidden
;

export namespace Chat {
  export type chatEmpty = {
    _: 'chatEmpty',
    id: number,
  };
  export type chat = {
    _: 'chat',
    creator?: boolean,
    kicked?: boolean,
    left?: boolean,
    deactivated?: boolean,
    id: number,
    title: string,
    photo: ChatPhoto,
    participants_count: number,
    date: number,
    version: number,
    migrated_to?: InputChannel,
    admin_rights?: ChatAdminRights,
    default_banned_rights?: ChatBannedRights,
  };
  export type chatForbidden = {
    _: 'chatForbidden',
    id: number,
    title: string,
  };
  export type channel = WithMin<{
    _: 'channel',
    creator?: boolean,
    left?: boolean,
    broadcast?: boolean,
    verified?: boolean,
    megagroup?: boolean,
    restricted?: boolean,
    signatures?: boolean,
    min?: boolean,
    scam?: boolean,
    has_link?: boolean,
    has_geo?: boolean,
    slowmode_enabled?: boolean,
    id: number,
    access_hash?: string,
    title: string,
    username?: string,
    photo: ChatPhoto,
    date: number,
    version: number,
    restriction_reason?: RestrictionReason[],
    admin_rights?: ChatAdminRights,
    banned_rights?: ChatBannedRights,
    default_banned_rights?: ChatBannedRights,
    participants_count?: number,
  }>;
  export type channelForbidden = {
    _: 'channelForbidden',
    broadcast?: boolean,
    megagroup?: boolean,
    id: number,
    access_hash: string,
    title: string,
    until_date?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatFull
 */
export type ChatFull =
  | ChatFull.chatFull
  | ChatFull.channelFull
;

export namespace ChatFull {
  export type chatFull = {
    _: 'chatFull',
    can_set_username?: boolean,
    has_scheduled?: boolean,
    id: number,
    about: string,
    participants: ChatParticipants,
    chat_photo?: Photo,
    notify_settings: PeerNotifySettings,
    exported_invite: ExportedChatInvite,
    bot_info?: BotInfo[],
    pinned_msg_id?: number,
    folder_id?: number,
  };
  export type channelFull = {
    _: 'channelFull',
    can_view_participants?: boolean,
    can_set_username?: boolean,
    can_set_stickers?: boolean,
    hidden_prehistory?: boolean,
    can_view_stats?: boolean,
    can_set_location?: boolean,
    has_scheduled?: boolean,
    id: number,
    about: string,
    participants_count?: number,
    admins_count?: number,
    kicked_count?: number,
    banned_count?: number,
    online_count?: number,
    read_inbox_max_id: number,
    read_outbox_max_id: number,
    unread_count: number,
    chat_photo: Photo,
    notify_settings: PeerNotifySettings,
    exported_invite: ExportedChatInvite,
    bot_info: BotInfo[],
    migrated_from_chat_id?: number,
    migrated_from_max_id?: number,
    pinned_msg_id?: number,
    stickerset?: StickerSet,
    available_min_id?: number,
    folder_id?: number,
    linked_chat_id?: number,
    location?: ChannelLocation,
    slowmode_seconds?: number,
    slowmode_next_send_date?: number,
    pts: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatParticipant
 */
export type ChatParticipant =
  | ChatParticipant.chatParticipant
  | ChatParticipant.chatParticipantCreator
  | ChatParticipant.chatParticipantAdmin
;

export namespace ChatParticipant {
  export type chatParticipant = {
    _: 'chatParticipant',
    user_id: number,
    inviter_id: number,
    date: number,
  };
  export type chatParticipantCreator = {
    _: 'chatParticipantCreator',
    user_id: number,
  };
  export type chatParticipantAdmin = {
    _: 'chatParticipantAdmin',
    user_id: number,
    inviter_id: number,
    date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatParticipants
 */
export type ChatParticipants =
  | ChatParticipants.chatParticipantsForbidden
  | ChatParticipants.chatParticipants
;

export namespace ChatParticipants {
  export type chatParticipantsForbidden = {
    _: 'chatParticipantsForbidden',
    chat_id: number,
    self_participant?: ChatParticipant,
  };
  export type chatParticipants = {
    _: 'chatParticipants',
    chat_id: number,
    participants: ChatParticipant[],
    version: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatPhoto
 */
export type ChatPhoto =
  | ChatPhoto.chatPhotoEmpty
  | ChatPhoto.chatPhoto
;

export namespace ChatPhoto {
  export type chatPhotoEmpty = {
    _: 'chatPhotoEmpty',
  };
  export type chatPhoto = {
    _: 'chatPhoto',
    photo_small: FileLocation,
    photo_big: FileLocation,
    dc_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Message
 */
export type Message =
  | Message.messageEmpty
  | Message.message
  | Message.messageService
;

export namespace Message {
  export type messageEmpty = {
    _: 'messageEmpty',
    id: number,
  };
  export type message = {
    _: 'message',
    out?: boolean,
    mentioned?: boolean,
    media_unread?: boolean,
    silent?: boolean,
    post?: boolean,
    from_scheduled?: boolean,
    legacy?: boolean,
    edit_hide?: boolean,
    id: number,
    from_id?: number,
    to_id: Peer,
    fwd_from?: MessageFwdHeader,
    via_bot_id?: number,
    reply_to_msg_id?: number,
    date: number,
    message: string,
    media?: MessageMedia,
    reply_markup?: ReplyMarkup,
    entities?: MessageEntity[],
    views?: number,
    edit_date?: number,
    post_author?: string,
    grouped_id?: string,
    restriction_reason?: RestrictionReason[],
  };
  export type messageService = {
    _: 'messageService',
    out?: boolean,
    mentioned?: boolean,
    media_unread?: boolean,
    silent?: boolean,
    post?: boolean,
    legacy?: boolean,
    id: number,
    from_id?: number,
    to_id: Peer,
    reply_to_msg_id?: number,
    date: number,
    action: MessageAction,
  };
}

/**
 * Ref: https://core.telegram.org/type/MessageMedia
 */
export type MessageMedia =
  | MessageMedia.messageMediaEmpty
  | MessageMedia.messageMediaPhoto
  | MessageMedia.messageMediaGeo
  | MessageMedia.messageMediaContact
  | MessageMedia.messageMediaUnsupported
  | MessageMedia.messageMediaDocument
  | MessageMedia.messageMediaWebPage
  | MessageMedia.messageMediaVenue
  | MessageMedia.messageMediaGame
  | MessageMedia.messageMediaInvoice
  | MessageMedia.messageMediaGeoLive
  | MessageMedia.messageMediaPoll
;

export namespace MessageMedia {
  export type messageMediaEmpty = {
    _: 'messageMediaEmpty',
  };
  export type messageMediaPhoto = {
    _: 'messageMediaPhoto',
    photo?: Photo,
    ttl_seconds?: number,
  };
  export type messageMediaGeo = {
    _: 'messageMediaGeo',
    geo: GeoPoint,
  };
  export type messageMediaContact = {
    _: 'messageMediaContact',
    phone_number: string,
    first_name: string,
    last_name: string,
    vcard: string,
    user_id: number,
  };
  export type messageMediaUnsupported = {
    _: 'messageMediaUnsupported',
  };
  export type messageMediaDocument = {
    _: 'messageMediaDocument',
    document?: Document,
    ttl_seconds?: number,
  };
  export type messageMediaWebPage = {
    _: 'messageMediaWebPage',
    webpage: WebPage,
  };
  export type messageMediaVenue = {
    _: 'messageMediaVenue',
    geo: GeoPoint,
    title: string,
    address: string,
    provider: string,
    venue_id: string,
    venue_type: string,
  };
  export type messageMediaGame = {
    _: 'messageMediaGame',
    game: Game,
  };
  export type messageMediaInvoice = {
    _: 'messageMediaInvoice',
    shipping_address_requested?: boolean,
    test?: boolean,
    title: string,
    description: string,
    photo?: WebDocument,
    receipt_msg_id?: number,
    currency: string,
    total_amount: string,
    start_param: string,
  };
  export type messageMediaGeoLive = {
    _: 'messageMediaGeoLive',
    geo: GeoPoint,
    period: number,
  };
  export type messageMediaPoll = {
    _: 'messageMediaPoll',
    poll: Poll,
    results: PollResults,
  };
}

/**
 * Ref: https://core.telegram.org/type/MessageAction
 */
export type MessageAction =
  | MessageAction.messageActionEmpty
  | MessageAction.messageActionChatCreate
  | MessageAction.messageActionChatEditTitle
  | MessageAction.messageActionChatEditPhoto
  | MessageAction.messageActionChatDeletePhoto
  | MessageAction.messageActionChatAddUser
  | MessageAction.messageActionChatDeleteUser
  | MessageAction.messageActionChatJoinedByLink
  | MessageAction.messageActionChannelCreate
  | MessageAction.messageActionChatMigrateTo
  | MessageAction.messageActionChannelMigrateFrom
  | MessageAction.messageActionPinMessage
  | MessageAction.messageActionHistoryClear
  | MessageAction.messageActionGameScore
  | MessageAction.messageActionPaymentSentMe
  | MessageAction.messageActionPaymentSent
  | MessageAction.messageActionPhoneCall
  | MessageAction.messageActionScreenshotTaken
  | MessageAction.messageActionCustomAction
  | MessageAction.messageActionBotAllowed
  | MessageAction.messageActionSecureValuesSentMe
  | MessageAction.messageActionSecureValuesSent
  | MessageAction.messageActionContactSignUp
;

export namespace MessageAction {
  export type messageActionEmpty = {
    _: 'messageActionEmpty',
  };
  export type messageActionChatCreate = {
    _: 'messageActionChatCreate',
    title: string,
    users: number[],
  };
  export type messageActionChatEditTitle = {
    _: 'messageActionChatEditTitle',
    title: string,
  };
  export type messageActionChatEditPhoto = {
    _: 'messageActionChatEditPhoto',
    photo: Photo,
  };
  export type messageActionChatDeletePhoto = {
    _: 'messageActionChatDeletePhoto',
  };
  export type messageActionChatAddUser = {
    _: 'messageActionChatAddUser',
    users: number[],
  };
  export type messageActionChatDeleteUser = {
    _: 'messageActionChatDeleteUser',
    user_id: number,
  };
  export type messageActionChatJoinedByLink = {
    _: 'messageActionChatJoinedByLink',
    inviter_id: number,
  };
  export type messageActionChannelCreate = {
    _: 'messageActionChannelCreate',
    title: string,
  };
  export type messageActionChatMigrateTo = {
    _: 'messageActionChatMigrateTo',
    channel_id: number,
  };
  export type messageActionChannelMigrateFrom = {
    _: 'messageActionChannelMigrateFrom',
    title: string,
    chat_id: number,
  };
  export type messageActionPinMessage = {
    _: 'messageActionPinMessage',
  };
  export type messageActionHistoryClear = {
    _: 'messageActionHistoryClear',
  };
  export type messageActionGameScore = {
    _: 'messageActionGameScore',
    game_id: string,
    score: number,
  };
  export type messageActionPaymentSentMe = {
    _: 'messageActionPaymentSentMe',
    currency: string,
    total_amount: string,
    payload: string,
    info?: PaymentRequestedInfo,
    shipping_option_id?: string,
    charge: PaymentCharge,
  };
  export type messageActionPaymentSent = {
    _: 'messageActionPaymentSent',
    currency: string,
    total_amount: string,
  };
  export type messageActionPhoneCall = {
    _: 'messageActionPhoneCall',
    video?: boolean,
    call_id: string,
    reason?: PhoneCallDiscardReason,
    duration?: number,
  };
  export type messageActionScreenshotTaken = {
    _: 'messageActionScreenshotTaken',
  };
  export type messageActionCustomAction = {
    _: 'messageActionCustomAction',
    message: string,
  };
  export type messageActionBotAllowed = {
    _: 'messageActionBotAllowed',
    domain: string,
  };
  export type messageActionSecureValuesSentMe = {
    _: 'messageActionSecureValuesSentMe',
    values: SecureValue[],
    credentials: SecureCredentialsEncrypted,
  };
  export type messageActionSecureValuesSent = {
    _: 'messageActionSecureValuesSent',
    types: SecureValueType[],
  };
  export type messageActionContactSignUp = {
    _: 'messageActionContactSignUp',
  };
}

/**
 * Ref: https://core.telegram.org/type/Dialog
 */
export type Dialog =
  | Dialog.dialog
  | Dialog.dialogFolder
;

export namespace Dialog {
  export type dialog = {
    _: 'dialog',
    pinned?: boolean,
    unread_mark?: boolean,
    peer: Peer,
    top_message: number,
    read_inbox_max_id: number,
    read_outbox_max_id: number,
    unread_count: number,
    unread_mentions_count: number,
    notify_settings: PeerNotifySettings,
    pts?: number,
    draft?: DraftMessage,
    folder_id?: number,
  };
  export type dialogFolder = {
    _: 'dialogFolder',
    pinned?: boolean,
    folder: Folder,
    peer: Peer,
    top_message: number,
    unread_muted_peers_count: number,
    unread_unmuted_peers_count: number,
    unread_muted_messages_count: number,
    unread_unmuted_messages_count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Photo
 */
export type Photo =
  | Photo.photoEmpty
  | Photo.photo
;

export namespace Photo {
  export type photoEmpty = {
    _: 'photoEmpty',
    id: string,
  };
  export type photo = {
    _: 'photo',
    has_stickers?: boolean,
    id: string,
    access_hash: string,
    file_reference: string,
    date: number,
    sizes: PhotoSize[],
    dc_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/PhotoSize
 */
export type PhotoSize =
  | PhotoSize.photoSizeEmpty
  | PhotoSize.photoSize
  | PhotoSize.photoCachedSize
  | PhotoSize.photoStrippedSize
;

export namespace PhotoSize {
  export type photoSizeEmpty = {
    _: 'photoSizeEmpty',
    type: string,
  };
  export type photoSize = {
    _: 'photoSize',
    type: string,
    location: FileLocation,
    w: number,
    h: number,
    size: number,
  };
  export type photoCachedSize = {
    _: 'photoCachedSize',
    type: string,
    location: FileLocation,
    w: number,
    h: number,
    bytes: string,
  };
  export type photoStrippedSize = {
    _: 'photoStrippedSize',
    type: string,
    bytes: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/GeoPoint
 */
export type GeoPoint =
  | GeoPoint.geoPointEmpty
  | GeoPoint.geoPoint
;

export namespace GeoPoint {
  export type geoPointEmpty = {
    _: 'geoPointEmpty',
  };
  export type geoPoint = {
    _: 'geoPoint',
    long: number,
    lat: number,
    access_hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.SentCode
 */
export type AuthSentCode =
  | AuthSentCode.authSentCode
;

export namespace AuthSentCode {
  export type authSentCode = {
    _: 'auth.sentCode',
    type: AuthSentCodeType,
    phone_code_hash: string,
    next_type?: AuthCodeType,
    timeout?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.Authorization
 */
export type AuthAuthorization =
  | AuthAuthorization.authAuthorization
  | AuthAuthorization.authAuthorizationSignUpRequired
;

export namespace AuthAuthorization {
  export type authAuthorization = {
    _: 'auth.authorization',
    tmp_sessions?: number,
    user: User,
  };
  export type authAuthorizationSignUpRequired = {
    _: 'auth.authorizationSignUpRequired',
    terms_of_service?: HelpTermsOfService,
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.ExportedAuthorization
 */
export type AuthExportedAuthorization =
  | AuthExportedAuthorization.authExportedAuthorization
;

export namespace AuthExportedAuthorization {
  export type authExportedAuthorization = {
    _: 'auth.exportedAuthorization',
    id: number,
    bytes: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputNotifyPeer
 */
export type InputNotifyPeer =
  | InputNotifyPeer.inputNotifyPeer
  | InputNotifyPeer.inputNotifyUsers
  | InputNotifyPeer.inputNotifyChats
  | InputNotifyPeer.inputNotifyBroadcasts
;

export namespace InputNotifyPeer {
  export type inputNotifyPeer = {
    _: 'inputNotifyPeer',
    peer: InputPeer,
  };
  export type inputNotifyUsers = {
    _: 'inputNotifyUsers',
  };
  export type inputNotifyChats = {
    _: 'inputNotifyChats',
  };
  export type inputNotifyBroadcasts = {
    _: 'inputNotifyBroadcasts',
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPeerNotifySettings
 */
export type InputPeerNotifySettings =
  | InputPeerNotifySettings.inputPeerNotifySettings
;

export namespace InputPeerNotifySettings {
  export type inputPeerNotifySettings = {
    _: 'inputPeerNotifySettings',
    show_previews?: boolean,
    silent?: boolean,
    mute_until?: number,
    sound?: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PeerNotifySettings
 */
export type PeerNotifySettings =
  | PeerNotifySettings.peerNotifySettings
;

export namespace PeerNotifySettings {
  export type peerNotifySettings = {
    _: 'peerNotifySettings',
    show_previews?: boolean,
    silent?: boolean,
    mute_until?: number,
    sound?: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PeerSettings
 */
export type PeerSettings =
  | PeerSettings.peerSettings
;

export namespace PeerSettings {
  export type peerSettings = {
    _: 'peerSettings',
    report_spam?: boolean,
    add_contact?: boolean,
    block_contact?: boolean,
    share_contact?: boolean,
    need_contacts_exception?: boolean,
    report_geo?: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/WallPaper
 */
export type WallPaper =
  | WallPaper.wallPaper
;

export namespace WallPaper {
  export type wallPaper = {
    _: 'wallPaper',
    id: string,
    creator?: boolean,
    default?: boolean,
    pattern?: boolean,
    dark?: boolean,
    access_hash: string,
    slug: string,
    document: Document,
    settings?: WallPaperSettings,
  };
}

/**
 * Ref: https://core.telegram.org/type/ReportReason
 */
export type ReportReason =
  | ReportReason.inputReportReasonSpam
  | ReportReason.inputReportReasonViolence
  | ReportReason.inputReportReasonPornography
  | ReportReason.inputReportReasonChildAbuse
  | ReportReason.inputReportReasonOther
  | ReportReason.inputReportReasonCopyright
  | ReportReason.inputReportReasonGeoIrrelevant
;

export namespace ReportReason {
  export type inputReportReasonSpam = {
    _: 'inputReportReasonSpam',
  };
  export type inputReportReasonViolence = {
    _: 'inputReportReasonViolence',
  };
  export type inputReportReasonPornography = {
    _: 'inputReportReasonPornography',
  };
  export type inputReportReasonChildAbuse = {
    _: 'inputReportReasonChildAbuse',
  };
  export type inputReportReasonOther = {
    _: 'inputReportReasonOther',
    text: string,
  };
  export type inputReportReasonCopyright = {
    _: 'inputReportReasonCopyright',
  };
  export type inputReportReasonGeoIrrelevant = {
    _: 'inputReportReasonGeoIrrelevant',
  };
}

/**
 * Ref: https://core.telegram.org/type/UserFull
 */
export type UserFull =
  | UserFull.userFull
;

export namespace UserFull {
  export type userFull = {
    _: 'userFull',
    blocked?: boolean,
    phone_calls_available?: boolean,
    phone_calls_private?: boolean,
    can_pin_message?: boolean,
    has_scheduled?: boolean,
    user: User,
    about?: string,
    settings: PeerSettings,
    profile_photo?: Photo,
    notify_settings: PeerNotifySettings,
    bot_info?: BotInfo,
    pinned_msg_id?: number,
    common_chats_count: number,
    folder_id?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Contact
 */
export type Contact =
  | Contact.contact
;

export namespace Contact {
  export type contact = {
    _: 'contact',
    user_id: number,
    mutual: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/ImportedContact
 */
export type ImportedContact =
  | ImportedContact.importedContact
;

export namespace ImportedContact {
  export type importedContact = {
    _: 'importedContact',
    user_id: number,
    client_id: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/ContactBlocked
 */
export type ContactBlocked =
  | ContactBlocked.contactBlocked
;

export namespace ContactBlocked {
  export type contactBlocked = {
    _: 'contactBlocked',
    user_id: number,
    date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ContactStatus
 */
export type ContactStatus =
  | ContactStatus.contactStatus
;

export namespace ContactStatus {
  export type contactStatus = {
    _: 'contactStatus',
    user_id: number,
    status: UserStatus,
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.Contacts
 */
export type ContactsContacts =
  | ContactsContacts.contactsContactsNotModified
  | ContactsContacts.contactsContacts
;

export namespace ContactsContacts {
  export type contactsContactsNotModified = {
    _: 'contacts.contactsNotModified',
  };
  export type contactsContacts = {
    _: 'contacts.contacts',
    contacts: Contact[],
    saved_count: number,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.ImportedContacts
 */
export type ContactsImportedContacts =
  | ContactsImportedContacts.contactsImportedContacts
;

export namespace ContactsImportedContacts {
  export type contactsImportedContacts = {
    _: 'contacts.importedContacts',
    imported: ImportedContact[],
    popular_invites: PopularContact[],
    retry_contacts: string[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.Blocked
 */
export type ContactsBlocked =
  | ContactsBlocked.contactsBlocked
  | ContactsBlocked.contactsBlockedSlice
;

export namespace ContactsBlocked {
  export type contactsBlocked = {
    _: 'contacts.blocked',
    blocked: ContactBlocked[],
    users: User[],
  };
  export type contactsBlockedSlice = {
    _: 'contacts.blockedSlice',
    count: number,
    blocked: ContactBlocked[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.Dialogs
 */
export type MessagesDialogs =
  | MessagesDialogs.messagesDialogs
  | MessagesDialogs.messagesDialogsSlice
  | MessagesDialogs.messagesDialogsNotModified
;

export namespace MessagesDialogs {
  export type messagesDialogs = {
    _: 'messages.dialogs',
    dialogs: Dialog[],
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type messagesDialogsSlice = {
    _: 'messages.dialogsSlice',
    count: number,
    dialogs: Dialog[],
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type messagesDialogsNotModified = {
    _: 'messages.dialogsNotModified',
    count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.Messages
 */
export type MessagesMessages =
  | MessagesMessages.messagesMessages
  | MessagesMessages.messagesMessagesSlice
  | MessagesMessages.messagesChannelMessages
  | MessagesMessages.messagesMessagesNotModified
;

export namespace MessagesMessages {
  export type messagesMessages = {
    _: 'messages.messages',
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type messagesMessagesSlice = {
    _: 'messages.messagesSlice',
    inexact?: boolean,
    count: number,
    next_rate?: number,
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type messagesChannelMessages = {
    _: 'messages.channelMessages',
    inexact?: boolean,
    pts: number,
    count: number,
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type messagesMessagesNotModified = {
    _: 'messages.messagesNotModified',
    count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.Chats
 */
export type MessagesChats =
  | MessagesChats.messagesChats
  | MessagesChats.messagesChatsSlice
;

export namespace MessagesChats {
  export type messagesChats = {
    _: 'messages.chats',
    chats: Chat[],
  };
  export type messagesChatsSlice = {
    _: 'messages.chatsSlice',
    count: number,
    chats: Chat[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.ChatFull
 */
export type MessagesChatFull =
  | MessagesChatFull.messagesChatFull
;

export namespace MessagesChatFull {
  export type messagesChatFull = {
    _: 'messages.chatFull',
    full_chat: ChatFull,
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.AffectedHistory
 */
export type MessagesAffectedHistory =
  | MessagesAffectedHistory.messagesAffectedHistory
;

export namespace MessagesAffectedHistory {
  export type messagesAffectedHistory = {
    _: 'messages.affectedHistory',
    pts: number,
    pts_count: number,
    offset: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/MessagesFilter
 */
export type MessagesFilter =
  | MessagesFilter.inputMessagesFilterEmpty
  | MessagesFilter.inputMessagesFilterPhotos
  | MessagesFilter.inputMessagesFilterVideo
  | MessagesFilter.inputMessagesFilterPhotoVideo
  | MessagesFilter.inputMessagesFilterDocument
  | MessagesFilter.inputMessagesFilterUrl
  | MessagesFilter.inputMessagesFilterGif
  | MessagesFilter.inputMessagesFilterVoice
  | MessagesFilter.inputMessagesFilterMusic
  | MessagesFilter.inputMessagesFilterChatPhotos
  | MessagesFilter.inputMessagesFilterPhoneCalls
  | MessagesFilter.inputMessagesFilterRoundVoice
  | MessagesFilter.inputMessagesFilterRoundVideo
  | MessagesFilter.inputMessagesFilterMyMentions
  | MessagesFilter.inputMessagesFilterGeo
  | MessagesFilter.inputMessagesFilterContacts
;

export namespace MessagesFilter {
  export type inputMessagesFilterEmpty = {
    _: 'inputMessagesFilterEmpty',
  };
  export type inputMessagesFilterPhotos = {
    _: 'inputMessagesFilterPhotos',
  };
  export type inputMessagesFilterVideo = {
    _: 'inputMessagesFilterVideo',
  };
  export type inputMessagesFilterPhotoVideo = {
    _: 'inputMessagesFilterPhotoVideo',
  };
  export type inputMessagesFilterDocument = {
    _: 'inputMessagesFilterDocument',
  };
  export type inputMessagesFilterUrl = {
    _: 'inputMessagesFilterUrl',
  };
  export type inputMessagesFilterGif = {
    _: 'inputMessagesFilterGif',
  };
  export type inputMessagesFilterVoice = {
    _: 'inputMessagesFilterVoice',
  };
  export type inputMessagesFilterMusic = {
    _: 'inputMessagesFilterMusic',
  };
  export type inputMessagesFilterChatPhotos = {
    _: 'inputMessagesFilterChatPhotos',
  };
  export type inputMessagesFilterPhoneCalls = {
    _: 'inputMessagesFilterPhoneCalls',
    missed?: boolean,
  };
  export type inputMessagesFilterRoundVoice = {
    _: 'inputMessagesFilterRoundVoice',
  };
  export type inputMessagesFilterRoundVideo = {
    _: 'inputMessagesFilterRoundVideo',
  };
  export type inputMessagesFilterMyMentions = {
    _: 'inputMessagesFilterMyMentions',
  };
  export type inputMessagesFilterGeo = {
    _: 'inputMessagesFilterGeo',
  };
  export type inputMessagesFilterContacts = {
    _: 'inputMessagesFilterContacts',
  };
}

/**
 * Ref: https://core.telegram.org/type/Update
 */
export type Update =
  | Update.updateNewMessage
  | Update.updateMessageID
  | Update.updateDeleteMessages
  | Update.updateUserTyping
  | Update.updateChatUserTyping
  | Update.updateChatParticipants
  | Update.updateUserStatus
  | Update.updateUserName
  | Update.updateUserPhoto
  | Update.updateNewEncryptedMessage
  | Update.updateEncryptedChatTyping
  | Update.updateEncryption
  | Update.updateEncryptedMessagesRead
  | Update.updateChatParticipantAdd
  | Update.updateChatParticipantDelete
  | Update.updateDcOptions
  | Update.updateUserBlocked
  | Update.updateNotifySettings
  | Update.updateServiceNotification
  | Update.updatePrivacy
  | Update.updateUserPhone
  | Update.updateReadHistoryInbox
  | Update.updateReadHistoryOutbox
  | Update.updateWebPage
  | Update.updateReadMessagesContents
  | Update.updateChannelTooLong
  | Update.updateChannel
  | Update.updateNewChannelMessage
  | Update.updateReadChannelInbox
  | Update.updateDeleteChannelMessages
  | Update.updateChannelMessageViews
  | Update.updateChatParticipantAdmin
  | Update.updateNewStickerSet
  | Update.updateStickerSetsOrder
  | Update.updateStickerSets
  | Update.updateSavedGifs
  | Update.updateBotInlineQuery
  | Update.updateBotInlineSend
  | Update.updateEditChannelMessage
  | Update.updateChannelPinnedMessage
  | Update.updateBotCallbackQuery
  | Update.updateEditMessage
  | Update.updateInlineBotCallbackQuery
  | Update.updateReadChannelOutbox
  | Update.updateDraftMessage
  | Update.updateReadFeaturedStickers
  | Update.updateRecentStickers
  | Update.updateConfig
  | Update.updatePtsChanged
  | Update.updateChannelWebPage
  | Update.updateDialogPinned
  | Update.updatePinnedDialogs
  | Update.updateBotWebhookJSON
  | Update.updateBotWebhookJSONQuery
  | Update.updateBotShippingQuery
  | Update.updateBotPrecheckoutQuery
  | Update.updatePhoneCall
  | Update.updateLangPackTooLong
  | Update.updateLangPack
  | Update.updateFavedStickers
  | Update.updateChannelReadMessagesContents
  | Update.updateContactsReset
  | Update.updateChannelAvailableMessages
  | Update.updateDialogUnreadMark
  | Update.updateUserPinnedMessage
  | Update.updateChatPinnedMessage
  | Update.updateMessagePoll
  | Update.updateChatDefaultBannedRights
  | Update.updateFolderPeers
  | Update.updatePeerSettings
  | Update.updatePeerLocated
  | Update.updateNewScheduledMessage
  | Update.updateDeleteScheduledMessages
  | Update.updateTheme
;

export namespace Update {
  export type updateNewMessage = {
    _: 'updateNewMessage',
    message: Message,
    pts: number,
    pts_count: number,
  };
  export type updateMessageID = {
    _: 'updateMessageID',
    id: number,
    random_id: string,
  };
  export type updateDeleteMessages = {
    _: 'updateDeleteMessages',
    messages: number[],
    pts: number,
    pts_count: number,
  };
  export type updateUserTyping = {
    _: 'updateUserTyping',
    user_id: number,
    action: SendMessageAction,
  };
  export type updateChatUserTyping = {
    _: 'updateChatUserTyping',
    chat_id: number,
    user_id: number,
    action: SendMessageAction,
  };
  export type updateChatParticipants = {
    _: 'updateChatParticipants',
    participants: ChatParticipants,
  };
  export type updateUserStatus = {
    _: 'updateUserStatus',
    user_id: number,
    status: UserStatus,
  };
  export type updateUserName = {
    _: 'updateUserName',
    user_id: number,
    first_name: string,
    last_name: string,
    username: string,
  };
  export type updateUserPhoto = {
    _: 'updateUserPhoto',
    user_id: number,
    date: number,
    photo: UserProfilePhoto,
    previous: boolean,
  };
  export type updateNewEncryptedMessage = {
    _: 'updateNewEncryptedMessage',
    message: EncryptedMessage,
    qts: number,
  };
  export type updateEncryptedChatTyping = {
    _: 'updateEncryptedChatTyping',
    chat_id: number,
  };
  export type updateEncryption = {
    _: 'updateEncryption',
    chat: EncryptedChat,
    date: number,
  };
  export type updateEncryptedMessagesRead = {
    _: 'updateEncryptedMessagesRead',
    chat_id: number,
    max_date: number,
    date: number,
  };
  export type updateChatParticipantAdd = {
    _: 'updateChatParticipantAdd',
    chat_id: number,
    user_id: number,
    inviter_id: number,
    date: number,
    version: number,
  };
  export type updateChatParticipantDelete = {
    _: 'updateChatParticipantDelete',
    chat_id: number,
    user_id: number,
    version: number,
  };
  export type updateDcOptions = {
    _: 'updateDcOptions',
    dc_options: DcOption[],
  };
  export type updateUserBlocked = {
    _: 'updateUserBlocked',
    user_id: number,
    blocked: boolean,
  };
  export type updateNotifySettings = {
    _: 'updateNotifySettings',
    peer: NotifyPeer,
    notify_settings: PeerNotifySettings,
  };
  export type updateServiceNotification = {
    _: 'updateServiceNotification',
    popup?: boolean,
    inbox_date?: number,
    type: string,
    message: string,
    media: MessageMedia,
    entities: MessageEntity[],
  };
  export type updatePrivacy = {
    _: 'updatePrivacy',
    key: PrivacyKey,
    rules: PrivacyRule[],
  };
  export type updateUserPhone = {
    _: 'updateUserPhone',
    user_id: number,
    phone: string,
  };
  export type updateReadHistoryInbox = {
    _: 'updateReadHistoryInbox',
    folder_id?: number,
    peer: Peer,
    max_id: number,
    still_unread_count: number,
    pts: number,
    pts_count: number,
  };
  export type updateReadHistoryOutbox = {
    _: 'updateReadHistoryOutbox',
    peer: Peer,
    max_id: number,
    pts: number,
    pts_count: number,
  };
  export type updateWebPage = {
    _: 'updateWebPage',
    webpage: WebPage,
    pts: number,
    pts_count: number,
  };
  export type updateReadMessagesContents = {
    _: 'updateReadMessagesContents',
    messages: number[],
    pts: number,
    pts_count: number,
  };
  export type updateChannelTooLong = {
    _: 'updateChannelTooLong',
    channel_id: number,
    pts?: number,
  };
  export type updateChannel = {
    _: 'updateChannel',
    channel_id: number,
  };
  export type updateNewChannelMessage = {
    _: 'updateNewChannelMessage',
    message: Message,
    pts: number,
    pts_count: number,
  };
  export type updateReadChannelInbox = {
    _: 'updateReadChannelInbox',
    folder_id?: number,
    channel_id: number,
    max_id: number,
    still_unread_count: number,
    pts: number,
  };
  export type updateDeleteChannelMessages = {
    _: 'updateDeleteChannelMessages',
    channel_id: number,
    messages: number[],
    pts: number,
    pts_count: number,
  };
  export type updateChannelMessageViews = {
    _: 'updateChannelMessageViews',
    channel_id: number,
    id: number,
    views: number,
  };
  export type updateChatParticipantAdmin = {
    _: 'updateChatParticipantAdmin',
    chat_id: number,
    user_id: number,
    is_admin: boolean,
    version: number,
  };
  export type updateNewStickerSet = {
    _: 'updateNewStickerSet',
    stickerset: MessagesStickerSet,
  };
  export type updateStickerSetsOrder = {
    _: 'updateStickerSetsOrder',
    masks?: boolean,
    order: string[],
  };
  export type updateStickerSets = {
    _: 'updateStickerSets',
  };
  export type updateSavedGifs = {
    _: 'updateSavedGifs',
  };
  export type updateBotInlineQuery = {
    _: 'updateBotInlineQuery',
    query_id: string,
    user_id: number,
    query: string,
    geo?: GeoPoint,
    offset: string,
  };
  export type updateBotInlineSend = {
    _: 'updateBotInlineSend',
    user_id: number,
    query: string,
    geo?: GeoPoint,
    id: string,
    msg_id?: InputBotInlineMessageID,
  };
  export type updateEditChannelMessage = {
    _: 'updateEditChannelMessage',
    message: Message,
    pts: number,
    pts_count: number,
  };
  export type updateChannelPinnedMessage = {
    _: 'updateChannelPinnedMessage',
    channel_id: number,
    id: number,
  };
  export type updateBotCallbackQuery = {
    _: 'updateBotCallbackQuery',
    query_id: string,
    user_id: number,
    peer: Peer,
    msg_id: number,
    chat_instance: string,
    data?: string,
    game_short_name?: string,
  };
  export type updateEditMessage = {
    _: 'updateEditMessage',
    message: Message,
    pts: number,
    pts_count: number,
  };
  export type updateInlineBotCallbackQuery = {
    _: 'updateInlineBotCallbackQuery',
    query_id: string,
    user_id: number,
    msg_id: InputBotInlineMessageID,
    chat_instance: string,
    data?: string,
    game_short_name?: string,
  };
  export type updateReadChannelOutbox = {
    _: 'updateReadChannelOutbox',
    channel_id: number,
    max_id: number,
  };
  export type updateDraftMessage = {
    _: 'updateDraftMessage',
    peer: Peer,
    draft: DraftMessage,
  };
  export type updateReadFeaturedStickers = {
    _: 'updateReadFeaturedStickers',
  };
  export type updateRecentStickers = {
    _: 'updateRecentStickers',
  };
  export type updateConfig = {
    _: 'updateConfig',
  };
  export type updatePtsChanged = {
    _: 'updatePtsChanged',
  };
  export type updateChannelWebPage = {
    _: 'updateChannelWebPage',
    channel_id: number,
    webpage: WebPage,
    pts: number,
    pts_count: number,
  };
  export type updateDialogPinned = {
    _: 'updateDialogPinned',
    pinned?: boolean,
    folder_id?: number,
    peer: DialogPeer,
  };
  export type updatePinnedDialogs = {
    _: 'updatePinnedDialogs',
    folder_id?: number,
    order?: DialogPeer[],
  };
  export type updateBotWebhookJSON = {
    _: 'updateBotWebhookJSON',
    data: DataJSON,
  };
  export type updateBotWebhookJSONQuery = {
    _: 'updateBotWebhookJSONQuery',
    query_id: string,
    data: DataJSON,
    timeout: number,
  };
  export type updateBotShippingQuery = {
    _: 'updateBotShippingQuery',
    query_id: string,
    user_id: number,
    payload: string,
    shipping_address: PostAddress,
  };
  export type updateBotPrecheckoutQuery = {
    _: 'updateBotPrecheckoutQuery',
    query_id: string,
    user_id: number,
    payload: string,
    info?: PaymentRequestedInfo,
    shipping_option_id?: string,
    currency: string,
    total_amount: string,
  };
  export type updatePhoneCall = {
    _: 'updatePhoneCall',
    phone_call: PhoneCall,
  };
  export type updateLangPackTooLong = {
    _: 'updateLangPackTooLong',
    lang_code: string,
  };
  export type updateLangPack = {
    _: 'updateLangPack',
    difference: LangPackDifference,
  };
  export type updateFavedStickers = {
    _: 'updateFavedStickers',
  };
  export type updateChannelReadMessagesContents = {
    _: 'updateChannelReadMessagesContents',
    channel_id: number,
    messages: number[],
  };
  export type updateContactsReset = {
    _: 'updateContactsReset',
  };
  export type updateChannelAvailableMessages = {
    _: 'updateChannelAvailableMessages',
    channel_id: number,
    available_min_id: number,
  };
  export type updateDialogUnreadMark = {
    _: 'updateDialogUnreadMark',
    unread?: boolean,
    peer: DialogPeer,
  };
  export type updateUserPinnedMessage = {
    _: 'updateUserPinnedMessage',
    user_id: number,
    id: number,
  };
  export type updateChatPinnedMessage = {
    _: 'updateChatPinnedMessage',
    chat_id: number,
    id: number,
    version: number,
  };
  export type updateMessagePoll = {
    _: 'updateMessagePoll',
    poll_id: string,
    poll?: Poll,
    results: PollResults,
  };
  export type updateChatDefaultBannedRights = {
    _: 'updateChatDefaultBannedRights',
    peer: Peer,
    default_banned_rights: ChatBannedRights,
    version: number,
  };
  export type updateFolderPeers = {
    _: 'updateFolderPeers',
    folder_peers: FolderPeer[],
    pts: number,
    pts_count: number,
  };
  export type updatePeerSettings = {
    _: 'updatePeerSettings',
    peer: Peer,
    settings: PeerSettings,
  };
  export type updatePeerLocated = {
    _: 'updatePeerLocated',
    peers: PeerLocated[],
  };
  export type updateNewScheduledMessage = {
    _: 'updateNewScheduledMessage',
    message: Message,
  };
  export type updateDeleteScheduledMessages = {
    _: 'updateDeleteScheduledMessages',
    peer: Peer,
    messages: number[],
  };
  export type updateTheme = {
    _: 'updateTheme',
    theme: Theme,
  };
}

/**
 * Ref: https://core.telegram.org/type/updates.State
 */
export type UpdatesState =
  | UpdatesState.updatesState
;

export namespace UpdatesState {
  export type updatesState = {
    _: 'updates.state',
    pts: number,
    qts: number,
    date: number,
    seq: number,
    unread_count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/updates.Difference
 */
export type UpdatesDifference =
  | UpdatesDifference.updatesDifferenceEmpty
  | UpdatesDifference.updatesDifference
  | UpdatesDifference.updatesDifferenceSlice
  | UpdatesDifference.updatesDifferenceTooLong
;

export namespace UpdatesDifference {
  export type updatesDifferenceEmpty = {
    _: 'updates.differenceEmpty',
    date: number,
    seq: number,
  };
  export type updatesDifference = {
    _: 'updates.difference',
    new_messages: Message[],
    new_encrypted_messages: EncryptedMessage[],
    other_updates: Update[],
    chats: Chat[],
    users: User[],
    state: UpdatesState,
  };
  export type updatesDifferenceSlice = {
    _: 'updates.differenceSlice',
    new_messages: Message[],
    new_encrypted_messages: EncryptedMessage[],
    other_updates: Update[],
    chats: Chat[],
    users: User[],
    intermediate_state: UpdatesState,
  };
  export type updatesDifferenceTooLong = {
    _: 'updates.differenceTooLong',
    pts: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Updates
 */
export type Updates =
  | Updates.updatesTooLong
  | Updates.updateShortMessage
  | Updates.updateShortChatMessage
  | Updates.updateShort
  | Updates.updatesCombined
  | Updates.updates
  | Updates.updateShortSentMessage
;

export namespace Updates {
  export type updatesTooLong = {
    _: 'updatesTooLong',
  };
  export type updateShortMessage = {
    _: 'updateShortMessage',
    out?: boolean,
    mentioned?: boolean,
    media_unread?: boolean,
    silent?: boolean,
    id: number,
    user_id: number,
    message: string,
    pts: number,
    pts_count: number,
    date: number,
    fwd_from?: MessageFwdHeader,
    via_bot_id?: number,
    reply_to_msg_id?: number,
    entities?: MessageEntity[],
  };
  export type updateShortChatMessage = {
    _: 'updateShortChatMessage',
    out?: boolean,
    mentioned?: boolean,
    media_unread?: boolean,
    silent?: boolean,
    id: number,
    from_id: number,
    chat_id: number,
    message: string,
    pts: number,
    pts_count: number,
    date: number,
    fwd_from?: MessageFwdHeader,
    via_bot_id?: number,
    reply_to_msg_id?: number,
    entities?: MessageEntity[],
  };
  export type updateShort = {
    _: 'updateShort',
    update: Update,
    date: number,
  };
  export type updatesCombined = {
    _: 'updatesCombined',
    updates: Update[],
    users: User[],
    chats: Chat[],
    date: number,
    seq_start: number,
    seq: number,
  };
  export type updates = {
    _: 'updates',
    updates: Update[],
    users: User[],
    chats: Chat[],
    date: number,
    seq: number,
  };
  export type updateShortSentMessage = {
    _: 'updateShortSentMessage',
    out?: boolean,
    id: number,
    pts: number,
    pts_count: number,
    date: number,
    media?: MessageMedia,
    entities?: MessageEntity[],
  };
}

/**
 * Ref: https://core.telegram.org/type/photos.Photos
 */
export type PhotosPhotos =
  | PhotosPhotos.photosPhotos
  | PhotosPhotos.photosPhotosSlice
;

export namespace PhotosPhotos {
  export type photosPhotos = {
    _: 'photos.photos',
    photos: Photo[],
    users: User[],
  };
  export type photosPhotosSlice = {
    _: 'photos.photosSlice',
    count: number,
    photos: Photo[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/photos.Photo
 */
export type PhotosPhoto =
  | PhotosPhoto.photosPhoto
;

export namespace PhotosPhoto {
  export type photosPhoto = {
    _: 'photos.photo',
    photo: Photo,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/upload.File
 */
export type UploadFile =
  | UploadFile.uploadFile
  | UploadFile.uploadFileCdnRedirect
;

export namespace UploadFile {
  export type uploadFile = {
    _: 'upload.file',
    type: StorageFileType,
    mtime: number,
    bytes: string,
  };
  export type uploadFileCdnRedirect = {
    _: 'upload.fileCdnRedirect',
    dc_id: number,
    file_token: string,
    encryption_key: string,
    encryption_iv: string,
    file_hashes: FileHash[],
  };
}

/**
 * Ref: https://core.telegram.org/type/DcOption
 */
export type DcOption =
  | DcOption.dcOption
;

export namespace DcOption {
  export type dcOption = {
    _: 'dcOption',
    ipv6?: boolean,
    media_only?: boolean,
    tcpo_only?: boolean,
    cdn?: boolean,
    static?: boolean,
    id: number,
    ip_address: string,
    port: number,
    secret?: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/Config
 */
export type Config =
  | Config.config
;

export namespace Config {
  export type config = {
    _: 'config',
    phonecalls_enabled?: boolean,
    default_p2p_contacts?: boolean,
    preload_featured_stickers?: boolean,
    ignore_phone_entities?: boolean,
    revoke_pm_inbox?: boolean,
    blocked_mode?: boolean,
    pfs_enabled?: boolean,
    date: number,
    expires: number,
    test_mode: boolean,
    this_dc: number,
    dc_options: DcOption[],
    dc_txt_domain_name: string,
    chat_size_max: number,
    megagroup_size_max: number,
    forwarded_count_max: number,
    online_update_period_ms: number,
    offline_blur_timeout_ms: number,
    offline_idle_timeout_ms: number,
    online_cloud_timeout_ms: number,
    notify_cloud_delay_ms: number,
    notify_default_delay_ms: number,
    push_chat_period_ms: number,
    push_chat_limit: number,
    saved_gifs_limit: number,
    edit_time_limit: number,
    revoke_time_limit: number,
    revoke_pm_time_limit: number,
    rating_e_decay: number,
    stickers_recent_limit: number,
    stickers_faved_limit: number,
    channels_read_media_period: number,
    tmp_sessions?: number,
    pinned_dialogs_count_max: number,
    pinned_infolder_count_max: number,
    call_receive_timeout_ms: number,
    call_ring_timeout_ms: number,
    call_connect_timeout_ms: number,
    call_packet_timeout_ms: number,
    me_url_prefix: string,
    autoupdate_url_prefix?: string,
    gif_search_username?: string,
    venue_search_username?: string,
    img_search_username?: string,
    static_maps_provider?: string,
    caption_length_max: number,
    message_length_max: number,
    webfile_dc_id: number,
    suggested_lang_code?: string,
    lang_pack_version?: number,
    base_lang_pack_version?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/NearestDc
 */
export type NearestDc =
  | NearestDc.nearestDc
;

export namespace NearestDc {
  export type nearestDc = {
    _: 'nearestDc',
    country: string,
    this_dc: number,
    nearest_dc: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/help.AppUpdate
 */
export type HelpAppUpdate =
  | HelpAppUpdate.helpAppUpdate
  | HelpAppUpdate.helpNoAppUpdate
;

export namespace HelpAppUpdate {
  export type helpAppUpdate = {
    _: 'help.appUpdate',
    can_not_skip?: boolean,
    id: number,
    version: string,
    text: string,
    entities: MessageEntity[],
    document?: Document,
    url?: string,
  };
  export type helpNoAppUpdate = {
    _: 'help.noAppUpdate',
  };
}

/**
 * Ref: https://core.telegram.org/type/help.InviteText
 */
export type HelpInviteText =
  | HelpInviteText.helpInviteText
;

export namespace HelpInviteText {
  export type helpInviteText = {
    _: 'help.inviteText',
    message: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/EncryptedChat
 */
export type EncryptedChat =
  | EncryptedChat.encryptedChatEmpty
  | EncryptedChat.encryptedChatWaiting
  | EncryptedChat.encryptedChatRequested
  | EncryptedChat.encryptedChat
  | EncryptedChat.encryptedChatDiscarded
;

export namespace EncryptedChat {
  export type encryptedChatEmpty = {
    _: 'encryptedChatEmpty',
    id: number,
  };
  export type encryptedChatWaiting = {
    _: 'encryptedChatWaiting',
    id: number,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
  };
  export type encryptedChatRequested = {
    _: 'encryptedChatRequested',
    id: number,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    g_a: string,
  };
  export type encryptedChat = {
    _: 'encryptedChat',
    id: number,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    g_a_or_b: string,
    key_fingerprint: string,
  };
  export type encryptedChatDiscarded = {
    _: 'encryptedChatDiscarded',
    id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputEncryptedChat
 */
export type InputEncryptedChat =
  | InputEncryptedChat.inputEncryptedChat
;

export namespace InputEncryptedChat {
  export type inputEncryptedChat = {
    _: 'inputEncryptedChat',
    chat_id: number,
    access_hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/EncryptedFile
 */
export type EncryptedFile =
  | EncryptedFile.encryptedFileEmpty
  | EncryptedFile.encryptedFile
;

export namespace EncryptedFile {
  export type encryptedFileEmpty = {
    _: 'encryptedFileEmpty',
  };
  export type encryptedFile = {
    _: 'encryptedFile',
    id: string,
    access_hash: string,
    size: number,
    dc_id: number,
    key_fingerprint: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputEncryptedFile
 */
export type InputEncryptedFile =
  | InputEncryptedFile.inputEncryptedFileEmpty
  | InputEncryptedFile.inputEncryptedFileUploaded
  | InputEncryptedFile.inputEncryptedFile
  | InputEncryptedFile.inputEncryptedFileBigUploaded
;

export namespace InputEncryptedFile {
  export type inputEncryptedFileEmpty = {
    _: 'inputEncryptedFileEmpty',
  };
  export type inputEncryptedFileUploaded = {
    _: 'inputEncryptedFileUploaded',
    id: string,
    parts: number,
    md5_checksum: string,
    key_fingerprint: number,
  };
  export type inputEncryptedFile = {
    _: 'inputEncryptedFile',
    id: string,
    access_hash: string,
  };
  export type inputEncryptedFileBigUploaded = {
    _: 'inputEncryptedFileBigUploaded',
    id: string,
    parts: number,
    key_fingerprint: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/EncryptedMessage
 */
export type EncryptedMessage =
  | EncryptedMessage.encryptedMessage
  | EncryptedMessage.encryptedMessageService
;

export namespace EncryptedMessage {
  export type encryptedMessage = {
    _: 'encryptedMessage',
    random_id: string,
    chat_id: number,
    date: number,
    bytes: string,
    file: EncryptedFile,
  };
  export type encryptedMessageService = {
    _: 'encryptedMessageService',
    random_id: string,
    chat_id: number,
    date: number,
    bytes: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.DhConfig
 */
export type MessagesDhConfig =
  | MessagesDhConfig.messagesDhConfigNotModified
  | MessagesDhConfig.messagesDhConfig
;

export namespace MessagesDhConfig {
  export type messagesDhConfigNotModified = {
    _: 'messages.dhConfigNotModified',
    random: string,
  };
  export type messagesDhConfig = {
    _: 'messages.dhConfig',
    g: number,
    p: string,
    version: number,
    random: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.SentEncryptedMessage
 */
export type MessagesSentEncryptedMessage =
  | MessagesSentEncryptedMessage.messagesSentEncryptedMessage
  | MessagesSentEncryptedMessage.messagesSentEncryptedFile
;

export namespace MessagesSentEncryptedMessage {
  export type messagesSentEncryptedMessage = {
    _: 'messages.sentEncryptedMessage',
    date: number,
  };
  export type messagesSentEncryptedFile = {
    _: 'messages.sentEncryptedFile',
    date: number,
    file: EncryptedFile,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputDocument
 */
export type InputDocument =
  | InputDocument.inputDocumentEmpty
  | InputDocument.inputDocument
;

export namespace InputDocument {
  export type inputDocumentEmpty = {
    _: 'inputDocumentEmpty',
  };
  export type inputDocument = {
    _: 'inputDocument',
    id: string,
    access_hash: string,
    file_reference: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/Document
 */
export type Document =
  | Document.documentEmpty
  | Document.document
;

export namespace Document {
  export type documentEmpty = {
    _: 'documentEmpty',
    id: string,
  };
  export type document = {
    _: 'document',
    id: string,
    access_hash: string,
    file_reference: string,
    date: number,
    mime_type: string,
    size: number,
    thumbs?: PhotoSize[],
    dc_id: number,
    attributes: DocumentAttribute[],
  };
}

/**
 * Ref: https://core.telegram.org/type/help.Support
 */
export type HelpSupport =
  | HelpSupport.helpSupport
;

export namespace HelpSupport {
  export type helpSupport = {
    _: 'help.support',
    phone_number: string,
    user: User,
  };
}

/**
 * Ref: https://core.telegram.org/type/NotifyPeer
 */
export type NotifyPeer =
  | NotifyPeer.notifyPeer
  | NotifyPeer.notifyUsers
  | NotifyPeer.notifyChats
  | NotifyPeer.notifyBroadcasts
;

export namespace NotifyPeer {
  export type notifyPeer = {
    _: 'notifyPeer',
    peer: Peer,
  };
  export type notifyUsers = {
    _: 'notifyUsers',
  };
  export type notifyChats = {
    _: 'notifyChats',
  };
  export type notifyBroadcasts = {
    _: 'notifyBroadcasts',
  };
}

/**
 * Ref: https://core.telegram.org/type/SendMessageAction
 */
export type SendMessageAction =
  | SendMessageAction.sendMessageTypingAction
  | SendMessageAction.sendMessageCancelAction
  | SendMessageAction.sendMessageRecordVideoAction
  | SendMessageAction.sendMessageUploadVideoAction
  | SendMessageAction.sendMessageRecordAudioAction
  | SendMessageAction.sendMessageUploadAudioAction
  | SendMessageAction.sendMessageUploadPhotoAction
  | SendMessageAction.sendMessageUploadDocumentAction
  | SendMessageAction.sendMessageGeoLocationAction
  | SendMessageAction.sendMessageChooseContactAction
  | SendMessageAction.sendMessageGamePlayAction
  | SendMessageAction.sendMessageRecordRoundAction
  | SendMessageAction.sendMessageUploadRoundAction
;

export namespace SendMessageAction {
  export type sendMessageTypingAction = {
    _: 'sendMessageTypingAction',
  };
  export type sendMessageCancelAction = {
    _: 'sendMessageCancelAction',
  };
  export type sendMessageRecordVideoAction = {
    _: 'sendMessageRecordVideoAction',
  };
  export type sendMessageUploadVideoAction = {
    _: 'sendMessageUploadVideoAction',
    progress: number,
  };
  export type sendMessageRecordAudioAction = {
    _: 'sendMessageRecordAudioAction',
  };
  export type sendMessageUploadAudioAction = {
    _: 'sendMessageUploadAudioAction',
    progress: number,
  };
  export type sendMessageUploadPhotoAction = {
    _: 'sendMessageUploadPhotoAction',
    progress: number,
  };
  export type sendMessageUploadDocumentAction = {
    _: 'sendMessageUploadDocumentAction',
    progress: number,
  };
  export type sendMessageGeoLocationAction = {
    _: 'sendMessageGeoLocationAction',
  };
  export type sendMessageChooseContactAction = {
    _: 'sendMessageChooseContactAction',
  };
  export type sendMessageGamePlayAction = {
    _: 'sendMessageGamePlayAction',
  };
  export type sendMessageRecordRoundAction = {
    _: 'sendMessageRecordRoundAction',
  };
  export type sendMessageUploadRoundAction = {
    _: 'sendMessageUploadRoundAction',
    progress: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.Found
 */
export type ContactsFound =
  | ContactsFound.contactsFound
;

export namespace ContactsFound {
  export type contactsFound = {
    _: 'contacts.found',
    my_results: Peer[],
    results: Peer[],
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPrivacyKey
 */
export type InputPrivacyKey =
  | InputPrivacyKey.inputPrivacyKeyStatusTimestamp
  | InputPrivacyKey.inputPrivacyKeyChatInvite
  | InputPrivacyKey.inputPrivacyKeyPhoneCall
  | InputPrivacyKey.inputPrivacyKeyPhoneP2P
  | InputPrivacyKey.inputPrivacyKeyForwards
  | InputPrivacyKey.inputPrivacyKeyProfilePhoto
  | InputPrivacyKey.inputPrivacyKeyPhoneNumber
  | InputPrivacyKey.inputPrivacyKeyAddedByPhone
;

export namespace InputPrivacyKey {
  export type inputPrivacyKeyStatusTimestamp = {
    _: 'inputPrivacyKeyStatusTimestamp',
  };
  export type inputPrivacyKeyChatInvite = {
    _: 'inputPrivacyKeyChatInvite',
  };
  export type inputPrivacyKeyPhoneCall = {
    _: 'inputPrivacyKeyPhoneCall',
  };
  export type inputPrivacyKeyPhoneP2P = {
    _: 'inputPrivacyKeyPhoneP2P',
  };
  export type inputPrivacyKeyForwards = {
    _: 'inputPrivacyKeyForwards',
  };
  export type inputPrivacyKeyProfilePhoto = {
    _: 'inputPrivacyKeyProfilePhoto',
  };
  export type inputPrivacyKeyPhoneNumber = {
    _: 'inputPrivacyKeyPhoneNumber',
  };
  export type inputPrivacyKeyAddedByPhone = {
    _: 'inputPrivacyKeyAddedByPhone',
  };
}

/**
 * Ref: https://core.telegram.org/type/PrivacyKey
 */
export type PrivacyKey =
  | PrivacyKey.privacyKeyStatusTimestamp
  | PrivacyKey.privacyKeyChatInvite
  | PrivacyKey.privacyKeyPhoneCall
  | PrivacyKey.privacyKeyPhoneP2P
  | PrivacyKey.privacyKeyForwards
  | PrivacyKey.privacyKeyProfilePhoto
  | PrivacyKey.privacyKeyPhoneNumber
  | PrivacyKey.privacyKeyAddedByPhone
;

export namespace PrivacyKey {
  export type privacyKeyStatusTimestamp = {
    _: 'privacyKeyStatusTimestamp',
  };
  export type privacyKeyChatInvite = {
    _: 'privacyKeyChatInvite',
  };
  export type privacyKeyPhoneCall = {
    _: 'privacyKeyPhoneCall',
  };
  export type privacyKeyPhoneP2P = {
    _: 'privacyKeyPhoneP2P',
  };
  export type privacyKeyForwards = {
    _: 'privacyKeyForwards',
  };
  export type privacyKeyProfilePhoto = {
    _: 'privacyKeyProfilePhoto',
  };
  export type privacyKeyPhoneNumber = {
    _: 'privacyKeyPhoneNumber',
  };
  export type privacyKeyAddedByPhone = {
    _: 'privacyKeyAddedByPhone',
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPrivacyRule
 */
export type InputPrivacyRule =
  | InputPrivacyRule.inputPrivacyValueAllowContacts
  | InputPrivacyRule.inputPrivacyValueAllowAll
  | InputPrivacyRule.inputPrivacyValueAllowUsers
  | InputPrivacyRule.inputPrivacyValueDisallowContacts
  | InputPrivacyRule.inputPrivacyValueDisallowAll
  | InputPrivacyRule.inputPrivacyValueDisallowUsers
  | InputPrivacyRule.inputPrivacyValueAllowChatParticipants
  | InputPrivacyRule.inputPrivacyValueDisallowChatParticipants
;

export namespace InputPrivacyRule {
  export type inputPrivacyValueAllowContacts = {
    _: 'inputPrivacyValueAllowContacts',
  };
  export type inputPrivacyValueAllowAll = {
    _: 'inputPrivacyValueAllowAll',
  };
  export type inputPrivacyValueAllowUsers = {
    _: 'inputPrivacyValueAllowUsers',
    users: InputUser[],
  };
  export type inputPrivacyValueDisallowContacts = {
    _: 'inputPrivacyValueDisallowContacts',
  };
  export type inputPrivacyValueDisallowAll = {
    _: 'inputPrivacyValueDisallowAll',
  };
  export type inputPrivacyValueDisallowUsers = {
    _: 'inputPrivacyValueDisallowUsers',
    users: InputUser[],
  };
  export type inputPrivacyValueAllowChatParticipants = {
    _: 'inputPrivacyValueAllowChatParticipants',
    chats: number[],
  };
  export type inputPrivacyValueDisallowChatParticipants = {
    _: 'inputPrivacyValueDisallowChatParticipants',
    chats: number[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PrivacyRule
 */
export type PrivacyRule =
  | PrivacyRule.privacyValueAllowContacts
  | PrivacyRule.privacyValueAllowAll
  | PrivacyRule.privacyValueAllowUsers
  | PrivacyRule.privacyValueDisallowContacts
  | PrivacyRule.privacyValueDisallowAll
  | PrivacyRule.privacyValueDisallowUsers
  | PrivacyRule.privacyValueAllowChatParticipants
  | PrivacyRule.privacyValueDisallowChatParticipants
;

export namespace PrivacyRule {
  export type privacyValueAllowContacts = {
    _: 'privacyValueAllowContacts',
  };
  export type privacyValueAllowAll = {
    _: 'privacyValueAllowAll',
  };
  export type privacyValueAllowUsers = {
    _: 'privacyValueAllowUsers',
    users: number[],
  };
  export type privacyValueDisallowContacts = {
    _: 'privacyValueDisallowContacts',
  };
  export type privacyValueDisallowAll = {
    _: 'privacyValueDisallowAll',
  };
  export type privacyValueDisallowUsers = {
    _: 'privacyValueDisallowUsers',
    users: number[],
  };
  export type privacyValueAllowChatParticipants = {
    _: 'privacyValueAllowChatParticipants',
    chats: number[],
  };
  export type privacyValueDisallowChatParticipants = {
    _: 'privacyValueDisallowChatParticipants',
    chats: number[],
  };
}

/**
 * Ref: https://core.telegram.org/type/account.PrivacyRules
 */
export type AccountPrivacyRules =
  | AccountPrivacyRules.accountPrivacyRules
;

export namespace AccountPrivacyRules {
  export type accountPrivacyRules = {
    _: 'account.privacyRules',
    rules: PrivacyRule[],
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/AccountDaysTTL
 */
export type AccountDaysTTL =
  | AccountDaysTTL.accountDaysTTL
;

export namespace AccountDaysTTL {
  export type accountDaysTTL = {
    _: 'accountDaysTTL',
    days: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/DocumentAttribute
 */
export type DocumentAttribute =
  | DocumentAttribute.documentAttributeImageSize
  | DocumentAttribute.documentAttributeAnimated
  | DocumentAttribute.documentAttributeSticker
  | DocumentAttribute.documentAttributeVideo
  | DocumentAttribute.documentAttributeAudio
  | DocumentAttribute.documentAttributeFilename
  | DocumentAttribute.documentAttributeHasStickers
;

export namespace DocumentAttribute {
  export type documentAttributeImageSize = {
    _: 'documentAttributeImageSize',
    w: number,
    h: number,
  };
  export type documentAttributeAnimated = {
    _: 'documentAttributeAnimated',
  };
  export type documentAttributeSticker = {
    _: 'documentAttributeSticker',
    mask?: boolean,
    alt: string,
    stickerset: InputStickerSet,
    mask_coords?: MaskCoords,
  };
  export type documentAttributeVideo = {
    _: 'documentAttributeVideo',
    round_message?: boolean,
    supports_streaming?: boolean,
    duration: number,
    w: number,
    h: number,
  };
  export type documentAttributeAudio = {
    _: 'documentAttributeAudio',
    voice?: boolean,
    duration: number,
    title?: string,
    performer?: string,
    waveform?: string,
  };
  export type documentAttributeFilename = {
    _: 'documentAttributeFilename',
    file_name: string,
  };
  export type documentAttributeHasStickers = {
    _: 'documentAttributeHasStickers',
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.Stickers
 */
export type MessagesStickers =
  | MessagesStickers.messagesStickersNotModified
  | MessagesStickers.messagesStickers
;

export namespace MessagesStickers {
  export type messagesStickersNotModified = {
    _: 'messages.stickersNotModified',
  };
  export type messagesStickers = {
    _: 'messages.stickers',
    hash: number,
    stickers: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/StickerPack
 */
export type StickerPack =
  | StickerPack.stickerPack
;

export namespace StickerPack {
  export type stickerPack = {
    _: 'stickerPack',
    emoticon: string,
    documents: string[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.AllStickers
 */
export type MessagesAllStickers =
  | MessagesAllStickers.messagesAllStickersNotModified
  | MessagesAllStickers.messagesAllStickers
;

export namespace MessagesAllStickers {
  export type messagesAllStickersNotModified = {
    _: 'messages.allStickersNotModified',
  };
  export type messagesAllStickers = {
    _: 'messages.allStickers',
    hash: number,
    sets: StickerSet[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.AffectedMessages
 */
export type MessagesAffectedMessages =
  | MessagesAffectedMessages.messagesAffectedMessages
;

export namespace MessagesAffectedMessages {
  export type messagesAffectedMessages = {
    _: 'messages.affectedMessages',
    pts: number,
    pts_count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/WebPage
 */
export type WebPage =
  | WebPage.webPageEmpty
  | WebPage.webPagePending
  | WebPage.webPage
  | WebPage.webPageNotModified
;

export namespace WebPage {
  export type webPageEmpty = {
    _: 'webPageEmpty',
    id: string,
  };
  export type webPagePending = {
    _: 'webPagePending',
    id: string,
    date: number,
  };
  export type webPage = {
    _: 'webPage',
    id: string,
    url: string,
    display_url: string,
    hash: number,
    type?: string,
    site_name?: string,
    title?: string,
    description?: string,
    photo?: Photo,
    embed_url?: string,
    embed_type?: string,
    embed_width?: number,
    embed_height?: number,
    duration?: number,
    author?: string,
    document?: Document,
    documents?: Document[],
    cached_page?: Page,
  };
  export type webPageNotModified = {
    _: 'webPageNotModified',
  };
}

/**
 * Ref: https://core.telegram.org/type/Authorization
 */
export type Authorization =
  | Authorization.authorization
;

export namespace Authorization {
  export type authorization = {
    _: 'authorization',
    current?: boolean,
    official_app?: boolean,
    password_pending?: boolean,
    hash: string,
    device_model: string,
    platform: string,
    system_version: string,
    api_id: number,
    app_name: string,
    app_version: string,
    date_created: number,
    date_active: number,
    ip: string,
    country: string,
    region: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.Authorizations
 */
export type AccountAuthorizations =
  | AccountAuthorizations.accountAuthorizations
;

export namespace AccountAuthorizations {
  export type accountAuthorizations = {
    _: 'account.authorizations',
    authorizations: Authorization[],
  };
}

/**
 * Ref: https://core.telegram.org/type/account.Password
 */
export type AccountPassword =
  | AccountPassword.accountPassword
;

export namespace AccountPassword {
  export type accountPassword = {
    _: 'account.password',
    has_recovery?: boolean,
    has_secure_values?: boolean,
    has_password?: boolean,
    current_algo?: PasswordKdfAlgo,
    srp_B?: string,
    srp_id?: string,
    hint?: string,
    email_unconfirmed_pattern?: string,
    new_algo: PasswordKdfAlgo,
    new_secure_algo: SecurePasswordKdfAlgo,
    secure_random: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.PasswordSettings
 */
export type AccountPasswordSettings =
  | AccountPasswordSettings.accountPasswordSettings
;

export namespace AccountPasswordSettings {
  export type accountPasswordSettings = {
    _: 'account.passwordSettings',
    email?: string,
    secure_settings?: SecureSecretSettings,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.PasswordInputSettings
 */
export type AccountPasswordInputSettings =
  | AccountPasswordInputSettings.accountPasswordInputSettings
;

export namespace AccountPasswordInputSettings {
  export type accountPasswordInputSettings = {
    _: 'account.passwordInputSettings',
    new_algo?: PasswordKdfAlgo,
    new_password_hash?: string,
    hint?: string,
    email?: string,
    new_secure_settings?: SecureSecretSettings,
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.PasswordRecovery
 */
export type AuthPasswordRecovery =
  | AuthPasswordRecovery.authPasswordRecovery
;

export namespace AuthPasswordRecovery {
  export type authPasswordRecovery = {
    _: 'auth.passwordRecovery',
    email_pattern: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/ReceivedNotifyMessage
 */
export type ReceivedNotifyMessage =
  | ReceivedNotifyMessage.receivedNotifyMessage
;

export namespace ReceivedNotifyMessage {
  export type receivedNotifyMessage = {
    _: 'receivedNotifyMessage',
    id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ExportedChatInvite
 */
export type ExportedChatInvite =
  | ExportedChatInvite.chatInviteEmpty
  | ExportedChatInvite.chatInviteExported
;

export namespace ExportedChatInvite {
  export type chatInviteEmpty = {
    _: 'chatInviteEmpty',
  };
  export type chatInviteExported = {
    _: 'chatInviteExported',
    link: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatInvite
 */
export type ChatInvite =
  | ChatInvite.chatInviteAlready
  | ChatInvite.chatInvite
;

export namespace ChatInvite {
  export type chatInviteAlready = {
    _: 'chatInviteAlready',
    chat: Chat,
  };
  export type chatInvite = {
    _: 'chatInvite',
    channel?: boolean,
    broadcast?: boolean,
    public?: boolean,
    megagroup?: boolean,
    title: string,
    photo: Photo,
    participants_count: number,
    participants?: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputStickerSet
 */
export type InputStickerSet =
  | InputStickerSet.inputStickerSetEmpty
  | InputStickerSet.inputStickerSetID
  | InputStickerSet.inputStickerSetShortName
  | InputStickerSet.inputStickerSetAnimatedEmoji
;

export namespace InputStickerSet {
  export type inputStickerSetEmpty = {
    _: 'inputStickerSetEmpty',
  };
  export type inputStickerSetID = {
    _: 'inputStickerSetID',
    id: string,
    access_hash: string,
  };
  export type inputStickerSetShortName = {
    _: 'inputStickerSetShortName',
    short_name: string,
  };
  export type inputStickerSetAnimatedEmoji = {
    _: 'inputStickerSetAnimatedEmoji',
  };
}

/**
 * Ref: https://core.telegram.org/type/StickerSet
 */
export type StickerSet =
  | StickerSet.stickerSet
;

export namespace StickerSet {
  export type stickerSet = {
    _: 'stickerSet',
    archived?: boolean,
    official?: boolean,
    masks?: boolean,
    animated?: boolean,
    installed_date?: number,
    id: string,
    access_hash: string,
    title: string,
    short_name: string,
    thumb?: PhotoSize,
    thumb_dc_id?: number,
    count: number,
    hash: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.StickerSet
 */
export type MessagesStickerSet =
  | MessagesStickerSet.messagesStickerSet
;

export namespace MessagesStickerSet {
  export type messagesStickerSet = {
    _: 'messages.stickerSet',
    set: StickerSet,
    packs: StickerPack[],
    documents: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/BotCommand
 */
export type BotCommand =
  | BotCommand.botCommand
;

export namespace BotCommand {
  export type botCommand = {
    _: 'botCommand',
    command: string,
    description: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/BotInfo
 */
export type BotInfo =
  | BotInfo.botInfo
;

export namespace BotInfo {
  export type botInfo = {
    _: 'botInfo',
    user_id: number,
    description: string,
    commands: BotCommand[],
  };
}

/**
 * Ref: https://core.telegram.org/type/KeyboardButton
 */
export type KeyboardButton =
  | KeyboardButton.keyboardButton
  | KeyboardButton.keyboardButtonUrl
  | KeyboardButton.keyboardButtonCallback
  | KeyboardButton.keyboardButtonRequestPhone
  | KeyboardButton.keyboardButtonRequestGeoLocation
  | KeyboardButton.keyboardButtonSwitchInline
  | KeyboardButton.keyboardButtonGame
  | KeyboardButton.keyboardButtonBuy
  | KeyboardButton.keyboardButtonUrlAuth
  | KeyboardButton.inputKeyboardButtonUrlAuth
;

export namespace KeyboardButton {
  export type keyboardButton = {
    _: 'keyboardButton',
    text: string,
  };
  export type keyboardButtonUrl = {
    _: 'keyboardButtonUrl',
    text: string,
    url: string,
  };
  export type keyboardButtonCallback = {
    _: 'keyboardButtonCallback',
    text: string,
    data: string,
  };
  export type keyboardButtonRequestPhone = {
    _: 'keyboardButtonRequestPhone',
    text: string,
  };
  export type keyboardButtonRequestGeoLocation = {
    _: 'keyboardButtonRequestGeoLocation',
    text: string,
  };
  export type keyboardButtonSwitchInline = {
    _: 'keyboardButtonSwitchInline',
    same_peer?: boolean,
    text: string,
    query: string,
  };
  export type keyboardButtonGame = {
    _: 'keyboardButtonGame',
    text: string,
  };
  export type keyboardButtonBuy = {
    _: 'keyboardButtonBuy',
    text: string,
  };
  export type keyboardButtonUrlAuth = {
    _: 'keyboardButtonUrlAuth',
    text: string,
    fwd_text?: string,
    url: string,
    button_id: number,
  };
  export type inputKeyboardButtonUrlAuth = {
    _: 'inputKeyboardButtonUrlAuth',
    request_write_access?: boolean,
    text: string,
    fwd_text?: string,
    url: string,
    bot: InputUser,
  };
}

/**
 * Ref: https://core.telegram.org/type/KeyboardButtonRow
 */
export type KeyboardButtonRow =
  | KeyboardButtonRow.keyboardButtonRow
;

export namespace KeyboardButtonRow {
  export type keyboardButtonRow = {
    _: 'keyboardButtonRow',
    buttons: KeyboardButton[],
  };
}

/**
 * Ref: https://core.telegram.org/type/ReplyMarkup
 */
export type ReplyMarkup =
  | ReplyMarkup.replyKeyboardHide
  | ReplyMarkup.replyKeyboardForceReply
  | ReplyMarkup.replyKeyboardMarkup
  | ReplyMarkup.replyInlineMarkup
;

export namespace ReplyMarkup {
  export type replyKeyboardHide = {
    _: 'replyKeyboardHide',
    selective?: boolean,
  };
  export type replyKeyboardForceReply = {
    _: 'replyKeyboardForceReply',
    single_use?: boolean,
    selective?: boolean,
  };
  export type replyKeyboardMarkup = {
    _: 'replyKeyboardMarkup',
    resize?: boolean,
    single_use?: boolean,
    selective?: boolean,
    rows: KeyboardButtonRow[],
  };
  export type replyInlineMarkup = {
    _: 'replyInlineMarkup',
    rows: KeyboardButtonRow[],
  };
}

/**
 * Ref: https://core.telegram.org/type/MessageEntity
 */
export type MessageEntity =
  | MessageEntity.messageEntityUnknown
  | MessageEntity.messageEntityMention
  | MessageEntity.messageEntityHashtag
  | MessageEntity.messageEntityBotCommand
  | MessageEntity.messageEntityUrl
  | MessageEntity.messageEntityEmail
  | MessageEntity.messageEntityBold
  | MessageEntity.messageEntityItalic
  | MessageEntity.messageEntityCode
  | MessageEntity.messageEntityPre
  | MessageEntity.messageEntityTextUrl
  | MessageEntity.messageEntityMentionName
  | MessageEntity.inputMessageEntityMentionName
  | MessageEntity.messageEntityPhone
  | MessageEntity.messageEntityCashtag
  | MessageEntity.messageEntityUnderline
  | MessageEntity.messageEntityStrike
  | MessageEntity.messageEntityBlockquote
;

export namespace MessageEntity {
  export type messageEntityUnknown = {
    _: 'messageEntityUnknown',
    offset: number,
    length: number,
  };
  export type messageEntityMention = {
    _: 'messageEntityMention',
    offset: number,
    length: number,
  };
  export type messageEntityHashtag = {
    _: 'messageEntityHashtag',
    offset: number,
    length: number,
  };
  export type messageEntityBotCommand = {
    _: 'messageEntityBotCommand',
    offset: number,
    length: number,
  };
  export type messageEntityUrl = {
    _: 'messageEntityUrl',
    offset: number,
    length: number,
  };
  export type messageEntityEmail = {
    _: 'messageEntityEmail',
    offset: number,
    length: number,
  };
  export type messageEntityBold = {
    _: 'messageEntityBold',
    offset: number,
    length: number,
  };
  export type messageEntityItalic = {
    _: 'messageEntityItalic',
    offset: number,
    length: number,
  };
  export type messageEntityCode = {
    _: 'messageEntityCode',
    offset: number,
    length: number,
  };
  export type messageEntityPre = {
    _: 'messageEntityPre',
    offset: number,
    length: number,
    language: string,
  };
  export type messageEntityTextUrl = {
    _: 'messageEntityTextUrl',
    offset: number,
    length: number,
    url: string,
  };
  export type messageEntityMentionName = {
    _: 'messageEntityMentionName',
    offset: number,
    length: number,
    user_id: number,
  };
  export type inputMessageEntityMentionName = {
    _: 'inputMessageEntityMentionName',
    offset: number,
    length: number,
    user_id: InputUser,
  };
  export type messageEntityPhone = {
    _: 'messageEntityPhone',
    offset: number,
    length: number,
  };
  export type messageEntityCashtag = {
    _: 'messageEntityCashtag',
    offset: number,
    length: number,
  };
  export type messageEntityUnderline = {
    _: 'messageEntityUnderline',
    offset: number,
    length: number,
  };
  export type messageEntityStrike = {
    _: 'messageEntityStrike',
    offset: number,
    length: number,
  };
  export type messageEntityBlockquote = {
    _: 'messageEntityBlockquote',
    offset: number,
    length: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputChannel
 */
export type InputChannel =
  | InputChannel.inputChannelEmpty
  | InputChannel.inputChannel
  | InputChannel.inputChannelFromMessage
;

export namespace InputChannel {
  export type inputChannelEmpty = {
    _: 'inputChannelEmpty',
  };
  export type inputChannel = {
    _: 'inputChannel',
    channel_id: number,
    access_hash: string,
  };
  export type inputChannelFromMessage = {
    _: 'inputChannelFromMessage',
    peer: InputPeer,
    msg_id: number,
    channel_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.ResolvedPeer
 */
export type ContactsResolvedPeer =
  | ContactsResolvedPeer.contactsResolvedPeer
;

export namespace ContactsResolvedPeer {
  export type contactsResolvedPeer = {
    _: 'contacts.resolvedPeer',
    peer: Peer,
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/MessageRange
 */
export type MessageRange =
  | MessageRange.messageRange
;

export namespace MessageRange {
  export type messageRange = {
    _: 'messageRange',
    min_id: number,
    max_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/updates.ChannelDifference
 */
export type UpdatesChannelDifference =
  | UpdatesChannelDifference.updatesChannelDifferenceEmpty
  | UpdatesChannelDifference.updatesChannelDifferenceTooLong
  | UpdatesChannelDifference.updatesChannelDifference
;

export namespace UpdatesChannelDifference {
  export type updatesChannelDifferenceEmpty = {
    _: 'updates.channelDifferenceEmpty',
    final?: boolean,
    pts: number,
    timeout?: number,
  };
  export type updatesChannelDifferenceTooLong = {
    _: 'updates.channelDifferenceTooLong',
    final?: boolean,
    timeout?: number,
    dialog: Dialog,
    messages: Message[],
    chats: Chat[],
    users: User[],
  };
  export type updatesChannelDifference = {
    _: 'updates.channelDifference',
    final?: boolean,
    pts: number,
    timeout?: number,
    new_messages: Message[],
    other_updates: Update[],
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelMessagesFilter
 */
export type ChannelMessagesFilter =
  | ChannelMessagesFilter.channelMessagesFilterEmpty
  | ChannelMessagesFilter.channelMessagesFilter
;

export namespace ChannelMessagesFilter {
  export type channelMessagesFilterEmpty = {
    _: 'channelMessagesFilterEmpty',
  };
  export type channelMessagesFilter = {
    _: 'channelMessagesFilter',
    exclude_new_messages?: boolean,
    ranges: MessageRange[],
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelParticipant
 */
export type ChannelParticipant =
  | ChannelParticipant.channelParticipant
  | ChannelParticipant.channelParticipantSelf
  | ChannelParticipant.channelParticipantCreator
  | ChannelParticipant.channelParticipantAdmin
  | ChannelParticipant.channelParticipantBanned
;

export namespace ChannelParticipant {
  export type channelParticipant = {
    _: 'channelParticipant',
    user_id: number,
    date: number,
  };
  export type channelParticipantSelf = {
    _: 'channelParticipantSelf',
    user_id: number,
    inviter_id: number,
    date: number,
  };
  export type channelParticipantCreator = {
    _: 'channelParticipantCreator',
    user_id: number,
    rank?: string,
  };
  export type channelParticipantAdmin = {
    _: 'channelParticipantAdmin',
    can_edit?: boolean,
    self?: boolean,
    user_id: number,
    inviter_id?: number,
    promoted_by: number,
    date: number,
    admin_rights: ChatAdminRights,
    rank?: string,
  };
  export type channelParticipantBanned = {
    _: 'channelParticipantBanned',
    left?: boolean,
    user_id: number,
    kicked_by: number,
    date: number,
    banned_rights: ChatBannedRights,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelParticipantsFilter
 */
export type ChannelParticipantsFilter =
  | ChannelParticipantsFilter.channelParticipantsRecent
  | ChannelParticipantsFilter.channelParticipantsAdmins
  | ChannelParticipantsFilter.channelParticipantsKicked
  | ChannelParticipantsFilter.channelParticipantsBots
  | ChannelParticipantsFilter.channelParticipantsBanned
  | ChannelParticipantsFilter.channelParticipantsSearch
  | ChannelParticipantsFilter.channelParticipantsContacts
;

export namespace ChannelParticipantsFilter {
  export type channelParticipantsRecent = {
    _: 'channelParticipantsRecent',
  };
  export type channelParticipantsAdmins = {
    _: 'channelParticipantsAdmins',
  };
  export type channelParticipantsKicked = {
    _: 'channelParticipantsKicked',
    q: string,
  };
  export type channelParticipantsBots = {
    _: 'channelParticipantsBots',
  };
  export type channelParticipantsBanned = {
    _: 'channelParticipantsBanned',
    q: string,
  };
  export type channelParticipantsSearch = {
    _: 'channelParticipantsSearch',
    q: string,
  };
  export type channelParticipantsContacts = {
    _: 'channelParticipantsContacts',
    q: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/channels.ChannelParticipants
 */
export type ChannelsChannelParticipants =
  | ChannelsChannelParticipants.channelsChannelParticipants
  | ChannelsChannelParticipants.channelsChannelParticipantsNotModified
;

export namespace ChannelsChannelParticipants {
  export type channelsChannelParticipants = {
    _: 'channels.channelParticipants',
    count: number,
    participants: ChannelParticipant[],
    users: User[],
  };
  export type channelsChannelParticipantsNotModified = {
    _: 'channels.channelParticipantsNotModified',
  };
}

/**
 * Ref: https://core.telegram.org/type/channels.ChannelParticipant
 */
export type ChannelsChannelParticipant =
  | ChannelsChannelParticipant.channelsChannelParticipant
;

export namespace ChannelsChannelParticipant {
  export type channelsChannelParticipant = {
    _: 'channels.channelParticipant',
    participant: ChannelParticipant,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/help.TermsOfService
 */
export type HelpTermsOfService =
  | HelpTermsOfService.helpTermsOfService
;

export namespace HelpTermsOfService {
  export type helpTermsOfService = {
    _: 'help.termsOfService',
    popup?: boolean,
    id: DataJSON,
    text: string,
    entities: MessageEntity[],
    min_age_confirm?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/FoundGif
 */
export type FoundGif =
  | FoundGif.foundGif
  | FoundGif.foundGifCached
;

export namespace FoundGif {
  export type foundGif = {
    _: 'foundGif',
    url: string,
    thumb_url: string,
    content_url: string,
    content_type: string,
    w: number,
    h: number,
  };
  export type foundGifCached = {
    _: 'foundGifCached',
    url: string,
    photo: Photo,
    document: Document,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.FoundGifs
 */
export type MessagesFoundGifs =
  | MessagesFoundGifs.messagesFoundGifs
;

export namespace MessagesFoundGifs {
  export type messagesFoundGifs = {
    _: 'messages.foundGifs',
    next_offset: number,
    results: FoundGif[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.SavedGifs
 */
export type MessagesSavedGifs =
  | MessagesSavedGifs.messagesSavedGifsNotModified
  | MessagesSavedGifs.messagesSavedGifs
;

export namespace MessagesSavedGifs {
  export type messagesSavedGifsNotModified = {
    _: 'messages.savedGifsNotModified',
  };
  export type messagesSavedGifs = {
    _: 'messages.savedGifs',
    hash: number,
    gifs: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputBotInlineMessage
 */
export type InputBotInlineMessage =
  | InputBotInlineMessage.inputBotInlineMessageMediaAuto
  | InputBotInlineMessage.inputBotInlineMessageText
  | InputBotInlineMessage.inputBotInlineMessageMediaGeo
  | InputBotInlineMessage.inputBotInlineMessageMediaVenue
  | InputBotInlineMessage.inputBotInlineMessageMediaContact
  | InputBotInlineMessage.inputBotInlineMessageGame
;

export namespace InputBotInlineMessage {
  export type inputBotInlineMessageMediaAuto = {
    _: 'inputBotInlineMessageMediaAuto',
    message: string,
    entities?: MessageEntity[],
    reply_markup?: ReplyMarkup,
  };
  export type inputBotInlineMessageText = {
    _: 'inputBotInlineMessageText',
    no_webpage?: boolean,
    message: string,
    entities?: MessageEntity[],
    reply_markup?: ReplyMarkup,
  };
  export type inputBotInlineMessageMediaGeo = {
    _: 'inputBotInlineMessageMediaGeo',
    geo_point: InputGeoPoint,
    period: number,
    reply_markup?: ReplyMarkup,
  };
  export type inputBotInlineMessageMediaVenue = {
    _: 'inputBotInlineMessageMediaVenue',
    geo_point: InputGeoPoint,
    title: string,
    address: string,
    provider: string,
    venue_id: string,
    venue_type: string,
    reply_markup?: ReplyMarkup,
  };
  export type inputBotInlineMessageMediaContact = {
    _: 'inputBotInlineMessageMediaContact',
    phone_number: string,
    first_name: string,
    last_name: string,
    vcard: string,
    reply_markup?: ReplyMarkup,
  };
  export type inputBotInlineMessageGame = {
    _: 'inputBotInlineMessageGame',
    reply_markup?: ReplyMarkup,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputBotInlineResult
 */
export type InputBotInlineResult =
  | InputBotInlineResult.inputBotInlineResult
  | InputBotInlineResult.inputBotInlineResultPhoto
  | InputBotInlineResult.inputBotInlineResultDocument
  | InputBotInlineResult.inputBotInlineResultGame
;

export namespace InputBotInlineResult {
  export type inputBotInlineResult = {
    _: 'inputBotInlineResult',
    id: string,
    type: string,
    title?: string,
    description?: string,
    url?: string,
    thumb?: InputWebDocument,
    content?: InputWebDocument,
    send_message: InputBotInlineMessage,
  };
  export type inputBotInlineResultPhoto = {
    _: 'inputBotInlineResultPhoto',
    id: string,
    type: string,
    photo: InputPhoto,
    send_message: InputBotInlineMessage,
  };
  export type inputBotInlineResultDocument = {
    _: 'inputBotInlineResultDocument',
    id: string,
    type: string,
    title?: string,
    description?: string,
    document: InputDocument,
    send_message: InputBotInlineMessage,
  };
  export type inputBotInlineResultGame = {
    _: 'inputBotInlineResultGame',
    id: string,
    short_name: string,
    send_message: InputBotInlineMessage,
  };
}

/**
 * Ref: https://core.telegram.org/type/BotInlineMessage
 */
export type BotInlineMessage =
  | BotInlineMessage.botInlineMessageMediaAuto
  | BotInlineMessage.botInlineMessageText
  | BotInlineMessage.botInlineMessageMediaGeo
  | BotInlineMessage.botInlineMessageMediaVenue
  | BotInlineMessage.botInlineMessageMediaContact
;

export namespace BotInlineMessage {
  export type botInlineMessageMediaAuto = {
    _: 'botInlineMessageMediaAuto',
    message: string,
    entities?: MessageEntity[],
    reply_markup?: ReplyMarkup,
  };
  export type botInlineMessageText = {
    _: 'botInlineMessageText',
    no_webpage?: boolean,
    message: string,
    entities?: MessageEntity[],
    reply_markup?: ReplyMarkup,
  };
  export type botInlineMessageMediaGeo = {
    _: 'botInlineMessageMediaGeo',
    geo: GeoPoint,
    period: number,
    reply_markup?: ReplyMarkup,
  };
  export type botInlineMessageMediaVenue = {
    _: 'botInlineMessageMediaVenue',
    geo: GeoPoint,
    title: string,
    address: string,
    provider: string,
    venue_id: string,
    venue_type: string,
    reply_markup?: ReplyMarkup,
  };
  export type botInlineMessageMediaContact = {
    _: 'botInlineMessageMediaContact',
    phone_number: string,
    first_name: string,
    last_name: string,
    vcard: string,
    reply_markup?: ReplyMarkup,
  };
}

/**
 * Ref: https://core.telegram.org/type/BotInlineResult
 */
export type BotInlineResult =
  | BotInlineResult.botInlineResult
  | BotInlineResult.botInlineMediaResult
;

export namespace BotInlineResult {
  export type botInlineResult = {
    _: 'botInlineResult',
    id: string,
    type: string,
    title?: string,
    description?: string,
    url?: string,
    thumb?: WebDocument,
    content?: WebDocument,
    send_message: BotInlineMessage,
  };
  export type botInlineMediaResult = {
    _: 'botInlineMediaResult',
    id: string,
    type: string,
    photo?: Photo,
    document?: Document,
    title?: string,
    description?: string,
    send_message: BotInlineMessage,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.BotResults
 */
export type MessagesBotResults =
  | MessagesBotResults.messagesBotResults
;

export namespace MessagesBotResults {
  export type messagesBotResults = {
    _: 'messages.botResults',
    gallery?: boolean,
    query_id: string,
    next_offset?: string,
    switch_pm?: InlineBotSwitchPM,
    results: BotInlineResult[],
    cache_time: number,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/ExportedMessageLink
 */
export type ExportedMessageLink =
  | ExportedMessageLink.exportedMessageLink
;

export namespace ExportedMessageLink {
  export type exportedMessageLink = {
    _: 'exportedMessageLink',
    link: string,
    html: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/MessageFwdHeader
 */
export type MessageFwdHeader =
  | MessageFwdHeader.messageFwdHeader
;

export namespace MessageFwdHeader {
  export type messageFwdHeader = {
    _: 'messageFwdHeader',
    from_id?: number,
    from_name?: string,
    date: number,
    channel_id?: number,
    channel_post?: number,
    post_author?: string,
    saved_from_peer?: Peer,
    saved_from_msg_id?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.CodeType
 */
export type AuthCodeType =
  | AuthCodeType.authCodeTypeSms
  | AuthCodeType.authCodeTypeCall
  | AuthCodeType.authCodeTypeFlashCall
;

export namespace AuthCodeType {
  export type authCodeTypeSms = {
    _: 'auth.codeTypeSms',
  };
  export type authCodeTypeCall = {
    _: 'auth.codeTypeCall',
  };
  export type authCodeTypeFlashCall = {
    _: 'auth.codeTypeFlashCall',
  };
}

/**
 * Ref: https://core.telegram.org/type/auth.SentCodeType
 */
export type AuthSentCodeType =
  | AuthSentCodeType.authSentCodeTypeApp
  | AuthSentCodeType.authSentCodeTypeSms
  | AuthSentCodeType.authSentCodeTypeCall
  | AuthSentCodeType.authSentCodeTypeFlashCall
;

export namespace AuthSentCodeType {
  export type authSentCodeTypeApp = {
    _: 'auth.sentCodeTypeApp',
    length: number,
  };
  export type authSentCodeTypeSms = {
    _: 'auth.sentCodeTypeSms',
    length: number,
  };
  export type authSentCodeTypeCall = {
    _: 'auth.sentCodeTypeCall',
    length: number,
  };
  export type authSentCodeTypeFlashCall = {
    _: 'auth.sentCodeTypeFlashCall',
    pattern: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.BotCallbackAnswer
 */
export type MessagesBotCallbackAnswer =
  | MessagesBotCallbackAnswer.messagesBotCallbackAnswer
;

export namespace MessagesBotCallbackAnswer {
  export type messagesBotCallbackAnswer = {
    _: 'messages.botCallbackAnswer',
    alert?: boolean,
    has_url?: boolean,
    native_ui?: boolean,
    message?: string,
    url?: string,
    cache_time: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.MessageEditData
 */
export type MessagesMessageEditData =
  | MessagesMessageEditData.messagesMessageEditData
;

export namespace MessagesMessageEditData {
  export type messagesMessageEditData = {
    _: 'messages.messageEditData',
    caption?: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputBotInlineMessageID
 */
export type InputBotInlineMessageID =
  | InputBotInlineMessageID.inputBotInlineMessageID
;

export namespace InputBotInlineMessageID {
  export type inputBotInlineMessageID = {
    _: 'inputBotInlineMessageID',
    dc_id: number,
    id: string,
    access_hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InlineBotSwitchPM
 */
export type InlineBotSwitchPM =
  | InlineBotSwitchPM.inlineBotSwitchPM
;

export namespace InlineBotSwitchPM {
  export type inlineBotSwitchPM = {
    _: 'inlineBotSwitchPM',
    text: string,
    start_param: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.PeerDialogs
 */
export type MessagesPeerDialogs =
  | MessagesPeerDialogs.messagesPeerDialogs
;

export namespace MessagesPeerDialogs {
  export type messagesPeerDialogs = {
    _: 'messages.peerDialogs',
    dialogs: Dialog[],
    messages: Message[],
    chats: Chat[],
    users: User[],
    state: UpdatesState,
  };
}

/**
 * Ref: https://core.telegram.org/type/TopPeer
 */
export type TopPeer =
  | TopPeer.topPeer
;

export namespace TopPeer {
  export type topPeer = {
    _: 'topPeer',
    peer: Peer,
    rating: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/TopPeerCategory
 */
export type TopPeerCategory =
  | TopPeerCategory.topPeerCategoryBotsPM
  | TopPeerCategory.topPeerCategoryBotsInline
  | TopPeerCategory.topPeerCategoryCorrespondents
  | TopPeerCategory.topPeerCategoryGroups
  | TopPeerCategory.topPeerCategoryChannels
  | TopPeerCategory.topPeerCategoryPhoneCalls
  | TopPeerCategory.topPeerCategoryForwardUsers
  | TopPeerCategory.topPeerCategoryForwardChats
;

export namespace TopPeerCategory {
  export type topPeerCategoryBotsPM = {
    _: 'topPeerCategoryBotsPM',
  };
  export type topPeerCategoryBotsInline = {
    _: 'topPeerCategoryBotsInline',
  };
  export type topPeerCategoryCorrespondents = {
    _: 'topPeerCategoryCorrespondents',
  };
  export type topPeerCategoryGroups = {
    _: 'topPeerCategoryGroups',
  };
  export type topPeerCategoryChannels = {
    _: 'topPeerCategoryChannels',
  };
  export type topPeerCategoryPhoneCalls = {
    _: 'topPeerCategoryPhoneCalls',
  };
  export type topPeerCategoryForwardUsers = {
    _: 'topPeerCategoryForwardUsers',
  };
  export type topPeerCategoryForwardChats = {
    _: 'topPeerCategoryForwardChats',
  };
}

/**
 * Ref: https://core.telegram.org/type/TopPeerCategoryPeers
 */
export type TopPeerCategoryPeers =
  | TopPeerCategoryPeers.topPeerCategoryPeers
;

export namespace TopPeerCategoryPeers {
  export type topPeerCategoryPeers = {
    _: 'topPeerCategoryPeers',
    category: TopPeerCategory,
    count: number,
    peers: TopPeer[],
  };
}

/**
 * Ref: https://core.telegram.org/type/contacts.TopPeers
 */
export type ContactsTopPeers =
  | ContactsTopPeers.contactsTopPeersNotModified
  | ContactsTopPeers.contactsTopPeers
  | ContactsTopPeers.contactsTopPeersDisabled
;

export namespace ContactsTopPeers {
  export type contactsTopPeersNotModified = {
    _: 'contacts.topPeersNotModified',
  };
  export type contactsTopPeers = {
    _: 'contacts.topPeers',
    categories: TopPeerCategoryPeers[],
    chats: Chat[],
    users: User[],
  };
  export type contactsTopPeersDisabled = {
    _: 'contacts.topPeersDisabled',
  };
}

/**
 * Ref: https://core.telegram.org/type/DraftMessage
 */
export type DraftMessage =
  | DraftMessage.draftMessageEmpty
  | DraftMessage.draftMessage
;

export namespace DraftMessage {
  export type draftMessageEmpty = {
    _: 'draftMessageEmpty',
    date?: number,
  };
  export type draftMessage = {
    _: 'draftMessage',
    no_webpage?: boolean,
    reply_to_msg_id?: number,
    message: string,
    entities?: MessageEntity[],
    date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.FeaturedStickers
 */
export type MessagesFeaturedStickers =
  | MessagesFeaturedStickers.messagesFeaturedStickersNotModified
  | MessagesFeaturedStickers.messagesFeaturedStickers
;

export namespace MessagesFeaturedStickers {
  export type messagesFeaturedStickersNotModified = {
    _: 'messages.featuredStickersNotModified',
  };
  export type messagesFeaturedStickers = {
    _: 'messages.featuredStickers',
    hash: number,
    sets: StickerSetCovered[],
    unread: string[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.RecentStickers
 */
export type MessagesRecentStickers =
  | MessagesRecentStickers.messagesRecentStickersNotModified
  | MessagesRecentStickers.messagesRecentStickers
;

export namespace MessagesRecentStickers {
  export type messagesRecentStickersNotModified = {
    _: 'messages.recentStickersNotModified',
  };
  export type messagesRecentStickers = {
    _: 'messages.recentStickers',
    hash: number,
    packs: StickerPack[],
    stickers: Document[],
    dates: number[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.ArchivedStickers
 */
export type MessagesArchivedStickers =
  | MessagesArchivedStickers.messagesArchivedStickers
;

export namespace MessagesArchivedStickers {
  export type messagesArchivedStickers = {
    _: 'messages.archivedStickers',
    count: number,
    sets: StickerSetCovered[],
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.StickerSetInstallResult
 */
export type MessagesStickerSetInstallResult =
  | MessagesStickerSetInstallResult.messagesStickerSetInstallResultSuccess
  | MessagesStickerSetInstallResult.messagesStickerSetInstallResultArchive
;

export namespace MessagesStickerSetInstallResult {
  export type messagesStickerSetInstallResultSuccess = {
    _: 'messages.stickerSetInstallResultSuccess',
  };
  export type messagesStickerSetInstallResultArchive = {
    _: 'messages.stickerSetInstallResultArchive',
    sets: StickerSetCovered[],
  };
}

/**
 * Ref: https://core.telegram.org/type/StickerSetCovered
 */
export type StickerSetCovered =
  | StickerSetCovered.stickerSetCovered
  | StickerSetCovered.stickerSetMultiCovered
;

export namespace StickerSetCovered {
  export type stickerSetCovered = {
    _: 'stickerSetCovered',
    set: StickerSet,
    cover: Document,
  };
  export type stickerSetMultiCovered = {
    _: 'stickerSetMultiCovered',
    set: StickerSet,
    covers: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/MaskCoords
 */
export type MaskCoords =
  | MaskCoords.maskCoords
;

export namespace MaskCoords {
  export type maskCoords = {
    _: 'maskCoords',
    n: number,
    x: number,
    y: number,
    zoom: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputStickeredMedia
 */
export type InputStickeredMedia =
  | InputStickeredMedia.inputStickeredMediaPhoto
  | InputStickeredMedia.inputStickeredMediaDocument
;

export namespace InputStickeredMedia {
  export type inputStickeredMediaPhoto = {
    _: 'inputStickeredMediaPhoto',
    id: InputPhoto,
  };
  export type inputStickeredMediaDocument = {
    _: 'inputStickeredMediaDocument',
    id: InputDocument,
  };
}

/**
 * Ref: https://core.telegram.org/type/Game
 */
export type Game =
  | Game.game
;

export namespace Game {
  export type game = {
    _: 'game',
    id: string,
    access_hash: string,
    short_name: string,
    title: string,
    description: string,
    photo: Photo,
    document?: Document,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputGame
 */
export type InputGame =
  | InputGame.inputGameID
  | InputGame.inputGameShortName
;

export namespace InputGame {
  export type inputGameID = {
    _: 'inputGameID',
    id: string,
    access_hash: string,
  };
  export type inputGameShortName = {
    _: 'inputGameShortName',
    bot_id: InputUser,
    short_name: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/HighScore
 */
export type HighScore =
  | HighScore.highScore
;

export namespace HighScore {
  export type highScore = {
    _: 'highScore',
    pos: number,
    user_id: number,
    score: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.HighScores
 */
export type MessagesHighScores =
  | MessagesHighScores.messagesHighScores
;

export namespace MessagesHighScores {
  export type messagesHighScores = {
    _: 'messages.highScores',
    scores: HighScore[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/RichText
 */
export type RichText =
  | RichText.textEmpty
  | RichText.textPlain
  | RichText.textBold
  | RichText.textItalic
  | RichText.textUnderline
  | RichText.textStrike
  | RichText.textFixed
  | RichText.textUrl
  | RichText.textEmail
  | RichText.textConcat
  | RichText.textSubscript
  | RichText.textSuperscript
  | RichText.textMarked
  | RichText.textPhone
  | RichText.textImage
  | RichText.textAnchor
;

export namespace RichText {
  export type textEmpty = {
    _: 'textEmpty',
  };
  export type textPlain = {
    _: 'textPlain',
    text: string,
  };
  export type textBold = {
    _: 'textBold',
    text: RichText,
  };
  export type textItalic = {
    _: 'textItalic',
    text: RichText,
  };
  export type textUnderline = {
    _: 'textUnderline',
    text: RichText,
  };
  export type textStrike = {
    _: 'textStrike',
    text: RichText,
  };
  export type textFixed = {
    _: 'textFixed',
    text: RichText,
  };
  export type textUrl = {
    _: 'textUrl',
    text: RichText,
    url: string,
    webpage_id: string,
  };
  export type textEmail = {
    _: 'textEmail',
    text: RichText,
    email: string,
  };
  export type textConcat = {
    _: 'textConcat',
    texts: RichText[],
  };
  export type textSubscript = {
    _: 'textSubscript',
    text: RichText,
  };
  export type textSuperscript = {
    _: 'textSuperscript',
    text: RichText,
  };
  export type textMarked = {
    _: 'textMarked',
    text: RichText,
  };
  export type textPhone = {
    _: 'textPhone',
    text: RichText,
    phone: string,
  };
  export type textImage = {
    _: 'textImage',
    document_id: string,
    w: number,
    h: number,
  };
  export type textAnchor = {
    _: 'textAnchor',
    text: RichText,
    name: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PageBlock
 */
export type PageBlock =
  | PageBlock.pageBlockUnsupported
  | PageBlock.pageBlockTitle
  | PageBlock.pageBlockSubtitle
  | PageBlock.pageBlockAuthorDate
  | PageBlock.pageBlockHeader
  | PageBlock.pageBlockSubheader
  | PageBlock.pageBlockParagraph
  | PageBlock.pageBlockPreformatted
  | PageBlock.pageBlockFooter
  | PageBlock.pageBlockDivider
  | PageBlock.pageBlockAnchor
  | PageBlock.pageBlockList
  | PageBlock.pageBlockBlockquote
  | PageBlock.pageBlockPullquote
  | PageBlock.pageBlockPhoto
  | PageBlock.pageBlockVideo
  | PageBlock.pageBlockCover
  | PageBlock.pageBlockEmbed
  | PageBlock.pageBlockEmbedPost
  | PageBlock.pageBlockCollage
  | PageBlock.pageBlockSlideshow
  | PageBlock.pageBlockChannel
  | PageBlock.pageBlockAudio
  | PageBlock.pageBlockKicker
  | PageBlock.pageBlockTable
  | PageBlock.pageBlockOrderedList
  | PageBlock.pageBlockDetails
  | PageBlock.pageBlockRelatedArticles
  | PageBlock.pageBlockMap
;

export namespace PageBlock {
  export type pageBlockUnsupported = {
    _: 'pageBlockUnsupported',
  };
  export type pageBlockTitle = {
    _: 'pageBlockTitle',
    text: RichText,
  };
  export type pageBlockSubtitle = {
    _: 'pageBlockSubtitle',
    text: RichText,
  };
  export type pageBlockAuthorDate = {
    _: 'pageBlockAuthorDate',
    author: RichText,
    published_date: number,
  };
  export type pageBlockHeader = {
    _: 'pageBlockHeader',
    text: RichText,
  };
  export type pageBlockSubheader = {
    _: 'pageBlockSubheader',
    text: RichText,
  };
  export type pageBlockParagraph = {
    _: 'pageBlockParagraph',
    text: RichText,
  };
  export type pageBlockPreformatted = {
    _: 'pageBlockPreformatted',
    text: RichText,
    language: string,
  };
  export type pageBlockFooter = {
    _: 'pageBlockFooter',
    text: RichText,
  };
  export type pageBlockDivider = {
    _: 'pageBlockDivider',
  };
  export type pageBlockAnchor = {
    _: 'pageBlockAnchor',
    name: string,
  };
  export type pageBlockList = {
    _: 'pageBlockList',
    items: PageListItem[],
  };
  export type pageBlockBlockquote = {
    _: 'pageBlockBlockquote',
    text: RichText,
    caption: RichText,
  };
  export type pageBlockPullquote = {
    _: 'pageBlockPullquote',
    text: RichText,
    caption: RichText,
  };
  export type pageBlockPhoto = {
    _: 'pageBlockPhoto',
    photo_id: string,
    caption: PageCaption,
    url?: string,
    webpage_id?: string,
  };
  export type pageBlockVideo = {
    _: 'pageBlockVideo',
    autoplay?: boolean,
    loop?: boolean,
    video_id: string,
    caption: PageCaption,
  };
  export type pageBlockCover = {
    _: 'pageBlockCover',
    cover: PageBlock,
  };
  export type pageBlockEmbed = {
    _: 'pageBlockEmbed',
    full_width?: boolean,
    allow_scrolling?: boolean,
    url?: string,
    html?: string,
    poster_photo_id?: string,
    w?: number,
    h?: number,
    caption: PageCaption,
  };
  export type pageBlockEmbedPost = {
    _: 'pageBlockEmbedPost',
    url: string,
    webpage_id: string,
    author_photo_id: string,
    author: string,
    date: number,
    blocks: PageBlock[],
    caption: PageCaption,
  };
  export type pageBlockCollage = {
    _: 'pageBlockCollage',
    items: PageBlock[],
    caption: PageCaption,
  };
  export type pageBlockSlideshow = {
    _: 'pageBlockSlideshow',
    items: PageBlock[],
    caption: PageCaption,
  };
  export type pageBlockChannel = {
    _: 'pageBlockChannel',
    channel: Chat,
  };
  export type pageBlockAudio = {
    _: 'pageBlockAudio',
    audio_id: string,
    caption: PageCaption,
  };
  export type pageBlockKicker = {
    _: 'pageBlockKicker',
    text: RichText,
  };
  export type pageBlockTable = {
    _: 'pageBlockTable',
    bordered?: boolean,
    striped?: boolean,
    title: RichText,
    rows: PageTableRow[],
  };
  export type pageBlockOrderedList = {
    _: 'pageBlockOrderedList',
    items: PageListOrderedItem[],
  };
  export type pageBlockDetails = {
    _: 'pageBlockDetails',
    open?: boolean,
    blocks: PageBlock[],
    title: RichText,
  };
  export type pageBlockRelatedArticles = {
    _: 'pageBlockRelatedArticles',
    title: RichText,
    articles: PageRelatedArticle[],
  };
  export type pageBlockMap = {
    _: 'pageBlockMap',
    geo: GeoPoint,
    zoom: number,
    w: number,
    h: number,
    caption: PageCaption,
  };
}

/**
 * Ref: https://core.telegram.org/type/PhoneCallDiscardReason
 */
export type PhoneCallDiscardReason =
  | PhoneCallDiscardReason.phoneCallDiscardReasonMissed
  | PhoneCallDiscardReason.phoneCallDiscardReasonDisconnect
  | PhoneCallDiscardReason.phoneCallDiscardReasonHangup
  | PhoneCallDiscardReason.phoneCallDiscardReasonBusy
;

export namespace PhoneCallDiscardReason {
  export type phoneCallDiscardReasonMissed = {
    _: 'phoneCallDiscardReasonMissed',
  };
  export type phoneCallDiscardReasonDisconnect = {
    _: 'phoneCallDiscardReasonDisconnect',
  };
  export type phoneCallDiscardReasonHangup = {
    _: 'phoneCallDiscardReasonHangup',
  };
  export type phoneCallDiscardReasonBusy = {
    _: 'phoneCallDiscardReasonBusy',
  };
}

/**
 * Ref: https://core.telegram.org/type/DataJSON
 */
export type DataJSON =
  | DataJSON.dataJSON
;

export namespace DataJSON {
  export type dataJSON = {
    _: 'dataJSON',
    data: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/LabeledPrice
 */
export type LabeledPrice =
  | LabeledPrice.labeledPrice
;

export namespace LabeledPrice {
  export type labeledPrice = {
    _: 'labeledPrice',
    label: string,
    amount: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/Invoice
 */
export type Invoice =
  | Invoice.invoice
;

export namespace Invoice {
  export type invoice = {
    _: 'invoice',
    test?: boolean,
    name_requested?: boolean,
    phone_requested?: boolean,
    email_requested?: boolean,
    shipping_address_requested?: boolean,
    flexible?: boolean,
    phone_to_provider?: boolean,
    email_to_provider?: boolean,
    currency: string,
    prices: LabeledPrice[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PaymentCharge
 */
export type PaymentCharge =
  | PaymentCharge.paymentCharge
;

export namespace PaymentCharge {
  export type paymentCharge = {
    _: 'paymentCharge',
    id: string,
    provider_charge_id: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PostAddress
 */
export type PostAddress =
  | PostAddress.postAddress
;

export namespace PostAddress {
  export type postAddress = {
    _: 'postAddress',
    street_line1: string,
    street_line2: string,
    city: string,
    state: string,
    country_iso2: string,
    post_code: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PaymentRequestedInfo
 */
export type PaymentRequestedInfo =
  | PaymentRequestedInfo.paymentRequestedInfo
;

export namespace PaymentRequestedInfo {
  export type paymentRequestedInfo = {
    _: 'paymentRequestedInfo',
    name?: string,
    phone?: string,
    email?: string,
    shipping_address?: PostAddress,
  };
}

/**
 * Ref: https://core.telegram.org/type/PaymentSavedCredentials
 */
export type PaymentSavedCredentials =
  | PaymentSavedCredentials.paymentSavedCredentialsCard
;

export namespace PaymentSavedCredentials {
  export type paymentSavedCredentialsCard = {
    _: 'paymentSavedCredentialsCard',
    id: string,
    title: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/WebDocument
 */
export type WebDocument =
  | WebDocument.webDocument
  | WebDocument.webDocumentNoProxy
;

export namespace WebDocument {
  export type webDocument = {
    _: 'webDocument',
    url: string,
    access_hash: string,
    size: number,
    mime_type: string,
    attributes: DocumentAttribute[],
  };
  export type webDocumentNoProxy = {
    _: 'webDocumentNoProxy',
    url: string,
    size: number,
    mime_type: string,
    attributes: DocumentAttribute[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputWebDocument
 */
export type InputWebDocument =
  | InputWebDocument.inputWebDocument
;

export namespace InputWebDocument {
  export type inputWebDocument = {
    _: 'inputWebDocument',
    url: string,
    size: number,
    mime_type: string,
    attributes: DocumentAttribute[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputWebFileLocation
 */
export type InputWebFileLocation =
  | InputWebFileLocation.inputWebFileLocation
  | InputWebFileLocation.inputWebFileGeoPointLocation
;

export namespace InputWebFileLocation {
  export type inputWebFileLocation = {
    _: 'inputWebFileLocation',
    url: string,
    access_hash: string,
  };
  export type inputWebFileGeoPointLocation = {
    _: 'inputWebFileGeoPointLocation',
    geo_point: InputGeoPoint,
    access_hash: string,
    w: number,
    h: number,
    zoom: number,
    scale: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/upload.WebFile
 */
export type UploadWebFile =
  | UploadWebFile.uploadWebFile
;

export namespace UploadWebFile {
  export type uploadWebFile = {
    _: 'upload.webFile',
    size: number,
    mime_type: string,
    file_type: StorageFileType,
    mtime: number,
    bytes: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/payments.PaymentForm
 */
export type PaymentsPaymentForm =
  | PaymentsPaymentForm.paymentsPaymentForm
;

export namespace PaymentsPaymentForm {
  export type paymentsPaymentForm = {
    _: 'payments.paymentForm',
    can_save_credentials?: boolean,
    password_missing?: boolean,
    bot_id: number,
    invoice: Invoice,
    provider_id: number,
    url: string,
    native_provider?: string,
    native_params?: DataJSON,
    saved_info?: PaymentRequestedInfo,
    saved_credentials?: PaymentSavedCredentials,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/payments.ValidatedRequestedInfo
 */
export type PaymentsValidatedRequestedInfo =
  | PaymentsValidatedRequestedInfo.paymentsValidatedRequestedInfo
;

export namespace PaymentsValidatedRequestedInfo {
  export type paymentsValidatedRequestedInfo = {
    _: 'payments.validatedRequestedInfo',
    id?: string,
    shipping_options?: ShippingOption[],
  };
}

/**
 * Ref: https://core.telegram.org/type/payments.PaymentResult
 */
export type PaymentsPaymentResult =
  | PaymentsPaymentResult.paymentsPaymentResult
  | PaymentsPaymentResult.paymentsPaymentVerificationNeeded
;

export namespace PaymentsPaymentResult {
  export type paymentsPaymentResult = {
    _: 'payments.paymentResult',
    updates: Updates,
  };
  export type paymentsPaymentVerificationNeeded = {
    _: 'payments.paymentVerificationNeeded',
    url: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/payments.PaymentReceipt
 */
export type PaymentsPaymentReceipt =
  | PaymentsPaymentReceipt.paymentsPaymentReceipt
;

export namespace PaymentsPaymentReceipt {
  export type paymentsPaymentReceipt = {
    _: 'payments.paymentReceipt',
    date: number,
    bot_id: number,
    invoice: Invoice,
    provider_id: number,
    info?: PaymentRequestedInfo,
    shipping?: ShippingOption,
    currency: string,
    total_amount: string,
    credentials_title: string,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/payments.SavedInfo
 */
export type PaymentsSavedInfo =
  | PaymentsSavedInfo.paymentsSavedInfo
;

export namespace PaymentsSavedInfo {
  export type paymentsSavedInfo = {
    _: 'payments.savedInfo',
    has_saved_credentials?: boolean,
    saved_info?: PaymentRequestedInfo,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPaymentCredentials
 */
export type InputPaymentCredentials =
  | InputPaymentCredentials.inputPaymentCredentialsSaved
  | InputPaymentCredentials.inputPaymentCredentials
  | InputPaymentCredentials.inputPaymentCredentialsApplePay
  | InputPaymentCredentials.inputPaymentCredentialsAndroidPay
;

export namespace InputPaymentCredentials {
  export type inputPaymentCredentialsSaved = {
    _: 'inputPaymentCredentialsSaved',
    id: string,
    tmp_password: string,
  };
  export type inputPaymentCredentials = {
    _: 'inputPaymentCredentials',
    save?: boolean,
    data: DataJSON,
  };
  export type inputPaymentCredentialsApplePay = {
    _: 'inputPaymentCredentialsApplePay',
    payment_data: DataJSON,
  };
  export type inputPaymentCredentialsAndroidPay = {
    _: 'inputPaymentCredentialsAndroidPay',
    payment_token: DataJSON,
    google_transaction_id: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.TmpPassword
 */
export type AccountTmpPassword =
  | AccountTmpPassword.accountTmpPassword
;

export namespace AccountTmpPassword {
  export type accountTmpPassword = {
    _: 'account.tmpPassword',
    tmp_password: string,
    valid_until: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ShippingOption
 */
export type ShippingOption =
  | ShippingOption.shippingOption
;

export namespace ShippingOption {
  export type shippingOption = {
    _: 'shippingOption',
    id: string,
    title: string,
    prices: LabeledPrice[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputStickerSetItem
 */
export type InputStickerSetItem =
  | InputStickerSetItem.inputStickerSetItem
;

export namespace InputStickerSetItem {
  export type inputStickerSetItem = {
    _: 'inputStickerSetItem',
    document: InputDocument,
    emoji: string,
    mask_coords?: MaskCoords,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputPhoneCall
 */
export type InputPhoneCall =
  | InputPhoneCall.inputPhoneCall
;

export namespace InputPhoneCall {
  export type inputPhoneCall = {
    _: 'inputPhoneCall',
    id: string,
    access_hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PhoneCall
 */
export type PhoneCall =
  | PhoneCall.phoneCallEmpty
  | PhoneCall.phoneCallWaiting
  | PhoneCall.phoneCallRequested
  | PhoneCall.phoneCallAccepted
  | PhoneCall.phoneCall
  | PhoneCall.phoneCallDiscarded
;

export namespace PhoneCall {
  export type phoneCallEmpty = {
    _: 'phoneCallEmpty',
    id: string,
  };
  export type phoneCallWaiting = {
    _: 'phoneCallWaiting',
    video?: boolean,
    id: string,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    protocol: PhoneCallProtocol,
    receive_date?: number,
  };
  export type phoneCallRequested = {
    _: 'phoneCallRequested',
    video?: boolean,
    id: string,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    g_a_hash: string,
    protocol: PhoneCallProtocol,
  };
  export type phoneCallAccepted = {
    _: 'phoneCallAccepted',
    video?: boolean,
    id: string,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    g_b: string,
    protocol: PhoneCallProtocol,
  };
  export type phoneCall = {
    _: 'phoneCall',
    p2p_allowed?: boolean,
    id: string,
    access_hash: string,
    date: number,
    admin_id: number,
    participant_id: number,
    g_a_or_b: string,
    key_fingerprint: string,
    protocol: PhoneCallProtocol,
    connections: PhoneConnection[],
    start_date: number,
  };
  export type phoneCallDiscarded = {
    _: 'phoneCallDiscarded',
    need_rating?: boolean,
    need_debug?: boolean,
    video?: boolean,
    id: string,
    reason?: PhoneCallDiscardReason,
    duration?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/PhoneConnection
 */
export type PhoneConnection =
  | PhoneConnection.phoneConnection
;

export namespace PhoneConnection {
  export type phoneConnection = {
    _: 'phoneConnection',
    id: string,
    ip: string,
    ipv6: string,
    port: number,
    peer_tag: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PhoneCallProtocol
 */
export type PhoneCallProtocol =
  | PhoneCallProtocol.phoneCallProtocol
;

export namespace PhoneCallProtocol {
  export type phoneCallProtocol = {
    _: 'phoneCallProtocol',
    udp_p2p?: boolean,
    udp_reflector?: boolean,
    min_layer: number,
    max_layer: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/phone.PhoneCall
 */
export type PhonePhoneCall =
  | PhonePhoneCall.phonePhoneCall
;

export namespace PhonePhoneCall {
  export type phonePhoneCall = {
    _: 'phone.phoneCall',
    phone_call: PhoneCall,
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/upload.CdnFile
 */
export type UploadCdnFile =
  | UploadCdnFile.uploadCdnFileReuploadNeeded
  | UploadCdnFile.uploadCdnFile
;

export namespace UploadCdnFile {
  export type uploadCdnFileReuploadNeeded = {
    _: 'upload.cdnFileReuploadNeeded',
    request_token: string,
  };
  export type uploadCdnFile = {
    _: 'upload.cdnFile',
    bytes: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/CdnPublicKey
 */
export type CdnPublicKey =
  | CdnPublicKey.cdnPublicKey
;

export namespace CdnPublicKey {
  export type cdnPublicKey = {
    _: 'cdnPublicKey',
    dc_id: number,
    public_key: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/CdnConfig
 */
export type CdnConfig =
  | CdnConfig.cdnConfig
;

export namespace CdnConfig {
  export type cdnConfig = {
    _: 'cdnConfig',
    public_keys: CdnPublicKey[],
  };
}

/**
 * Ref: https://core.telegram.org/type/LangPackString
 */
export type LangPackString =
  | LangPackString.langPackString
  | LangPackString.langPackStringPluralized
  | LangPackString.langPackStringDeleted
;

export namespace LangPackString {
  export type langPackString = {
    _: 'langPackString',
    key: string,
    value: string,
  };
  export type langPackStringPluralized = {
    _: 'langPackStringPluralized',
    key: string,
    zero_value?: string,
    one_value?: string,
    two_value?: string,
    few_value?: string,
    many_value?: string,
    other_value: string,
  };
  export type langPackStringDeleted = {
    _: 'langPackStringDeleted',
    key: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/LangPackDifference
 */
export type LangPackDifference =
  | LangPackDifference.langPackDifference
;

export namespace LangPackDifference {
  export type langPackDifference = {
    _: 'langPackDifference',
    lang_code: string,
    from_version: number,
    version: number,
    strings: LangPackString[],
  };
}

/**
 * Ref: https://core.telegram.org/type/LangPackLanguage
 */
export type LangPackLanguage =
  | LangPackLanguage.langPackLanguage
;

export namespace LangPackLanguage {
  export type langPackLanguage = {
    _: 'langPackLanguage',
    official?: boolean,
    rtl?: boolean,
    beta?: boolean,
    name: string,
    native_name: string,
    lang_code: string,
    base_lang_code?: string,
    plural_code: string,
    strings_count: number,
    translated_count: number,
    translations_url: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelAdminLogEventAction
 */
export type ChannelAdminLogEventAction =
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeTitle
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeAbout
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeUsername
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangePhoto
  | ChannelAdminLogEventAction.channelAdminLogEventActionToggleInvites
  | ChannelAdminLogEventAction.channelAdminLogEventActionToggleSignatures
  | ChannelAdminLogEventAction.channelAdminLogEventActionUpdatePinned
  | ChannelAdminLogEventAction.channelAdminLogEventActionEditMessage
  | ChannelAdminLogEventAction.channelAdminLogEventActionDeleteMessage
  | ChannelAdminLogEventAction.channelAdminLogEventActionParticipantJoin
  | ChannelAdminLogEventAction.channelAdminLogEventActionParticipantLeave
  | ChannelAdminLogEventAction.channelAdminLogEventActionParticipantInvite
  | ChannelAdminLogEventAction.channelAdminLogEventActionParticipantToggleBan
  | ChannelAdminLogEventAction.channelAdminLogEventActionParticipantToggleAdmin
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeStickerSet
  | ChannelAdminLogEventAction.channelAdminLogEventActionTogglePreHistoryHidden
  | ChannelAdminLogEventAction.channelAdminLogEventActionDefaultBannedRights
  | ChannelAdminLogEventAction.channelAdminLogEventActionStopPoll
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeLinkedChat
  | ChannelAdminLogEventAction.channelAdminLogEventActionChangeLocation
  | ChannelAdminLogEventAction.channelAdminLogEventActionToggleSlowMode
;

export namespace ChannelAdminLogEventAction {
  export type channelAdminLogEventActionChangeTitle = {
    _: 'channelAdminLogEventActionChangeTitle',
    prev_value: string,
    new_value: string,
  };
  export type channelAdminLogEventActionChangeAbout = {
    _: 'channelAdminLogEventActionChangeAbout',
    prev_value: string,
    new_value: string,
  };
  export type channelAdminLogEventActionChangeUsername = {
    _: 'channelAdminLogEventActionChangeUsername',
    prev_value: string,
    new_value: string,
  };
  export type channelAdminLogEventActionChangePhoto = {
    _: 'channelAdminLogEventActionChangePhoto',
    prev_photo: Photo,
    new_photo: Photo,
  };
  export type channelAdminLogEventActionToggleInvites = {
    _: 'channelAdminLogEventActionToggleInvites',
    new_value: boolean,
  };
  export type channelAdminLogEventActionToggleSignatures = {
    _: 'channelAdminLogEventActionToggleSignatures',
    new_value: boolean,
  };
  export type channelAdminLogEventActionUpdatePinned = {
    _: 'channelAdminLogEventActionUpdatePinned',
    message: Message,
  };
  export type channelAdminLogEventActionEditMessage = {
    _: 'channelAdminLogEventActionEditMessage',
    prev_message: Message,
    new_message: Message,
  };
  export type channelAdminLogEventActionDeleteMessage = {
    _: 'channelAdminLogEventActionDeleteMessage',
    message: Message,
  };
  export type channelAdminLogEventActionParticipantJoin = {
    _: 'channelAdminLogEventActionParticipantJoin',
  };
  export type channelAdminLogEventActionParticipantLeave = {
    _: 'channelAdminLogEventActionParticipantLeave',
  };
  export type channelAdminLogEventActionParticipantInvite = {
    _: 'channelAdminLogEventActionParticipantInvite',
    participant: ChannelParticipant,
  };
  export type channelAdminLogEventActionParticipantToggleBan = {
    _: 'channelAdminLogEventActionParticipantToggleBan',
    prev_participant: ChannelParticipant,
    new_participant: ChannelParticipant,
  };
  export type channelAdminLogEventActionParticipantToggleAdmin = {
    _: 'channelAdminLogEventActionParticipantToggleAdmin',
    prev_participant: ChannelParticipant,
    new_participant: ChannelParticipant,
  };
  export type channelAdminLogEventActionChangeStickerSet = {
    _: 'channelAdminLogEventActionChangeStickerSet',
    prev_stickerset: InputStickerSet,
    new_stickerset: InputStickerSet,
  };
  export type channelAdminLogEventActionTogglePreHistoryHidden = {
    _: 'channelAdminLogEventActionTogglePreHistoryHidden',
    new_value: boolean,
  };
  export type channelAdminLogEventActionDefaultBannedRights = {
    _: 'channelAdminLogEventActionDefaultBannedRights',
    prev_banned_rights: ChatBannedRights,
    new_banned_rights: ChatBannedRights,
  };
  export type channelAdminLogEventActionStopPoll = {
    _: 'channelAdminLogEventActionStopPoll',
    message: Message,
  };
  export type channelAdminLogEventActionChangeLinkedChat = {
    _: 'channelAdminLogEventActionChangeLinkedChat',
    prev_value: number,
    new_value: number,
  };
  export type channelAdminLogEventActionChangeLocation = {
    _: 'channelAdminLogEventActionChangeLocation',
    prev_value: ChannelLocation,
    new_value: ChannelLocation,
  };
  export type channelAdminLogEventActionToggleSlowMode = {
    _: 'channelAdminLogEventActionToggleSlowMode',
    prev_value: number,
    new_value: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelAdminLogEvent
 */
export type ChannelAdminLogEvent =
  | ChannelAdminLogEvent.channelAdminLogEvent
;

export namespace ChannelAdminLogEvent {
  export type channelAdminLogEvent = {
    _: 'channelAdminLogEvent',
    id: string,
    date: number,
    user_id: number,
    action: ChannelAdminLogEventAction,
  };
}

/**
 * Ref: https://core.telegram.org/type/channels.AdminLogResults
 */
export type ChannelsAdminLogResults =
  | ChannelsAdminLogResults.channelsAdminLogResults
;

export namespace ChannelsAdminLogResults {
  export type channelsAdminLogResults = {
    _: 'channels.adminLogResults',
    events: ChannelAdminLogEvent[],
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelAdminLogEventsFilter
 */
export type ChannelAdminLogEventsFilter =
  | ChannelAdminLogEventsFilter.channelAdminLogEventsFilter
;

export namespace ChannelAdminLogEventsFilter {
  export type channelAdminLogEventsFilter = {
    _: 'channelAdminLogEventsFilter',
    join?: boolean,
    leave?: boolean,
    invite?: boolean,
    ban?: boolean,
    unban?: boolean,
    kick?: boolean,
    unkick?: boolean,
    promote?: boolean,
    demote?: boolean,
    info?: boolean,
    settings?: boolean,
    pinned?: boolean,
    edit?: boolean,
    delete?: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/PopularContact
 */
export type PopularContact =
  | PopularContact.popularContact
;

export namespace PopularContact {
  export type popularContact = {
    _: 'popularContact',
    client_id: string,
    importers: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.FavedStickers
 */
export type MessagesFavedStickers =
  | MessagesFavedStickers.messagesFavedStickersNotModified
  | MessagesFavedStickers.messagesFavedStickers
;

export namespace MessagesFavedStickers {
  export type messagesFavedStickersNotModified = {
    _: 'messages.favedStickersNotModified',
  };
  export type messagesFavedStickers = {
    _: 'messages.favedStickers',
    hash: number,
    packs: StickerPack[],
    stickers: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/RecentMeUrl
 */
export type RecentMeUrl =
  | RecentMeUrl.recentMeUrlUnknown
  | RecentMeUrl.recentMeUrlUser
  | RecentMeUrl.recentMeUrlChat
  | RecentMeUrl.recentMeUrlChatInvite
  | RecentMeUrl.recentMeUrlStickerSet
;

export namespace RecentMeUrl {
  export type recentMeUrlUnknown = {
    _: 'recentMeUrlUnknown',
    url: string,
  };
  export type recentMeUrlUser = {
    _: 'recentMeUrlUser',
    url: string,
    user_id: number,
  };
  export type recentMeUrlChat = {
    _: 'recentMeUrlChat',
    url: string,
    chat_id: number,
  };
  export type recentMeUrlChatInvite = {
    _: 'recentMeUrlChatInvite',
    url: string,
    chat_invite: ChatInvite,
  };
  export type recentMeUrlStickerSet = {
    _: 'recentMeUrlStickerSet',
    url: string,
    set: StickerSetCovered,
  };
}

/**
 * Ref: https://core.telegram.org/type/help.RecentMeUrls
 */
export type HelpRecentMeUrls =
  | HelpRecentMeUrls.helpRecentMeUrls
;

export namespace HelpRecentMeUrls {
  export type helpRecentMeUrls = {
    _: 'help.recentMeUrls',
    urls: RecentMeUrl[],
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputSingleMedia
 */
export type InputSingleMedia =
  | InputSingleMedia.inputSingleMedia
;

export namespace InputSingleMedia {
  export type inputSingleMedia = {
    _: 'inputSingleMedia',
    media: InputMedia,
    random_id: string,
    message: string,
    entities?: MessageEntity[],
  };
}

/**
 * Ref: https://core.telegram.org/type/WebAuthorization
 */
export type WebAuthorization =
  | WebAuthorization.webAuthorization
;

export namespace WebAuthorization {
  export type webAuthorization = {
    _: 'webAuthorization',
    hash: string,
    bot_id: number,
    domain: string,
    browser: string,
    platform: string,
    date_created: number,
    date_active: number,
    ip: string,
    region: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.WebAuthorizations
 */
export type AccountWebAuthorizations =
  | AccountWebAuthorizations.accountWebAuthorizations
;

export namespace AccountWebAuthorizations {
  export type accountWebAuthorizations = {
    _: 'account.webAuthorizations',
    authorizations: WebAuthorization[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/InputMessage
 */
export type InputMessage =
  | InputMessage.inputMessageID
  | InputMessage.inputMessageReplyTo
  | InputMessage.inputMessagePinned
;

export namespace InputMessage {
  export type inputMessageID = {
    _: 'inputMessageID',
    id: number,
  };
  export type inputMessageReplyTo = {
    _: 'inputMessageReplyTo',
    id: number,
  };
  export type inputMessagePinned = {
    _: 'inputMessagePinned',
  };
}

/**
 * Ref: https://core.telegram.org/type/InputDialogPeer
 */
export type InputDialogPeer =
  | InputDialogPeer.inputDialogPeer
  | InputDialogPeer.inputDialogPeerFolder
;

export namespace InputDialogPeer {
  export type inputDialogPeer = {
    _: 'inputDialogPeer',
    peer: InputPeer,
  };
  export type inputDialogPeerFolder = {
    _: 'inputDialogPeerFolder',
    folder_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/DialogPeer
 */
export type DialogPeer =
  | DialogPeer.dialogPeer
  | DialogPeer.dialogPeerFolder
;

export namespace DialogPeer {
  export type dialogPeer = {
    _: 'dialogPeer',
    peer: Peer,
  };
  export type dialogPeerFolder = {
    _: 'dialogPeerFolder',
    folder_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.FoundStickerSets
 */
export type MessagesFoundStickerSets =
  | MessagesFoundStickerSets.messagesFoundStickerSetsNotModified
  | MessagesFoundStickerSets.messagesFoundStickerSets
;

export namespace MessagesFoundStickerSets {
  export type messagesFoundStickerSetsNotModified = {
    _: 'messages.foundStickerSetsNotModified',
  };
  export type messagesFoundStickerSets = {
    _: 'messages.foundStickerSets',
    hash: number,
    sets: StickerSetCovered[],
  };
}

/**
 * Ref: https://core.telegram.org/type/FileHash
 */
export type FileHash =
  | FileHash.fileHash
;

export namespace FileHash {
  export type fileHash = {
    _: 'fileHash',
    offset: number,
    limit: number,
    hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputClientProxy
 */
export type InputClientProxy =
  | InputClientProxy.inputClientProxy
;

export namespace InputClientProxy {
  export type inputClientProxy = {
    _: 'inputClientProxy',
    address: string,
    port: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/help.ProxyData
 */
export type HelpProxyData =
  | HelpProxyData.helpProxyDataEmpty
  | HelpProxyData.helpProxyDataPromo
;

export namespace HelpProxyData {
  export type helpProxyDataEmpty = {
    _: 'help.proxyDataEmpty',
    expires: number,
  };
  export type helpProxyDataPromo = {
    _: 'help.proxyDataPromo',
    expires: number,
    peer: Peer,
    chats: Chat[],
    users: User[],
  };
}

/**
 * Ref: https://core.telegram.org/type/help.TermsOfServiceUpdate
 */
export type HelpTermsOfServiceUpdate =
  | HelpTermsOfServiceUpdate.helpTermsOfServiceUpdateEmpty
  | HelpTermsOfServiceUpdate.helpTermsOfServiceUpdate
;

export namespace HelpTermsOfServiceUpdate {
  export type helpTermsOfServiceUpdateEmpty = {
    _: 'help.termsOfServiceUpdateEmpty',
    expires: number,
  };
  export type helpTermsOfServiceUpdate = {
    _: 'help.termsOfServiceUpdate',
    expires: number,
    terms_of_service: HelpTermsOfService,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputSecureFile
 */
export type InputSecureFile =
  | InputSecureFile.inputSecureFileUploaded
  | InputSecureFile.inputSecureFile
;

export namespace InputSecureFile {
  export type inputSecureFileUploaded = {
    _: 'inputSecureFileUploaded',
    id: string,
    parts: number,
    md5_checksum: string,
    file_hash: string,
    secret: string,
  };
  export type inputSecureFile = {
    _: 'inputSecureFile',
    id: string,
    access_hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureFile
 */
export type SecureFile =
  | SecureFile.secureFileEmpty
  | SecureFile.secureFile
;

export namespace SecureFile {
  export type secureFileEmpty = {
    _: 'secureFileEmpty',
  };
  export type secureFile = {
    _: 'secureFile',
    id: string,
    access_hash: string,
    size: number,
    dc_id: number,
    date: number,
    file_hash: string,
    secret: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureData
 */
export type SecureData =
  | SecureData.secureData
;

export namespace SecureData {
  export type secureData = {
    _: 'secureData',
    data: string,
    data_hash: string,
    secret: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecurePlainData
 */
export type SecurePlainData =
  | SecurePlainData.securePlainPhone
  | SecurePlainData.securePlainEmail
;

export namespace SecurePlainData {
  export type securePlainPhone = {
    _: 'securePlainPhone',
    phone: string,
  };
  export type securePlainEmail = {
    _: 'securePlainEmail',
    email: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureValueType
 */
export type SecureValueType =
  | SecureValueType.secureValueTypePersonalDetails
  | SecureValueType.secureValueTypePassport
  | SecureValueType.secureValueTypeDriverLicense
  | SecureValueType.secureValueTypeIdentityCard
  | SecureValueType.secureValueTypeInternalPassport
  | SecureValueType.secureValueTypeAddress
  | SecureValueType.secureValueTypeUtilityBill
  | SecureValueType.secureValueTypeBankStatement
  | SecureValueType.secureValueTypeRentalAgreement
  | SecureValueType.secureValueTypePassportRegistration
  | SecureValueType.secureValueTypeTemporaryRegistration
  | SecureValueType.secureValueTypePhone
  | SecureValueType.secureValueTypeEmail
;

export namespace SecureValueType {
  export type secureValueTypePersonalDetails = {
    _: 'secureValueTypePersonalDetails',
  };
  export type secureValueTypePassport = {
    _: 'secureValueTypePassport',
  };
  export type secureValueTypeDriverLicense = {
    _: 'secureValueTypeDriverLicense',
  };
  export type secureValueTypeIdentityCard = {
    _: 'secureValueTypeIdentityCard',
  };
  export type secureValueTypeInternalPassport = {
    _: 'secureValueTypeInternalPassport',
  };
  export type secureValueTypeAddress = {
    _: 'secureValueTypeAddress',
  };
  export type secureValueTypeUtilityBill = {
    _: 'secureValueTypeUtilityBill',
  };
  export type secureValueTypeBankStatement = {
    _: 'secureValueTypeBankStatement',
  };
  export type secureValueTypeRentalAgreement = {
    _: 'secureValueTypeRentalAgreement',
  };
  export type secureValueTypePassportRegistration = {
    _: 'secureValueTypePassportRegistration',
  };
  export type secureValueTypeTemporaryRegistration = {
    _: 'secureValueTypeTemporaryRegistration',
  };
  export type secureValueTypePhone = {
    _: 'secureValueTypePhone',
  };
  export type secureValueTypeEmail = {
    _: 'secureValueTypeEmail',
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureValue
 */
export type SecureValue =
  | SecureValue.secureValue
;

export namespace SecureValue {
  export type secureValue = {
    _: 'secureValue',
    type: SecureValueType,
    data?: SecureData,
    front_side?: SecureFile,
    reverse_side?: SecureFile,
    selfie?: SecureFile,
    translation?: SecureFile[],
    files?: SecureFile[],
    plain_data?: SecurePlainData,
    hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputSecureValue
 */
export type InputSecureValue =
  | InputSecureValue.inputSecureValue
;

export namespace InputSecureValue {
  export type inputSecureValue = {
    _: 'inputSecureValue',
    type: SecureValueType,
    data?: SecureData,
    front_side?: InputSecureFile,
    reverse_side?: InputSecureFile,
    selfie?: InputSecureFile,
    translation?: InputSecureFile[],
    files?: InputSecureFile[],
    plain_data?: SecurePlainData,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureValueHash
 */
export type SecureValueHash =
  | SecureValueHash.secureValueHash
;

export namespace SecureValueHash {
  export type secureValueHash = {
    _: 'secureValueHash',
    type: SecureValueType,
    hash: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureValueError
 */
export type SecureValueError =
  | SecureValueError.secureValueErrorData
  | SecureValueError.secureValueErrorFrontSide
  | SecureValueError.secureValueErrorReverseSide
  | SecureValueError.secureValueErrorSelfie
  | SecureValueError.secureValueErrorFile
  | SecureValueError.secureValueErrorFiles
  | SecureValueError.secureValueError
  | SecureValueError.secureValueErrorTranslationFile
  | SecureValueError.secureValueErrorTranslationFiles
;

export namespace SecureValueError {
  export type secureValueErrorData = {
    _: 'secureValueErrorData',
    type: SecureValueType,
    data_hash: string,
    field: string,
    text: string,
  };
  export type secureValueErrorFrontSide = {
    _: 'secureValueErrorFrontSide',
    type: SecureValueType,
    file_hash: string,
    text: string,
  };
  export type secureValueErrorReverseSide = {
    _: 'secureValueErrorReverseSide',
    type: SecureValueType,
    file_hash: string,
    text: string,
  };
  export type secureValueErrorSelfie = {
    _: 'secureValueErrorSelfie',
    type: SecureValueType,
    file_hash: string,
    text: string,
  };
  export type secureValueErrorFile = {
    _: 'secureValueErrorFile',
    type: SecureValueType,
    file_hash: string,
    text: string,
  };
  export type secureValueErrorFiles = {
    _: 'secureValueErrorFiles',
    type: SecureValueType,
    file_hash: string[],
    text: string,
  };
  export type secureValueError = {
    _: 'secureValueError',
    type: SecureValueType,
    hash: string,
    text: string,
  };
  export type secureValueErrorTranslationFile = {
    _: 'secureValueErrorTranslationFile',
    type: SecureValueType,
    file_hash: string,
    text: string,
  };
  export type secureValueErrorTranslationFiles = {
    _: 'secureValueErrorTranslationFiles',
    type: SecureValueType,
    file_hash: string[],
    text: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureCredentialsEncrypted
 */
export type SecureCredentialsEncrypted =
  | SecureCredentialsEncrypted.secureCredentialsEncrypted
;

export namespace SecureCredentialsEncrypted {
  export type secureCredentialsEncrypted = {
    _: 'secureCredentialsEncrypted',
    data: string,
    hash: string,
    secret: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.AuthorizationForm
 */
export type AccountAuthorizationForm =
  | AccountAuthorizationForm.accountAuthorizationForm
;

export namespace AccountAuthorizationForm {
  export type accountAuthorizationForm = {
    _: 'account.authorizationForm',
    required_types: SecureRequiredType[],
    values: SecureValue[],
    errors: SecureValueError[],
    users: User[],
    privacy_policy_url?: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.SentEmailCode
 */
export type AccountSentEmailCode =
  | AccountSentEmailCode.accountSentEmailCode
;

export namespace AccountSentEmailCode {
  export type accountSentEmailCode = {
    _: 'account.sentEmailCode',
    email_pattern: string,
    length: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/help.DeepLinkInfo
 */
export type HelpDeepLinkInfo =
  | HelpDeepLinkInfo.helpDeepLinkInfoEmpty
  | HelpDeepLinkInfo.helpDeepLinkInfo
;

export namespace HelpDeepLinkInfo {
  export type helpDeepLinkInfoEmpty = {
    _: 'help.deepLinkInfoEmpty',
  };
  export type helpDeepLinkInfo = {
    _: 'help.deepLinkInfo',
    update_app?: boolean,
    message: string,
    entities?: MessageEntity[],
  };
}

/**
 * Ref: https://core.telegram.org/type/SavedContact
 */
export type SavedContact =
  | SavedContact.savedPhoneContact
;

export namespace SavedContact {
  export type savedPhoneContact = {
    _: 'savedPhoneContact',
    phone: string,
    first_name: string,
    last_name: string,
    date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.Takeout
 */
export type AccountTakeout =
  | AccountTakeout.accountTakeout
;

export namespace AccountTakeout {
  export type accountTakeout = {
    _: 'account.takeout',
    id: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PasswordKdfAlgo
 */
export type PasswordKdfAlgo =
  | PasswordKdfAlgo.passwordKdfAlgoUnknown
  | PasswordKdfAlgo.passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow
;

export namespace PasswordKdfAlgo {
  export type passwordKdfAlgoUnknown = {
    _: 'passwordKdfAlgoUnknown',
  };
  export type passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow = {
    _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow',
    salt1: string,
    salt2: string,
    g: number,
    p: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecurePasswordKdfAlgo
 */
export type SecurePasswordKdfAlgo =
  | SecurePasswordKdfAlgo.securePasswordKdfAlgoUnknown
  | SecurePasswordKdfAlgo.securePasswordKdfAlgoPBKDF2HMACSHA512iter100000
  | SecurePasswordKdfAlgo.securePasswordKdfAlgoSHA512
;

export namespace SecurePasswordKdfAlgo {
  export type securePasswordKdfAlgoUnknown = {
    _: 'securePasswordKdfAlgoUnknown',
  };
  export type securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 = {
    _: 'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000',
    salt: string,
  };
  export type securePasswordKdfAlgoSHA512 = {
    _: 'securePasswordKdfAlgoSHA512',
    salt: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureSecretSettings
 */
export type SecureSecretSettings =
  | SecureSecretSettings.secureSecretSettings
;

export namespace SecureSecretSettings {
  export type secureSecretSettings = {
    _: 'secureSecretSettings',
    secure_algo: SecurePasswordKdfAlgo,
    secure_secret: string,
    secure_secret_id: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputCheckPasswordSRP
 */
export type InputCheckPasswordSRP =
  | InputCheckPasswordSRP.inputCheckPasswordEmpty
  | InputCheckPasswordSRP.inputCheckPasswordSRP
;

export namespace InputCheckPasswordSRP {
  export type inputCheckPasswordEmpty = {
    _: 'inputCheckPasswordEmpty',
  };
  export type inputCheckPasswordSRP = {
    _: 'inputCheckPasswordSRP',
    srp_id: string,
    A: string,
    M1: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/SecureRequiredType
 */
export type SecureRequiredType =
  | SecureRequiredType.secureRequiredType
  | SecureRequiredType.secureRequiredTypeOneOf
;

export namespace SecureRequiredType {
  export type secureRequiredType = {
    _: 'secureRequiredType',
    native_names?: boolean,
    selfie_required?: boolean,
    translation_required?: boolean,
    type: SecureValueType,
  };
  export type secureRequiredTypeOneOf = {
    _: 'secureRequiredTypeOneOf',
    types: SecureRequiredType[],
  };
}

/**
 * Ref: https://core.telegram.org/type/help.PassportConfig
 */
export type HelpPassportConfig =
  | HelpPassportConfig.helpPassportConfigNotModified
  | HelpPassportConfig.helpPassportConfig
;

export namespace HelpPassportConfig {
  export type helpPassportConfigNotModified = {
    _: 'help.passportConfigNotModified',
  };
  export type helpPassportConfig = {
    _: 'help.passportConfig',
    hash: number,
    countries_langs: DataJSON,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputAppEvent
 */
export type InputAppEvent =
  | InputAppEvent.inputAppEvent
;

export namespace InputAppEvent {
  export type inputAppEvent = {
    _: 'inputAppEvent',
    time: number,
    type: string,
    peer: string,
    data: JSONValue,
  };
}

/**
 * Ref: https://core.telegram.org/type/JSONObjectValue
 */
export type JSONObjectValue =
  | JSONObjectValue.jsonObjectValue
;

export namespace JSONObjectValue {
  export type jsonObjectValue = {
    _: 'jsonObjectValue',
    key: string,
    value: JSONValue,
  };
}

/**
 * Ref: https://core.telegram.org/type/JSONValue
 */
export type JSONValue =
  | JSONValue.jsonNull
  | JSONValue.jsonBool
  | JSONValue.jsonNumber
  | JSONValue.jsonString
  | JSONValue.jsonArray
  | JSONValue.jsonObject
;

export namespace JSONValue {
  export type jsonNull = {
    _: 'jsonNull',
  };
  export type jsonBool = {
    _: 'jsonBool',
    value: boolean,
  };
  export type jsonNumber = {
    _: 'jsonNumber',
    value: number,
  };
  export type jsonString = {
    _: 'jsonString',
    value: string,
  };
  export type jsonArray = {
    _: 'jsonArray',
    value: JSONValue[],
  };
  export type jsonObject = {
    _: 'jsonObject',
    value: JSONObjectValue[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PageTableCell
 */
export type PageTableCell =
  | PageTableCell.pageTableCell
;

export namespace PageTableCell {
  export type pageTableCell = {
    _: 'pageTableCell',
    header?: boolean,
    align_center?: boolean,
    align_right?: boolean,
    valign_middle?: boolean,
    valign_bottom?: boolean,
    text?: RichText,
    colspan?: number,
    rowspan?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/PageTableRow
 */
export type PageTableRow =
  | PageTableRow.pageTableRow
;

export namespace PageTableRow {
  export type pageTableRow = {
    _: 'pageTableRow',
    cells: PageTableCell[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PageCaption
 */
export type PageCaption =
  | PageCaption.pageCaption
;

export namespace PageCaption {
  export type pageCaption = {
    _: 'pageCaption',
    text: RichText,
    credit: RichText,
  };
}

/**
 * Ref: https://core.telegram.org/type/PageListItem
 */
export type PageListItem =
  | PageListItem.pageListItemText
  | PageListItem.pageListItemBlocks
;

export namespace PageListItem {
  export type pageListItemText = {
    _: 'pageListItemText',
    text: RichText,
  };
  export type pageListItemBlocks = {
    _: 'pageListItemBlocks',
    blocks: PageBlock[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PageListOrderedItem
 */
export type PageListOrderedItem =
  | PageListOrderedItem.pageListOrderedItemText
  | PageListOrderedItem.pageListOrderedItemBlocks
;

export namespace PageListOrderedItem {
  export type pageListOrderedItemText = {
    _: 'pageListOrderedItemText',
    num: string,
    text: RichText,
  };
  export type pageListOrderedItemBlocks = {
    _: 'pageListOrderedItemBlocks',
    num: string,
    blocks: PageBlock[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PageRelatedArticle
 */
export type PageRelatedArticle =
  | PageRelatedArticle.pageRelatedArticle
;

export namespace PageRelatedArticle {
  export type pageRelatedArticle = {
    _: 'pageRelatedArticle',
    url: string,
    webpage_id: string,
    title?: string,
    description?: string,
    photo_id?: string,
    author?: string,
    published_date?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Page
 */
export type Page =
  | Page.page
;

export namespace Page {
  export type page = {
    _: 'page',
    part?: boolean,
    rtl?: boolean,
    v2?: boolean,
    url: string,
    blocks: PageBlock[],
    photos: Photo[],
    documents: Document[],
  };
}

/**
 * Ref: https://core.telegram.org/type/help.SupportName
 */
export type HelpSupportName =
  | HelpSupportName.helpSupportName
;

export namespace HelpSupportName {
  export type helpSupportName = {
    _: 'help.supportName',
    name: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/help.UserInfo
 */
export type HelpUserInfo =
  | HelpUserInfo.helpUserInfoEmpty
  | HelpUserInfo.helpUserInfo
;

export namespace HelpUserInfo {
  export type helpUserInfoEmpty = {
    _: 'help.userInfoEmpty',
  };
  export type helpUserInfo = {
    _: 'help.userInfo',
    message: string,
    entities: MessageEntity[],
    author: string,
    date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/PollAnswer
 */
export type PollAnswer =
  | PollAnswer.pollAnswer
;

export namespace PollAnswer {
  export type pollAnswer = {
    _: 'pollAnswer',
    text: string,
    option: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/Poll
 */
export type Poll =
  | Poll.poll
;

export namespace Poll {
  export type poll = {
    _: 'poll',
    id: string,
    closed?: boolean,
    question: string,
    answers: PollAnswer[],
  };
}

/**
 * Ref: https://core.telegram.org/type/PollAnswerVoters
 */
export type PollAnswerVoters =
  | PollAnswerVoters.pollAnswerVoters
;

export namespace PollAnswerVoters {
  export type pollAnswerVoters = {
    _: 'pollAnswerVoters',
    chosen?: boolean,
    option: string,
    voters: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/PollResults
 */
export type PollResults =
  | PollResults.pollResults
;

export namespace PollResults {
  export type pollResults = WithMin<{
    _: 'pollResults',
    min?: boolean,
    results?: PollAnswerVoters[],
    total_voters?: number,
  }>;
}

/**
 * Ref: https://core.telegram.org/type/ChatOnlines
 */
export type ChatOnlines =
  | ChatOnlines.chatOnlines
;

export namespace ChatOnlines {
  export type chatOnlines = {
    _: 'chatOnlines',
    onlines: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/StatsURL
 */
export type StatsURL =
  | StatsURL.statsURL
;

export namespace StatsURL {
  export type statsURL = {
    _: 'statsURL',
    url: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatAdminRights
 */
export type ChatAdminRights =
  | ChatAdminRights.chatAdminRights
;

export namespace ChatAdminRights {
  export type chatAdminRights = {
    _: 'chatAdminRights',
    change_info?: boolean,
    post_messages?: boolean,
    edit_messages?: boolean,
    delete_messages?: boolean,
    ban_users?: boolean,
    invite_users?: boolean,
    pin_messages?: boolean,
    add_admins?: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/ChatBannedRights
 */
export type ChatBannedRights =
  | ChatBannedRights.chatBannedRights
;

export namespace ChatBannedRights {
  export type chatBannedRights = {
    _: 'chatBannedRights',
    view_messages?: boolean,
    send_messages?: boolean,
    send_media?: boolean,
    send_stickers?: boolean,
    send_gifs?: boolean,
    send_games?: boolean,
    send_inline?: boolean,
    embed_links?: boolean,
    send_polls?: boolean,
    change_info?: boolean,
    invite_users?: boolean,
    pin_messages?: boolean,
    until_date: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputWallPaper
 */
export type InputWallPaper =
  | InputWallPaper.inputWallPaper
  | InputWallPaper.inputWallPaperSlug
;

export namespace InputWallPaper {
  export type inputWallPaper = {
    _: 'inputWallPaper',
    id: string,
    access_hash: string,
  };
  export type inputWallPaperSlug = {
    _: 'inputWallPaperSlug',
    slug: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.WallPapers
 */
export type AccountWallPapers =
  | AccountWallPapers.accountWallPapersNotModified
  | AccountWallPapers.accountWallPapers
;

export namespace AccountWallPapers {
  export type accountWallPapersNotModified = {
    _: 'account.wallPapersNotModified',
  };
  export type accountWallPapers = {
    _: 'account.wallPapers',
    hash: number,
    wallpapers: WallPaper[],
  };
}

/**
 * Ref: https://core.telegram.org/type/CodeSettings
 */
export type CodeSettings =
  | CodeSettings.codeSettings
;

export namespace CodeSettings {
  export type codeSettings = {
    _: 'codeSettings',
    allow_flashcall?: boolean,
    current_number?: boolean,
    allow_app_hash?: boolean,
  };
}

/**
 * Ref: https://core.telegram.org/type/WallPaperSettings
 */
export type WallPaperSettings =
  | WallPaperSettings.wallPaperSettings
;

export namespace WallPaperSettings {
  export type wallPaperSettings = {
    _: 'wallPaperSettings',
    blur?: boolean,
    motion?: boolean,
    background_color?: number,
    intensity?: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/AutoDownloadSettings
 */
export type AutoDownloadSettings =
  | AutoDownloadSettings.autoDownloadSettings
;

export namespace AutoDownloadSettings {
  export type autoDownloadSettings = {
    _: 'autoDownloadSettings',
    disabled?: boolean,
    video_preload_large?: boolean,
    audio_preload_next?: boolean,
    phonecalls_less_data?: boolean,
    photo_size_max: number,
    video_size_max: number,
    file_size_max: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.AutoDownloadSettings
 */
export type AccountAutoDownloadSettings =
  | AccountAutoDownloadSettings.accountAutoDownloadSettings
;

export namespace AccountAutoDownloadSettings {
  export type accountAutoDownloadSettings = {
    _: 'account.autoDownloadSettings',
    low: AutoDownloadSettings,
    medium: AutoDownloadSettings,
    high: AutoDownloadSettings,
  };
}

/**
 * Ref: https://core.telegram.org/type/EmojiKeyword
 */
export type EmojiKeyword =
  | EmojiKeyword.emojiKeyword
  | EmojiKeyword.emojiKeywordDeleted
;

export namespace EmojiKeyword {
  export type emojiKeyword = {
    _: 'emojiKeyword',
    keyword: string,
    emoticons: string[],
  };
  export type emojiKeywordDeleted = {
    _: 'emojiKeywordDeleted',
    keyword: string,
    emoticons: string[],
  };
}

/**
 * Ref: https://core.telegram.org/type/EmojiKeywordsDifference
 */
export type EmojiKeywordsDifference =
  | EmojiKeywordsDifference.emojiKeywordsDifference
;

export namespace EmojiKeywordsDifference {
  export type emojiKeywordsDifference = {
    _: 'emojiKeywordsDifference',
    lang_code: string,
    from_version: number,
    version: number,
    keywords: EmojiKeyword[],
  };
}

/**
 * Ref: https://core.telegram.org/type/EmojiURL
 */
export type EmojiURL =
  | EmojiURL.emojiURL
;

export namespace EmojiURL {
  export type emojiURL = {
    _: 'emojiURL',
    url: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/EmojiLanguage
 */
export type EmojiLanguage =
  | EmojiLanguage.emojiLanguage
;

export namespace EmojiLanguage {
  export type emojiLanguage = {
    _: 'emojiLanguage',
    lang_code: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/FileLocation
 */
export type FileLocation =
  | FileLocation.fileLocationToBeDeprecated
;

export namespace FileLocation {
  export type fileLocationToBeDeprecated = {
    _: 'fileLocationToBeDeprecated',
    volume_id: string,
    local_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/Folder
 */
export type Folder =
  | Folder.folder
;

export namespace Folder {
  export type folder = {
    _: 'folder',
    autofill_new_broadcasts?: boolean,
    autofill_public_groups?: boolean,
    autofill_new_correspondents?: boolean,
    id: number,
    title: string,
    photo?: ChatPhoto,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputFolderPeer
 */
export type InputFolderPeer =
  | InputFolderPeer.inputFolderPeer
;

export namespace InputFolderPeer {
  export type inputFolderPeer = {
    _: 'inputFolderPeer',
    peer: InputPeer,
    folder_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/FolderPeer
 */
export type FolderPeer =
  | FolderPeer.folderPeer
;

export namespace FolderPeer {
  export type folderPeer = {
    _: 'folderPeer',
    peer: Peer,
    folder_id: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/messages.SearchCounter
 */
export type MessagesSearchCounter =
  | MessagesSearchCounter.messagesSearchCounter
;

export namespace MessagesSearchCounter {
  export type messagesSearchCounter = {
    _: 'messages.searchCounter',
    inexact?: boolean,
    filter: MessagesFilter,
    count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/UrlAuthResult
 */
export type UrlAuthResult =
  | UrlAuthResult.urlAuthResultRequest
  | UrlAuthResult.urlAuthResultAccepted
  | UrlAuthResult.urlAuthResultDefault
;

export namespace UrlAuthResult {
  export type urlAuthResultRequest = {
    _: 'urlAuthResultRequest',
    request_write_access?: boolean,
    bot: User,
    domain: string,
  };
  export type urlAuthResultAccepted = {
    _: 'urlAuthResultAccepted',
    url: string,
  };
  export type urlAuthResultDefault = {
    _: 'urlAuthResultDefault',
  };
}

/**
 * Ref: https://core.telegram.org/type/ChannelLocation
 */
export type ChannelLocation =
  | ChannelLocation.channelLocationEmpty
  | ChannelLocation.channelLocation
;

export namespace ChannelLocation {
  export type channelLocationEmpty = {
    _: 'channelLocationEmpty',
  };
  export type channelLocation = {
    _: 'channelLocation',
    geo_point: GeoPoint,
    address: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/PeerLocated
 */
export type PeerLocated =
  | PeerLocated.peerLocated
;

export namespace PeerLocated {
  export type peerLocated = {
    _: 'peerLocated',
    peer: Peer,
    expires: number,
    distance: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/RestrictionReason
 */
export type RestrictionReason =
  | RestrictionReason.restrictionReason
;

export namespace RestrictionReason {
  export type restrictionReason = {
    _: 'restrictionReason',
    platform: string,
    reason: string,
    text: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/InputTheme
 */
export type InputTheme =
  | InputTheme.inputTheme
  | InputTheme.inputThemeSlug
;

export namespace InputTheme {
  export type inputTheme = {
    _: 'inputTheme',
    id: string,
    access_hash: string,
  };
  export type inputThemeSlug = {
    _: 'inputThemeSlug',
    slug: string,
  };
}

/**
 * Ref: https://core.telegram.org/type/Theme
 */
export type Theme =
  | Theme.themeDocumentNotModified
  | Theme.theme
;

export namespace Theme {
  export type themeDocumentNotModified = {
    _: 'themeDocumentNotModified',
  };
  export type theme = {
    _: 'theme',
    creator?: boolean,
    default?: boolean,
    id: string,
    access_hash: string,
    slug: string,
    title: string,
    document?: Document,
    installs_count: number,
  };
}

/**
 * Ref: https://core.telegram.org/type/account.Themes
 */
export type AccountThemes =
  | AccountThemes.accountThemesNotModified
  | AccountThemes.accountThemes
;

export namespace AccountThemes {
  export type accountThemesNotModified = {
    _: 'account.themesNotModified',
  };
  export type accountThemes = {
    _: 'account.themes',
    hash: number,
    themes: Theme[],
  };
}

/* METHODS */

export type InvokeAfterMsg = {
  msg_id: string,
  query: any,
};

export type InvokeAfterMsgs = {
  msg_ids: string[],
  query: any,
};

export type AuthSendCode = {
  phone_number: string,
  api_id: number,
  api_hash: string,
  settings: CodeSettings,
};

export type AuthSignUp = {
  phone_number: string,
  phone_code_hash: string,
  first_name: string,
  last_name: string,
};

export type AuthSignIn = {
  phone_number: string,
  phone_code_hash: string,
  phone_code: string,
};

export type AuthLogOut = {
};

export type AuthResetAuthorizations = {
};

export type AuthExportAuthorization = {
  dc_id: number,
};

export type AuthImportAuthorization = {
  id: number,
  bytes: string,
};

export type AuthBindTempAuthKey = {
  perm_auth_key_id: string,
  nonce: string,
  expires_at: number,
  encrypted_message: string,
};

export type AccountRegisterDevice = {
  no_muted?: boolean,
  token_type: number,
  token: string,
  app_sandbox: boolean,
  secret: string,
  other_uids: number[],
};

export type AccountUnregisterDevice = {
  token_type: number,
  token: string,
  other_uids: number[],
};

export type AccountUpdateNotifySettings = {
  peer: InputNotifyPeer,
  settings: InputPeerNotifySettings,
};

export type AccountGetNotifySettings = {
  peer: InputNotifyPeer,
};

export type AccountResetNotifySettings = {
};

export type AccountUpdateProfile = {
  first_name?: string,
  last_name?: string,
  about?: string,
};

export type AccountUpdateStatus = {
  offline: boolean,
};

export type AccountGetWallPapers = {
  hash: number,
};

export type AccountReportPeer = {
  peer: InputPeer,
  reason: ReportReason,
};

export type UsersGetUsers = {
  id: InputUser[],
};

export type UsersGetFullUser = {
  id: InputUser,
};

export type ContactsGetContactIDs = {
  hash: number,
};

export type ContactsGetStatuses = {
};

export type ContactsGetContacts = {
  hash: number,
};

export type ContactsImportContacts = {
  contacts: InputContact[],
};

export type ContactsDeleteContacts = {
  id: InputUser[],
};

export type ContactsDeleteByPhones = {
  phones: string[],
};

export type ContactsBlock = {
  id: InputUser,
};

export type ContactsUnblock = {
  id: InputUser,
};

export type ContactsGetBlocked = {
  offset: number,
  limit: number,
};

export type MessagesGetMessages = {
  id: InputMessage[],
};

export type MessagesGetDialogs = {
  exclude_pinned?: boolean,
  folder_id?: number,
  offset_date: number,
  offset_id: number,
  offset_peer: InputPeer,
  limit: number,
  hash: number,
};

export type MessagesGetHistory = {
  peer: InputPeer,
  offset_id: number,
  offset_date: number,
  add_offset: number,
  limit: number,
  max_id: number,
  min_id: number,
  hash: number,
};

export type MessagesSearch = {
  peer: InputPeer,
  q: string,
  from_id?: InputUser,
  filter: MessagesFilter,
  min_date: number,
  max_date: number,
  offset_id: number,
  add_offset: number,
  limit: number,
  max_id: number,
  min_id: number,
  hash: number,
};

export type MessagesReadHistory = {
  peer: InputPeer,
  max_id: number,
};

export type MessagesDeleteHistory = {
  just_clear?: boolean,
  revoke?: boolean,
  peer: InputPeer,
  max_id: number,
};

export type MessagesDeleteMessages = {
  revoke?: boolean,
  id: number[],
};

export type MessagesReceivedMessages = {
  max_id: number,
};

export type MessagesSetTyping = {
  peer: InputPeer,
  action: SendMessageAction,
};

export type MessagesSendMessage = {
  no_webpage?: boolean,
  silent?: boolean,
  background?: boolean,
  clear_draft?: boolean,
  peer: InputPeer,
  reply_to_msg_id?: number,
  message: string,
  random_id: string,
  reply_markup?: ReplyMarkup,
  entities?: MessageEntity[],
  schedule_date?: number,
};

export type MessagesSendMedia = {
  silent?: boolean,
  background?: boolean,
  clear_draft?: boolean,
  peer: InputPeer,
  reply_to_msg_id?: number,
  media: InputMedia,
  message: string,
  random_id: string,
  reply_markup?: ReplyMarkup,
  entities?: MessageEntity[],
  schedule_date?: number,
};

export type MessagesForwardMessages = {
  silent?: boolean,
  background?: boolean,
  with_my_score?: boolean,
  grouped?: boolean,
  from_peer: InputPeer,
  id: number[],
  random_id: string[],
  to_peer: InputPeer,
  schedule_date?: number,
};

export type MessagesReportSpam = {
  peer: InputPeer,
};

export type MessagesGetPeerSettings = {
  peer: InputPeer,
};

export type MessagesReport = {
  peer: InputPeer,
  id: number[],
  reason: ReportReason,
};

export type MessagesGetChats = {
  id: number[],
};

export type MessagesGetFullChat = {
  chat_id: number,
};

export type MessagesEditChatTitle = {
  chat_id: number,
  title: string,
};

export type MessagesEditChatPhoto = {
  chat_id: number,
  photo: InputChatPhoto,
};

export type MessagesAddChatUser = {
  chat_id: number,
  user_id: InputUser,
  fwd_limit: number,
};

export type MessagesDeleteChatUser = {
  chat_id: number,
  user_id: InputUser,
};

export type MessagesCreateChat = {
  users: InputUser[],
  title: string,
};

export type UpdatesGetState = {
};

export type UpdatesGetDifference = {
  pts: number,
  pts_total_limit?: number,
  date: number,
  qts: number,
};

export type PhotosUpdateProfilePhoto = {
  id: InputPhoto,
};

export type PhotosUploadProfilePhoto = {
  file: InputFile,
};

export type PhotosDeletePhotos = {
  id: InputPhoto[],
};

export type UploadSaveFilePart = {
  file_id: string,
  file_part: number,
  bytes: string,
};

export type UploadGetFile = {
  precise?: boolean,
  location: InputFileLocation,
  offset: number,
  limit: number,
};

export type HelpGetConfig = {
};

export type HelpGetNearestDc = {
};

export type HelpGetAppUpdate = {
  source: string,
};

export type HelpGetInviteText = {
};

export type PhotosGetUserPhotos = {
  user_id: InputUser,
  offset: number,
  max_id: string,
  limit: number,
};

export type MessagesGetDhConfig = {
  version: number,
  random_length: number,
};

export type MessagesRequestEncryption = {
  user_id: InputUser,
  random_id: number,
  g_a: string,
};

export type MessagesAcceptEncryption = {
  peer: InputEncryptedChat,
  g_b: string,
  key_fingerprint: string,
};

export type MessagesDiscardEncryption = {
  chat_id: number,
};

export type MessagesSetEncryptedTyping = {
  peer: InputEncryptedChat,
  typing: boolean,
};

export type MessagesReadEncryptedHistory = {
  peer: InputEncryptedChat,
  max_date: number,
};

export type MessagesSendEncrypted = {
  peer: InputEncryptedChat,
  random_id: string,
  data: string,
};

export type MessagesSendEncryptedFile = {
  peer: InputEncryptedChat,
  random_id: string,
  data: string,
  file: InputEncryptedFile,
};

export type MessagesSendEncryptedService = {
  peer: InputEncryptedChat,
  random_id: string,
  data: string,
};

export type MessagesReceivedQueue = {
  max_qts: number,
};

export type MessagesReportEncryptedSpam = {
  peer: InputEncryptedChat,
};

export type UploadSaveBigFilePart = {
  file_id: string,
  file_part: number,
  file_total_parts: number,
  bytes: string,
};

export type InitConnection = {
  api_id: number,
  device_model: string,
  system_version: string,
  app_version: string,
  system_lang_code: string,
  lang_pack: string,
  lang_code: string,
  proxy?: InputClientProxy,
  query: any,
};

export type HelpGetSupport = {
};

export type MessagesReadMessageContents = {
  id: number[],
};

export type AccountCheckUsername = {
  username: string,
};

export type AccountUpdateUsername = {
  username: string,
};

export type ContactsSearch = {
  q: string,
  limit: number,
};

export type AccountGetPrivacy = {
  key: InputPrivacyKey,
};

export type AccountSetPrivacy = {
  key: InputPrivacyKey,
  rules: InputPrivacyRule[],
};

export type AccountDeleteAccount = {
  reason: string,
};

export type AccountGetAccountTTL = {
};

export type AccountSetAccountTTL = {
  ttl: AccountDaysTTL,
};

export type InvokeWithLayer = {
  layer: number,
  query: any,
};

export type ContactsResolveUsername = {
  username: string,
};

export type AccountSendChangePhoneCode = {
  phone_number: string,
  settings: CodeSettings,
};

export type AccountChangePhone = {
  phone_number: string,
  phone_code_hash: string,
  phone_code: string,
};

export type MessagesGetStickers = {
  emoticon: string,
  hash: number,
};

export type MessagesGetAllStickers = {
  hash: number,
};

export type AccountUpdateDeviceLocked = {
  period: number,
};

export type AuthImportBotAuthorization = {
  api_id: number,
  api_hash: string,
  bot_auth_token: string,
};

export type MessagesGetWebPagePreview = {
  message: string,
  entities?: MessageEntity[],
};

export type AccountGetAuthorizations = {
};

export type AccountResetAuthorization = {
  hash: string,
};

export type AccountGetPassword = {
};

export type AccountGetPasswordSettings = {
  password: InputCheckPasswordSRP,
};

export type AccountUpdatePasswordSettings = {
  password: InputCheckPasswordSRP,
  new_settings: AccountPasswordInputSettings,
};

export type AuthCheckPassword = {
  password: InputCheckPasswordSRP,
};

export type AuthRequestPasswordRecovery = {
};

export type AuthRecoverPassword = {
  code: string,
};

export type InvokeWithoutUpdates = {
  query: any,
};

export type MessagesExportChatInvite = {
  peer: InputPeer,
};

export type MessagesCheckChatInvite = {
  hash: string,
};

export type MessagesImportChatInvite = {
  hash: string,
};

export type MessagesGetStickerSet = {
  stickerset: InputStickerSet,
};

export type MessagesInstallStickerSet = {
  stickerset: InputStickerSet,
  archived: boolean,
};

export type MessagesUninstallStickerSet = {
  stickerset: InputStickerSet,
};

export type MessagesStartBot = {
  bot: InputUser,
  peer: InputPeer,
  random_id: string,
  start_param: string,
};

export type HelpGetAppChangelog = {
  prev_app_version: string,
};

export type MessagesGetMessagesViews = {
  peer: InputPeer,
  id: number[],
  increment: boolean,
};

export type ChannelsReadHistory = {
  channel: InputChannel,
  max_id: number,
};

export type ChannelsDeleteMessages = {
  channel: InputChannel,
  id: number[],
};

export type ChannelsDeleteUserHistory = {
  channel: InputChannel,
  user_id: InputUser,
};

export type ChannelsReportSpam = {
  channel: InputChannel,
  user_id: InputUser,
  id: number[],
};

export type ChannelsGetMessages = {
  channel: InputChannel,
  id: InputMessage[],
};

export type ChannelsGetParticipants = {
  channel: InputChannel,
  filter: ChannelParticipantsFilter,
  offset: number,
  limit: number,
  hash: number,
};

export type ChannelsGetParticipant = {
  channel: InputChannel,
  user_id: InputUser,
};

export type ChannelsGetChannels = {
  id: InputChannel[],
};

export type ChannelsGetFullChannel = {
  channel: InputChannel,
};

export type ChannelsCreateChannel = {
  broadcast?: boolean,
  megagroup?: boolean,
  title: string,
  about: string,
  geo_point?: InputGeoPoint,
  address?: string,
};

export type ChannelsEditAdmin = {
  channel: InputChannel,
  user_id: InputUser,
  admin_rights: ChatAdminRights,
  rank: string,
};

export type ChannelsEditTitle = {
  channel: InputChannel,
  title: string,
};

export type ChannelsEditPhoto = {
  channel: InputChannel,
  photo: InputChatPhoto,
};

export type ChannelsCheckUsername = {
  channel: InputChannel,
  username: string,
};

export type ChannelsUpdateUsername = {
  channel: InputChannel,
  username: string,
};

export type ChannelsJoinChannel = {
  channel: InputChannel,
};

export type ChannelsLeaveChannel = {
  channel: InputChannel,
};

export type ChannelsInviteToChannel = {
  channel: InputChannel,
  users: InputUser[],
};

export type ChannelsDeleteChannel = {
  channel: InputChannel,
};

export type UpdatesGetChannelDifference = {
  force?: boolean,
  channel: InputChannel,
  filter: ChannelMessagesFilter,
  pts: number,
  limit: number,
};

export type MessagesEditChatAdmin = {
  chat_id: number,
  user_id: InputUser,
  is_admin: boolean,
};

export type MessagesMigrateChat = {
  chat_id: number,
};

export type MessagesSearchGlobal = {
  folder_id?: number,
  q: string,
  offset_rate: number,
  offset_peer: InputPeer,
  offset_id: number,
  limit: number,
};

export type MessagesReorderStickerSets = {
  masks?: boolean,
  order: string[],
};

export type MessagesGetDocumentByHash = {
  sha256: string,
  size: number,
  mime_type: string,
};

export type MessagesSearchGifs = {
  q: string,
  offset: number,
};

export type MessagesGetSavedGifs = {
  hash: number,
};

export type MessagesSaveGif = {
  id: InputDocument,
  unsave: boolean,
};

export type MessagesGetInlineBotResults = {
  bot: InputUser,
  peer: InputPeer,
  geo_point?: InputGeoPoint,
  query: string,
  offset: string,
};

export type MessagesSetInlineBotResults = {
  gallery?: boolean,
  private?: boolean,
  query_id: string,
  results: InputBotInlineResult[],
  cache_time: number,
  next_offset?: string,
  switch_pm?: InlineBotSwitchPM,
};

export type MessagesSendInlineBotResult = {
  silent?: boolean,
  background?: boolean,
  clear_draft?: boolean,
  hide_via?: boolean,
  peer: InputPeer,
  reply_to_msg_id?: number,
  random_id: string,
  query_id: string,
  id: string,
  schedule_date?: number,
};

export type ChannelsExportMessageLink = {
  channel: InputChannel,
  id: number,
  grouped: boolean,
};

export type ChannelsToggleSignatures = {
  channel: InputChannel,
  enabled: boolean,
};

export type AuthResendCode = {
  phone_number: string,
  phone_code_hash: string,
};

export type AuthCancelCode = {
  phone_number: string,
  phone_code_hash: string,
};

export type MessagesGetMessageEditData = {
  peer: InputPeer,
  id: number,
};

export type MessagesEditMessage = {
  no_webpage?: boolean,
  peer: InputPeer,
  id: number,
  message?: string,
  media?: InputMedia,
  reply_markup?: ReplyMarkup,
  entities?: MessageEntity[],
  schedule_date?: number,
};

export type MessagesEditInlineBotMessage = {
  no_webpage?: boolean,
  id: InputBotInlineMessageID,
  message?: string,
  media?: InputMedia,
  reply_markup?: ReplyMarkup,
  entities?: MessageEntity[],
};

export type MessagesGetBotCallbackAnswer = {
  game?: boolean,
  peer: InputPeer,
  msg_id: number,
  data?: string,
};

export type MessagesSetBotCallbackAnswer = {
  alert?: boolean,
  query_id: string,
  message?: string,
  url?: string,
  cache_time: number,
};

export type ContactsGetTopPeers = {
  correspondents?: boolean,
  bots_pm?: boolean,
  bots_inline?: boolean,
  phone_calls?: boolean,
  forward_users?: boolean,
  forward_chats?: boolean,
  groups?: boolean,
  channels?: boolean,
  offset: number,
  limit: number,
  hash: number,
};

export type ContactsResetTopPeerRating = {
  category: TopPeerCategory,
  peer: InputPeer,
};

export type MessagesGetPeerDialogs = {
  peers: InputDialogPeer[],
};

export type MessagesSaveDraft = {
  no_webpage?: boolean,
  reply_to_msg_id?: number,
  peer: InputPeer,
  message: string,
  entities?: MessageEntity[],
};

export type MessagesGetAllDrafts = {
};

export type MessagesGetFeaturedStickers = {
  hash: number,
};

export type MessagesReadFeaturedStickers = {
  id: string[],
};

export type MessagesGetRecentStickers = {
  attached?: boolean,
  hash: number,
};

export type MessagesSaveRecentSticker = {
  attached?: boolean,
  id: InputDocument,
  unsave: boolean,
};

export type MessagesClearRecentStickers = {
  attached?: boolean,
};

export type MessagesGetArchivedStickers = {
  masks?: boolean,
  offset_id: string,
  limit: number,
};

export type AccountSendConfirmPhoneCode = {
  hash: string,
  settings: CodeSettings,
};

export type AccountConfirmPhone = {
  phone_code_hash: string,
  phone_code: string,
};

export type ChannelsGetAdminedPublicChannels = {
  by_location?: boolean,
  check_limit?: boolean,
};

export type MessagesGetMaskStickers = {
  hash: number,
};

export type MessagesGetAttachedStickers = {
  media: InputStickeredMedia,
};

export type AuthDropTempAuthKeys = {
  except_auth_keys: string[],
};

export type MessagesSetGameScore = {
  edit_message?: boolean,
  force?: boolean,
  peer: InputPeer,
  id: number,
  user_id: InputUser,
  score: number,
};

export type MessagesSetInlineGameScore = {
  edit_message?: boolean,
  force?: boolean,
  id: InputBotInlineMessageID,
  user_id: InputUser,
  score: number,
};

export type MessagesGetGameHighScores = {
  peer: InputPeer,
  id: number,
  user_id: InputUser,
};

export type MessagesGetInlineGameHighScores = {
  id: InputBotInlineMessageID,
  user_id: InputUser,
};

export type MessagesGetCommonChats = {
  user_id: InputUser,
  max_id: number,
  limit: number,
};

export type MessagesGetAllChats = {
  except_ids: number[],
};

export type HelpSetBotUpdatesStatus = {
  pending_updates_count: number,
  message: string,
};

export type MessagesGetWebPage = {
  url: string,
  hash: number,
};

export type MessagesToggleDialogPin = {
  pinned?: boolean,
  peer: InputDialogPeer,
};

export type MessagesReorderPinnedDialogs = {
  force?: boolean,
  folder_id: number,
  order: InputDialogPeer[],
};

export type MessagesGetPinnedDialogs = {
  folder_id: number,
};

export type BotsSendCustomRequest = {
  custom_method: string,
  params: DataJSON,
};

export type BotsAnswerWebhookJSONQuery = {
  query_id: string,
  data: DataJSON,
};

export type UploadGetWebFile = {
  location: InputWebFileLocation,
  offset: number,
  limit: number,
};

export type PaymentsGetPaymentForm = {
  msg_id: number,
};

export type PaymentsGetPaymentReceipt = {
  msg_id: number,
};

export type PaymentsValidateRequestedInfo = {
  save?: boolean,
  msg_id: number,
  info: PaymentRequestedInfo,
};

export type PaymentsSendPaymentForm = {
  msg_id: number,
  requested_info_id?: string,
  shipping_option_id?: string,
  credentials: InputPaymentCredentials,
};

export type AccountGetTmpPassword = {
  password: InputCheckPasswordSRP,
  period: number,
};

export type PaymentsGetSavedInfo = {
};

export type PaymentsClearSavedInfo = {
  credentials?: boolean,
  info?: boolean,
};

export type MessagesSetBotShippingResults = {
  query_id: string,
  error?: string,
  shipping_options?: ShippingOption[],
};

export type MessagesSetBotPrecheckoutResults = {
  success?: boolean,
  query_id: string,
  error?: string,
};

export type StickersCreateStickerSet = {
  masks?: boolean,
  user_id: InputUser,
  title: string,
  short_name: string,
  stickers: InputStickerSetItem[],
};

export type StickersRemoveStickerFromSet = {
  sticker: InputDocument,
};

export type StickersChangeStickerPosition = {
  sticker: InputDocument,
  position: number,
};

export type StickersAddStickerToSet = {
  stickerset: InputStickerSet,
  sticker: InputStickerSetItem,
};

export type MessagesUploadMedia = {
  peer: InputPeer,
  media: InputMedia,
};

export type PhoneGetCallConfig = {
};

export type PhoneRequestCall = {
  video?: boolean,
  user_id: InputUser,
  random_id: number,
  g_a_hash: string,
  protocol: PhoneCallProtocol,
};

export type PhoneAcceptCall = {
  peer: InputPhoneCall,
  g_b: string,
  protocol: PhoneCallProtocol,
};

export type PhoneConfirmCall = {
  peer: InputPhoneCall,
  g_a: string,
  key_fingerprint: string,
  protocol: PhoneCallProtocol,
};

export type PhoneReceivedCall = {
  peer: InputPhoneCall,
};

export type PhoneDiscardCall = {
  video?: boolean,
  peer: InputPhoneCall,
  duration: number,
  reason: PhoneCallDiscardReason,
  connection_id: string,
};

export type PhoneSetCallRating = {
  user_initiative?: boolean,
  peer: InputPhoneCall,
  rating: number,
  comment: string,
};

export type PhoneSaveCallDebug = {
  peer: InputPhoneCall,
  debug: DataJSON,
};

export type UploadGetCdnFile = {
  file_token: string,
  offset: number,
  limit: number,
};

export type UploadReuploadCdnFile = {
  file_token: string,
  request_token: string,
};

export type HelpGetCdnConfig = {
};

export type LangpackGetLangPack = {
  lang_pack: string,
  lang_code: string,
};

export type LangpackGetStrings = {
  lang_pack: string,
  lang_code: string,
  keys: string[],
};

export type LangpackGetDifference = {
  lang_pack: string,
  lang_code: string,
  from_version: number,
};

export type LangpackGetLanguages = {
  lang_pack: string,
};

export type ChannelsEditBanned = {
  channel: InputChannel,
  user_id: InputUser,
  banned_rights: ChatBannedRights,
};

export type ChannelsGetAdminLog = {
  channel: InputChannel,
  q: string,
  events_filter?: ChannelAdminLogEventsFilter,
  admins?: InputUser[],
  max_id: string,
  min_id: string,
  limit: number,
};

export type UploadGetCdnFileHashes = {
  file_token: string,
  offset: number,
};

export type MessagesSendScreenshotNotification = {
  peer: InputPeer,
  reply_to_msg_id: number,
  random_id: string,
};

export type ChannelsSetStickers = {
  channel: InputChannel,
  stickerset: InputStickerSet,
};

export type MessagesGetFavedStickers = {
  hash: number,
};

export type MessagesFaveSticker = {
  id: InputDocument,
  unfave: boolean,
};

export type ChannelsReadMessageContents = {
  channel: InputChannel,
  id: number[],
};

export type ContactsResetSaved = {
};

export type MessagesGetUnreadMentions = {
  peer: InputPeer,
  offset_id: number,
  add_offset: number,
  limit: number,
  max_id: number,
  min_id: number,
};

export type ChannelsDeleteHistory = {
  channel: InputChannel,
  max_id: number,
};

export type HelpGetRecentMeUrls = {
  referer: string,
};

export type ChannelsTogglePreHistoryHidden = {
  channel: InputChannel,
  enabled: boolean,
};

export type MessagesReadMentions = {
  peer: InputPeer,
};

export type MessagesGetRecentLocations = {
  peer: InputPeer,
  limit: number,
  hash: number,
};

export type MessagesSendMultiMedia = {
  silent?: boolean,
  background?: boolean,
  clear_draft?: boolean,
  peer: InputPeer,
  reply_to_msg_id?: number,
  multi_media: InputSingleMedia[],
  schedule_date?: number,
};

export type MessagesUploadEncryptedFile = {
  peer: InputEncryptedChat,
  file: InputEncryptedFile,
};

export type AccountGetWebAuthorizations = {
};

export type AccountResetWebAuthorization = {
  hash: string,
};

export type AccountResetWebAuthorizations = {
};

export type MessagesSearchStickerSets = {
  exclude_featured?: boolean,
  q: string,
  hash: number,
};

export type UploadGetFileHashes = {
  location: InputFileLocation,
  offset: number,
};

export type HelpGetProxyData = {
};

export type HelpGetTermsOfServiceUpdate = {
};

export type HelpAcceptTermsOfService = {
  id: DataJSON,
};

export type AccountGetAllSecureValues = {
};

export type AccountGetSecureValue = {
  types: SecureValueType[],
};

export type AccountSaveSecureValue = {
  value: InputSecureValue,
  secure_secret_id: string,
};

export type AccountDeleteSecureValue = {
  types: SecureValueType[],
};

export type UsersSetSecureValueErrors = {
  id: InputUser,
  errors: SecureValueError[],
};

export type AccountGetAuthorizationForm = {
  bot_id: number,
  scope: string,
  public_key: string,
};

export type AccountAcceptAuthorization = {
  bot_id: number,
  scope: string,
  public_key: string,
  value_hashes: SecureValueHash[],
  credentials: SecureCredentialsEncrypted,
};

export type AccountSendVerifyPhoneCode = {
  phone_number: string,
  settings: CodeSettings,
};

export type AccountVerifyPhone = {
  phone_number: string,
  phone_code_hash: string,
  phone_code: string,
};

export type AccountSendVerifyEmailCode = {
  email: string,
};

export type AccountVerifyEmail = {
  email: string,
  code: string,
};

export type HelpGetDeepLinkInfo = {
  path: string,
};

export type ContactsGetSaved = {
};

export type ChannelsGetLeftChannels = {
  offset: number,
};

export type AccountInitTakeoutSession = {
  contacts?: boolean,
  message_users?: boolean,
  message_chats?: boolean,
  message_megagroups?: boolean,
  message_channels?: boolean,
  files?: boolean,
  file_max_size?: number,
};

export type AccountFinishTakeoutSession = {
  success?: boolean,
};

export type MessagesGetSplitRanges = {
};

export type InvokeWithMessagesRange = {
  range: MessageRange,
  query: any,
};

export type InvokeWithTakeout = {
  takeout_id: string,
  query: any,
};

export type MessagesMarkDialogUnread = {
  unread?: boolean,
  peer: InputDialogPeer,
};

export type MessagesGetDialogUnreadMarks = {
};

export type ContactsToggleTopPeers = {
  enabled: boolean,
};

export type MessagesClearAllDrafts = {
};

export type HelpGetAppConfig = {
};

export type HelpSaveAppLog = {
  events: InputAppEvent[],
};

export type HelpGetPassportConfig = {
  hash: number,
};

export type LangpackGetLanguage = {
  lang_pack: string,
  lang_code: string,
};

export type MessagesUpdatePinnedMessage = {
  silent?: boolean,
  peer: InputPeer,
  id: number,
};

export type AccountConfirmPasswordEmail = {
  code: string,
};

export type AccountResendPasswordEmail = {
};

export type AccountCancelPasswordEmail = {
};

export type HelpGetSupportName = {
};

export type HelpGetUserInfo = {
  user_id: InputUser,
};

export type HelpEditUserInfo = {
  user_id: InputUser,
  message: string,
  entities: MessageEntity[],
};

export type AccountGetContactSignUpNotification = {
};

export type AccountSetContactSignUpNotification = {
  silent: boolean,
};

export type AccountGetNotifyExceptions = {
  compare_sound?: boolean,
  peer?: InputNotifyPeer,
};

export type MessagesSendVote = {
  peer: InputPeer,
  msg_id: number,
  options: string[],
};

export type MessagesGetPollResults = {
  peer: InputPeer,
  msg_id: number,
};

export type MessagesGetOnlines = {
  peer: InputPeer,
};

export type MessagesGetStatsURL = {
  dark?: boolean,
  peer: InputPeer,
  params: string,
};

export type MessagesEditChatAbout = {
  peer: InputPeer,
  about: string,
};

export type MessagesEditChatDefaultBannedRights = {
  peer: InputPeer,
  banned_rights: ChatBannedRights,
};

export type AccountGetWallPaper = {
  wallpaper: InputWallPaper,
};

export type AccountUploadWallPaper = {
  file: InputFile,
  mime_type: string,
  settings: WallPaperSettings,
};

export type AccountSaveWallPaper = {
  wallpaper: InputWallPaper,
  unsave: boolean,
  settings: WallPaperSettings,
};

export type AccountInstallWallPaper = {
  wallpaper: InputWallPaper,
  settings: WallPaperSettings,
};

export type AccountResetWallPapers = {
};

export type AccountGetAutoDownloadSettings = {
};

export type AccountSaveAutoDownloadSettings = {
  low?: boolean,
  high?: boolean,
  settings: AutoDownloadSettings,
};

export type MessagesGetEmojiKeywords = {
  lang_code: string,
};

export type MessagesGetEmojiKeywordsDifference = {
  lang_code: string,
  from_version: number,
};

export type MessagesGetEmojiKeywordsLanguages = {
  lang_codes: string[],
};

export type MessagesGetEmojiURL = {
  lang_code: string,
};

export type FoldersEditPeerFolders = {
  folder_peers: InputFolderPeer[],
};

export type FoldersDeleteFolder = {
  folder_id: number,
};

export type MessagesGetSearchCounters = {
  peer: InputPeer,
  filters: MessagesFilter[],
};

export type ChannelsGetGroupsForDiscussion = {
};

export type ChannelsSetDiscussionGroup = {
  broadcast: InputChannel,
  group: InputChannel,
};

export type MessagesRequestUrlAuth = {
  peer: InputPeer,
  msg_id: number,
  button_id: number,
};

export type MessagesAcceptUrlAuth = {
  write_allowed?: boolean,
  peer: InputPeer,
  msg_id: number,
  button_id: number,
};

export type MessagesHidePeerSettingsBar = {
  peer: InputPeer,
};

export type ContactsAddContact = {
  add_phone_privacy_exception?: boolean,
  id: InputUser,
  first_name: string,
  last_name: string,
  phone: string,
};

export type ContactsAcceptContact = {
  id: InputUser,
};

export type ChannelsEditCreator = {
  channel: InputChannel,
  user_id: InputUser,
  password: InputCheckPasswordSRP,
};

export type ContactsGetLocated = {
  geo_point: InputGeoPoint,
};

export type ChannelsEditLocation = {
  channel: InputChannel,
  geo_point: InputGeoPoint,
  address: string,
};

export type ChannelsToggleSlowMode = {
  channel: InputChannel,
  seconds: number,
};

export type MessagesGetScheduledHistory = {
  peer: InputPeer,
  hash: number,
};

export type MessagesGetScheduledMessages = {
  peer: InputPeer,
  id: number[],
};

export type MessagesSendScheduledMessages = {
  peer: InputPeer,
  id: number[],
};

export type MessagesDeleteScheduledMessages = {
  peer: InputPeer,
  id: number[],
};

export type AccountUploadTheme = {
  file: InputFile,
  thumb?: InputFile,
  file_name: string,
  mime_type: string,
};

export type AccountCreateTheme = {
  slug: string,
  title: string,
  document: InputDocument,
};

export type AccountUpdateTheme = {
  format: string,
  theme: InputTheme,
  slug?: string,
  title?: string,
  document?: InputDocument,
};

export type AccountSaveTheme = {
  theme: InputTheme,
  unsave: boolean,
};

export type AccountInstallTheme = {
  dark?: boolean,
  format?: string,
  theme?: InputTheme,
};

export type AccountGetTheme = {
  format: string,
  theme: InputTheme,
  document_id: string,
};

export type AccountGetThemes = {
  format: string,
  hash: number,
};

type RequestResolver<T> = (err: ClientError | null, res?: T) => void;
type UpdateResolver<T> = (res?: T) => void;

export interface Client {
  call(method: string, data: Record<string, any>, headers: Record<string, any>, cb: RequestResolver<any>): void;
  call(method: 'invokeAfterMsg', data: InvokeAfterMsg, cb?: RequestResolver<any>): void;
  call(method: 'invokeAfterMsgs', data: InvokeAfterMsgs, cb?: RequestResolver<any>): void;
  call(method: 'auth.sendCode', data: AuthSendCode, cb?: RequestResolver<AuthSentCode>): void;
  call(method: 'auth.signUp', data: AuthSignUp, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'auth.signIn', data: AuthSignIn, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'auth.logOut', data: AuthLogOut, cb?: RequestResolver<boolean>): void;
  call(method: 'auth.resetAuthorizations', data: AuthResetAuthorizations, cb?: RequestResolver<boolean>): void;
  call(method: 'auth.exportAuthorization', data: AuthExportAuthorization, cb?: RequestResolver<AuthExportedAuthorization>): void;
  call(method: 'auth.importAuthorization', data: AuthImportAuthorization, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'auth.bindTempAuthKey', data: AuthBindTempAuthKey, cb?: RequestResolver<boolean>): void;
  call(method: 'account.registerDevice', data: AccountRegisterDevice, cb?: RequestResolver<boolean>): void;
  call(method: 'account.unregisterDevice', data: AccountUnregisterDevice, cb?: RequestResolver<boolean>): void;
  call(method: 'account.updateNotifySettings', data: AccountUpdateNotifySettings, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getNotifySettings', data: AccountGetNotifySettings, cb?: RequestResolver<PeerNotifySettings>): void;
  call(method: 'account.resetNotifySettings', data: AccountResetNotifySettings, cb?: RequestResolver<boolean>): void;
  call(method: 'account.updateProfile', data: AccountUpdateProfile, cb?: RequestResolver<User>): void;
  call(method: 'account.updateStatus', data: AccountUpdateStatus, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getWallPapers', data: AccountGetWallPapers, cb?: RequestResolver<AccountWallPapers>): void;
  call(method: 'account.reportPeer', data: AccountReportPeer, cb?: RequestResolver<boolean>): void;
  call(method: 'users.getUsers', data: UsersGetUsers, cb?: RequestResolver<User[]>): void;
  call(method: 'users.getFullUser', data: UsersGetFullUser, cb?: RequestResolver<UserFull>): void;
  call(method: 'contacts.getContactIDs', data: ContactsGetContactIDs, cb?: RequestResolver<number[]>): void;
  call(method: 'contacts.getStatuses', data: ContactsGetStatuses, cb?: RequestResolver<ContactStatus[]>): void;
  call(method: 'contacts.getContacts', data: ContactsGetContacts, cb?: RequestResolver<ContactsContacts>): void;
  call(method: 'contacts.importContacts', data: ContactsImportContacts, cb?: RequestResolver<ContactsImportedContacts>): void;
  call(method: 'contacts.deleteContacts', data: ContactsDeleteContacts, cb?: RequestResolver<Updates>): void;
  call(method: 'contacts.deleteByPhones', data: ContactsDeleteByPhones, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.block', data: ContactsBlock, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.unblock', data: ContactsUnblock, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.getBlocked', data: ContactsGetBlocked, cb?: RequestResolver<ContactsBlocked>): void;
  call(method: 'messages.getMessages', data: MessagesGetMessages, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.getDialogs', data: MessagesGetDialogs, cb?: RequestResolver<MessagesDialogs>): void;
  call(method: 'messages.getHistory', data: MessagesGetHistory, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.search', data: MessagesSearch, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.readHistory', data: MessagesReadHistory, cb?: RequestResolver<MessagesAffectedMessages>): void;
  call(method: 'messages.deleteHistory', data: MessagesDeleteHistory, cb?: RequestResolver<MessagesAffectedHistory>): void;
  call(method: 'messages.deleteMessages', data: MessagesDeleteMessages, cb?: RequestResolver<MessagesAffectedMessages>): void;
  call(method: 'messages.receivedMessages', data: MessagesReceivedMessages, cb?: RequestResolver<ReceivedNotifyMessage[]>): void;
  call(method: 'messages.setTyping', data: MessagesSetTyping, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.sendMessage', data: MessagesSendMessage, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.sendMedia', data: MessagesSendMedia, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.forwardMessages', data: MessagesForwardMessages, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.reportSpam', data: MessagesReportSpam, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getPeerSettings', data: MessagesGetPeerSettings, cb?: RequestResolver<PeerSettings>): void;
  call(method: 'messages.report', data: MessagesReport, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getChats', data: MessagesGetChats, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'messages.getFullChat', data: MessagesGetFullChat, cb?: RequestResolver<MessagesChatFull>): void;
  call(method: 'messages.editChatTitle', data: MessagesEditChatTitle, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.editChatPhoto', data: MessagesEditChatPhoto, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.addChatUser', data: MessagesAddChatUser, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.deleteChatUser', data: MessagesDeleteChatUser, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.createChat', data: MessagesCreateChat, cb?: RequestResolver<Updates>): void;
  call(method: 'updates.getState', data: UpdatesGetState, cb?: RequestResolver<UpdatesState>): void;
  call(method: 'updates.getDifference', data: UpdatesGetDifference, cb?: RequestResolver<UpdatesDifference>): void;
  call(method: 'photos.updateProfilePhoto', data: PhotosUpdateProfilePhoto, cb?: RequestResolver<UserProfilePhoto>): void;
  call(method: 'photos.uploadProfilePhoto', data: PhotosUploadProfilePhoto, cb?: RequestResolver<PhotosPhoto>): void;
  call(method: 'photos.deletePhotos', data: PhotosDeletePhotos, cb?: RequestResolver<string[]>): void;
  call(method: 'upload.saveFilePart', data: UploadSaveFilePart, cb?: RequestResolver<boolean>): void;
  call(method: 'upload.getFile', data: UploadGetFile, cb?: RequestResolver<UploadFile>): void;
  call(method: 'help.getConfig', data: HelpGetConfig, cb?: RequestResolver<Config>): void;
  call(method: 'help.getNearestDc', data: HelpGetNearestDc, cb?: RequestResolver<NearestDc>): void;
  call(method: 'help.getAppUpdate', data: HelpGetAppUpdate, cb?: RequestResolver<HelpAppUpdate>): void;
  call(method: 'help.getInviteText', data: HelpGetInviteText, cb?: RequestResolver<HelpInviteText>): void;
  call(method: 'photos.getUserPhotos', data: PhotosGetUserPhotos, cb?: RequestResolver<PhotosPhotos>): void;
  call(method: 'messages.getDhConfig', data: MessagesGetDhConfig, cb?: RequestResolver<MessagesDhConfig>): void;
  call(method: 'messages.requestEncryption', data: MessagesRequestEncryption, cb?: RequestResolver<EncryptedChat>): void;
  call(method: 'messages.acceptEncryption', data: MessagesAcceptEncryption, cb?: RequestResolver<EncryptedChat>): void;
  call(method: 'messages.discardEncryption', data: MessagesDiscardEncryption, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.setEncryptedTyping', data: MessagesSetEncryptedTyping, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.readEncryptedHistory', data: MessagesReadEncryptedHistory, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.sendEncrypted', data: MessagesSendEncrypted, cb?: RequestResolver<MessagesSentEncryptedMessage>): void;
  call(method: 'messages.sendEncryptedFile', data: MessagesSendEncryptedFile, cb?: RequestResolver<MessagesSentEncryptedMessage>): void;
  call(method: 'messages.sendEncryptedService', data: MessagesSendEncryptedService, cb?: RequestResolver<MessagesSentEncryptedMessage>): void;
  call(method: 'messages.receivedQueue', data: MessagesReceivedQueue, cb?: RequestResolver<string[]>): void;
  call(method: 'messages.reportEncryptedSpam', data: MessagesReportEncryptedSpam, cb?: RequestResolver<boolean>): void;
  call(method: 'upload.saveBigFilePart', data: UploadSaveBigFilePart, cb?: RequestResolver<boolean>): void;
  call(method: 'initConnection', data: InitConnection, cb?: RequestResolver<any>): void;
  call(method: 'help.getSupport', data: HelpGetSupport, cb?: RequestResolver<HelpSupport>): void;
  call(method: 'messages.readMessageContents', data: MessagesReadMessageContents, cb?: RequestResolver<MessagesAffectedMessages>): void;
  call(method: 'account.checkUsername', data: AccountCheckUsername, cb?: RequestResolver<boolean>): void;
  call(method: 'account.updateUsername', data: AccountUpdateUsername, cb?: RequestResolver<User>): void;
  call(method: 'contacts.search', data: ContactsSearch, cb?: RequestResolver<ContactsFound>): void;
  call(method: 'account.getPrivacy', data: AccountGetPrivacy, cb?: RequestResolver<AccountPrivacyRules>): void;
  call(method: 'account.setPrivacy', data: AccountSetPrivacy, cb?: RequestResolver<AccountPrivacyRules>): void;
  call(method: 'account.deleteAccount', data: AccountDeleteAccount, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getAccountTTL', data: AccountGetAccountTTL, cb?: RequestResolver<AccountDaysTTL>): void;
  call(method: 'account.setAccountTTL', data: AccountSetAccountTTL, cb?: RequestResolver<boolean>): void;
  call(method: 'invokeWithLayer', data: InvokeWithLayer, cb?: RequestResolver<any>): void;
  call(method: 'contacts.resolveUsername', data: ContactsResolveUsername, cb?: RequestResolver<ContactsResolvedPeer>): void;
  call(method: 'account.sendChangePhoneCode', data: AccountSendChangePhoneCode, cb?: RequestResolver<AuthSentCode>): void;
  call(method: 'account.changePhone', data: AccountChangePhone, cb?: RequestResolver<User>): void;
  call(method: 'messages.getStickers', data: MessagesGetStickers, cb?: RequestResolver<MessagesStickers>): void;
  call(method: 'messages.getAllStickers', data: MessagesGetAllStickers, cb?: RequestResolver<MessagesAllStickers>): void;
  call(method: 'account.updateDeviceLocked', data: AccountUpdateDeviceLocked, cb?: RequestResolver<boolean>): void;
  call(method: 'auth.importBotAuthorization', data: AuthImportBotAuthorization, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'messages.getWebPagePreview', data: MessagesGetWebPagePreview, cb?: RequestResolver<MessageMedia>): void;
  call(method: 'account.getAuthorizations', data: AccountGetAuthorizations, cb?: RequestResolver<AccountAuthorizations>): void;
  call(method: 'account.resetAuthorization', data: AccountResetAuthorization, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getPassword', data: AccountGetPassword, cb?: RequestResolver<AccountPassword>): void;
  call(method: 'account.getPasswordSettings', data: AccountGetPasswordSettings, cb?: RequestResolver<AccountPasswordSettings>): void;
  call(method: 'account.updatePasswordSettings', data: AccountUpdatePasswordSettings, cb?: RequestResolver<boolean>): void;
  call(method: 'auth.checkPassword', data: AuthCheckPassword, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'auth.requestPasswordRecovery', data: AuthRequestPasswordRecovery, cb?: RequestResolver<AuthPasswordRecovery>): void;
  call(method: 'auth.recoverPassword', data: AuthRecoverPassword, cb?: RequestResolver<AuthAuthorization>): void;
  call(method: 'invokeWithoutUpdates', data: InvokeWithoutUpdates, cb?: RequestResolver<any>): void;
  call(method: 'messages.exportChatInvite', data: MessagesExportChatInvite, cb?: RequestResolver<ExportedChatInvite>): void;
  call(method: 'messages.checkChatInvite', data: MessagesCheckChatInvite, cb?: RequestResolver<ChatInvite>): void;
  call(method: 'messages.importChatInvite', data: MessagesImportChatInvite, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getStickerSet', data: MessagesGetStickerSet, cb?: RequestResolver<MessagesStickerSet>): void;
  call(method: 'messages.installStickerSet', data: MessagesInstallStickerSet, cb?: RequestResolver<MessagesStickerSetInstallResult>): void;
  call(method: 'messages.uninstallStickerSet', data: MessagesUninstallStickerSet, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.startBot', data: MessagesStartBot, cb?: RequestResolver<Updates>): void;
  call(method: 'help.getAppChangelog', data: HelpGetAppChangelog, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getMessagesViews', data: MessagesGetMessagesViews, cb?: RequestResolver<number[]>): void;
  call(method: 'channels.readHistory', data: ChannelsReadHistory, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.deleteMessages', data: ChannelsDeleteMessages, cb?: RequestResolver<MessagesAffectedMessages>): void;
  call(method: 'channels.deleteUserHistory', data: ChannelsDeleteUserHistory, cb?: RequestResolver<MessagesAffectedHistory>): void;
  call(method: 'channels.reportSpam', data: ChannelsReportSpam, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.getMessages', data: ChannelsGetMessages, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'channels.getParticipants', data: ChannelsGetParticipants, cb?: RequestResolver<ChannelsChannelParticipants>): void;
  call(method: 'channels.getParticipant', data: ChannelsGetParticipant, cb?: RequestResolver<ChannelsChannelParticipant>): void;
  call(method: 'channels.getChannels', data: ChannelsGetChannels, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'channels.getFullChannel', data: ChannelsGetFullChannel, cb?: RequestResolver<MessagesChatFull>): void;
  call(method: 'channels.createChannel', data: ChannelsCreateChannel, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.editAdmin', data: ChannelsEditAdmin, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.editTitle', data: ChannelsEditTitle, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.editPhoto', data: ChannelsEditPhoto, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.checkUsername', data: ChannelsCheckUsername, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.updateUsername', data: ChannelsUpdateUsername, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.joinChannel', data: ChannelsJoinChannel, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.leaveChannel', data: ChannelsLeaveChannel, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.inviteToChannel', data: ChannelsInviteToChannel, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.deleteChannel', data: ChannelsDeleteChannel, cb?: RequestResolver<Updates>): void;
  call(method: 'updates.getChannelDifference', data: UpdatesGetChannelDifference, cb?: RequestResolver<UpdatesChannelDifference>): void;
  call(method: 'messages.editChatAdmin', data: MessagesEditChatAdmin, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.migrateChat', data: MessagesMigrateChat, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.searchGlobal', data: MessagesSearchGlobal, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.reorderStickerSets', data: MessagesReorderStickerSets, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getDocumentByHash', data: MessagesGetDocumentByHash, cb?: RequestResolver<Document>): void;
  call(method: 'messages.searchGifs', data: MessagesSearchGifs, cb?: RequestResolver<MessagesFoundGifs>): void;
  call(method: 'messages.getSavedGifs', data: MessagesGetSavedGifs, cb?: RequestResolver<MessagesSavedGifs>): void;
  call(method: 'messages.saveGif', data: MessagesSaveGif, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getInlineBotResults', data: MessagesGetInlineBotResults, cb?: RequestResolver<MessagesBotResults>): void;
  call(method: 'messages.setInlineBotResults', data: MessagesSetInlineBotResults, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.sendInlineBotResult', data: MessagesSendInlineBotResult, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.exportMessageLink', data: ChannelsExportMessageLink, cb?: RequestResolver<ExportedMessageLink>): void;
  call(method: 'channels.toggleSignatures', data: ChannelsToggleSignatures, cb?: RequestResolver<Updates>): void;
  call(method: 'auth.resendCode', data: AuthResendCode, cb?: RequestResolver<AuthSentCode>): void;
  call(method: 'auth.cancelCode', data: AuthCancelCode, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getMessageEditData', data: MessagesGetMessageEditData, cb?: RequestResolver<MessagesMessageEditData>): void;
  call(method: 'messages.editMessage', data: MessagesEditMessage, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.editInlineBotMessage', data: MessagesEditInlineBotMessage, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getBotCallbackAnswer', data: MessagesGetBotCallbackAnswer, cb?: RequestResolver<MessagesBotCallbackAnswer>): void;
  call(method: 'messages.setBotCallbackAnswer', data: MessagesSetBotCallbackAnswer, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.getTopPeers', data: ContactsGetTopPeers, cb?: RequestResolver<ContactsTopPeers>): void;
  call(method: 'contacts.resetTopPeerRating', data: ContactsResetTopPeerRating, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getPeerDialogs', data: MessagesGetPeerDialogs, cb?: RequestResolver<MessagesPeerDialogs>): void;
  call(method: 'messages.saveDraft', data: MessagesSaveDraft, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getAllDrafts', data: MessagesGetAllDrafts, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getFeaturedStickers', data: MessagesGetFeaturedStickers, cb?: RequestResolver<MessagesFeaturedStickers>): void;
  call(method: 'messages.readFeaturedStickers', data: MessagesReadFeaturedStickers, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getRecentStickers', data: MessagesGetRecentStickers, cb?: RequestResolver<MessagesRecentStickers>): void;
  call(method: 'messages.saveRecentSticker', data: MessagesSaveRecentSticker, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.clearRecentStickers', data: MessagesClearRecentStickers, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getArchivedStickers', data: MessagesGetArchivedStickers, cb?: RequestResolver<MessagesArchivedStickers>): void;
  call(method: 'account.sendConfirmPhoneCode', data: AccountSendConfirmPhoneCode, cb?: RequestResolver<AuthSentCode>): void;
  call(method: 'account.confirmPhone', data: AccountConfirmPhone, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.getAdminedPublicChannels', data: ChannelsGetAdminedPublicChannels, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'messages.getMaskStickers', data: MessagesGetMaskStickers, cb?: RequestResolver<MessagesAllStickers>): void;
  call(method: 'messages.getAttachedStickers', data: MessagesGetAttachedStickers, cb?: RequestResolver<StickerSetCovered[]>): void;
  call(method: 'auth.dropTempAuthKeys', data: AuthDropTempAuthKeys, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.setGameScore', data: MessagesSetGameScore, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.setInlineGameScore', data: MessagesSetInlineGameScore, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getGameHighScores', data: MessagesGetGameHighScores, cb?: RequestResolver<MessagesHighScores>): void;
  call(method: 'messages.getInlineGameHighScores', data: MessagesGetInlineGameHighScores, cb?: RequestResolver<MessagesHighScores>): void;
  call(method: 'messages.getCommonChats', data: MessagesGetCommonChats, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'messages.getAllChats', data: MessagesGetAllChats, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'help.setBotUpdatesStatus', data: HelpSetBotUpdatesStatus, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getWebPage', data: MessagesGetWebPage, cb?: RequestResolver<WebPage>): void;
  call(method: 'messages.toggleDialogPin', data: MessagesToggleDialogPin, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.reorderPinnedDialogs', data: MessagesReorderPinnedDialogs, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getPinnedDialogs', data: MessagesGetPinnedDialogs, cb?: RequestResolver<MessagesPeerDialogs>): void;
  call(method: 'bots.sendCustomRequest', data: BotsSendCustomRequest, cb?: RequestResolver<DataJSON>): void;
  call(method: 'bots.answerWebhookJSONQuery', data: BotsAnswerWebhookJSONQuery, cb?: RequestResolver<boolean>): void;
  call(method: 'upload.getWebFile', data: UploadGetWebFile, cb?: RequestResolver<UploadWebFile>): void;
  call(method: 'payments.getPaymentForm', data: PaymentsGetPaymentForm, cb?: RequestResolver<PaymentsPaymentForm>): void;
  call(method: 'payments.getPaymentReceipt', data: PaymentsGetPaymentReceipt, cb?: RequestResolver<PaymentsPaymentReceipt>): void;
  call(method: 'payments.validateRequestedInfo', data: PaymentsValidateRequestedInfo, cb?: RequestResolver<PaymentsValidatedRequestedInfo>): void;
  call(method: 'payments.sendPaymentForm', data: PaymentsSendPaymentForm, cb?: RequestResolver<PaymentsPaymentResult>): void;
  call(method: 'account.getTmpPassword', data: AccountGetTmpPassword, cb?: RequestResolver<AccountTmpPassword>): void;
  call(method: 'payments.getSavedInfo', data: PaymentsGetSavedInfo, cb?: RequestResolver<PaymentsSavedInfo>): void;
  call(method: 'payments.clearSavedInfo', data: PaymentsClearSavedInfo, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.setBotShippingResults', data: MessagesSetBotShippingResults, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.setBotPrecheckoutResults', data: MessagesSetBotPrecheckoutResults, cb?: RequestResolver<boolean>): void;
  call(method: 'stickers.createStickerSet', data: StickersCreateStickerSet, cb?: RequestResolver<MessagesStickerSet>): void;
  call(method: 'stickers.removeStickerFromSet', data: StickersRemoveStickerFromSet, cb?: RequestResolver<MessagesStickerSet>): void;
  call(method: 'stickers.changeStickerPosition', data: StickersChangeStickerPosition, cb?: RequestResolver<MessagesStickerSet>): void;
  call(method: 'stickers.addStickerToSet', data: StickersAddStickerToSet, cb?: RequestResolver<MessagesStickerSet>): void;
  call(method: 'messages.uploadMedia', data: MessagesUploadMedia, cb?: RequestResolver<MessageMedia>): void;
  call(method: 'phone.getCallConfig', data: PhoneGetCallConfig, cb?: RequestResolver<DataJSON>): void;
  call(method: 'phone.requestCall', data: PhoneRequestCall, cb?: RequestResolver<PhonePhoneCall>): void;
  call(method: 'phone.acceptCall', data: PhoneAcceptCall, cb?: RequestResolver<PhonePhoneCall>): void;
  call(method: 'phone.confirmCall', data: PhoneConfirmCall, cb?: RequestResolver<PhonePhoneCall>): void;
  call(method: 'phone.receivedCall', data: PhoneReceivedCall, cb?: RequestResolver<boolean>): void;
  call(method: 'phone.discardCall', data: PhoneDiscardCall, cb?: RequestResolver<Updates>): void;
  call(method: 'phone.setCallRating', data: PhoneSetCallRating, cb?: RequestResolver<Updates>): void;
  call(method: 'phone.saveCallDebug', data: PhoneSaveCallDebug, cb?: RequestResolver<boolean>): void;
  call(method: 'upload.getCdnFile', data: UploadGetCdnFile, cb?: RequestResolver<UploadCdnFile>): void;
  call(method: 'upload.reuploadCdnFile', data: UploadReuploadCdnFile, cb?: RequestResolver<FileHash[]>): void;
  call(method: 'help.getCdnConfig', data: HelpGetCdnConfig, cb?: RequestResolver<CdnConfig>): void;
  call(method: 'langpack.getLangPack', data: LangpackGetLangPack, cb?: RequestResolver<LangPackDifference>): void;
  call(method: 'langpack.getStrings', data: LangpackGetStrings, cb?: RequestResolver<LangPackString[]>): void;
  call(method: 'langpack.getDifference', data: LangpackGetDifference, cb?: RequestResolver<LangPackDifference>): void;
  call(method: 'langpack.getLanguages', data: LangpackGetLanguages, cb?: RequestResolver<LangPackLanguage[]>): void;
  call(method: 'channels.editBanned', data: ChannelsEditBanned, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.getAdminLog', data: ChannelsGetAdminLog, cb?: RequestResolver<ChannelsAdminLogResults>): void;
  call(method: 'upload.getCdnFileHashes', data: UploadGetCdnFileHashes, cb?: RequestResolver<FileHash[]>): void;
  call(method: 'messages.sendScreenshotNotification', data: MessagesSendScreenshotNotification, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.setStickers', data: ChannelsSetStickers, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getFavedStickers', data: MessagesGetFavedStickers, cb?: RequestResolver<MessagesFavedStickers>): void;
  call(method: 'messages.faveSticker', data: MessagesFaveSticker, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.readMessageContents', data: ChannelsReadMessageContents, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.resetSaved', data: ContactsResetSaved, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getUnreadMentions', data: MessagesGetUnreadMentions, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'channels.deleteHistory', data: ChannelsDeleteHistory, cb?: RequestResolver<boolean>): void;
  call(method: 'help.getRecentMeUrls', data: HelpGetRecentMeUrls, cb?: RequestResolver<HelpRecentMeUrls>): void;
  call(method: 'channels.togglePreHistoryHidden', data: ChannelsTogglePreHistoryHidden, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.readMentions', data: MessagesReadMentions, cb?: RequestResolver<MessagesAffectedHistory>): void;
  call(method: 'messages.getRecentLocations', data: MessagesGetRecentLocations, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.sendMultiMedia', data: MessagesSendMultiMedia, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.uploadEncryptedFile', data: MessagesUploadEncryptedFile, cb?: RequestResolver<EncryptedFile>): void;
  call(method: 'account.getWebAuthorizations', data: AccountGetWebAuthorizations, cb?: RequestResolver<AccountWebAuthorizations>): void;
  call(method: 'account.resetWebAuthorization', data: AccountResetWebAuthorization, cb?: RequestResolver<boolean>): void;
  call(method: 'account.resetWebAuthorizations', data: AccountResetWebAuthorizations, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.searchStickerSets', data: MessagesSearchStickerSets, cb?: RequestResolver<MessagesFoundStickerSets>): void;
  call(method: 'upload.getFileHashes', data: UploadGetFileHashes, cb?: RequestResolver<FileHash[]>): void;
  call(method: 'help.getProxyData', data: HelpGetProxyData, cb?: RequestResolver<HelpProxyData>): void;
  call(method: 'help.getTermsOfServiceUpdate', data: HelpGetTermsOfServiceUpdate, cb?: RequestResolver<HelpTermsOfServiceUpdate>): void;
  call(method: 'help.acceptTermsOfService', data: HelpAcceptTermsOfService, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getAllSecureValues', data: AccountGetAllSecureValues, cb?: RequestResolver<SecureValue[]>): void;
  call(method: 'account.getSecureValue', data: AccountGetSecureValue, cb?: RequestResolver<SecureValue[]>): void;
  call(method: 'account.saveSecureValue', data: AccountSaveSecureValue, cb?: RequestResolver<SecureValue>): void;
  call(method: 'account.deleteSecureValue', data: AccountDeleteSecureValue, cb?: RequestResolver<boolean>): void;
  call(method: 'users.setSecureValueErrors', data: UsersSetSecureValueErrors, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getAuthorizationForm', data: AccountGetAuthorizationForm, cb?: RequestResolver<AccountAuthorizationForm>): void;
  call(method: 'account.acceptAuthorization', data: AccountAcceptAuthorization, cb?: RequestResolver<boolean>): void;
  call(method: 'account.sendVerifyPhoneCode', data: AccountSendVerifyPhoneCode, cb?: RequestResolver<AuthSentCode>): void;
  call(method: 'account.verifyPhone', data: AccountVerifyPhone, cb?: RequestResolver<boolean>): void;
  call(method: 'account.sendVerifyEmailCode', data: AccountSendVerifyEmailCode, cb?: RequestResolver<AccountSentEmailCode>): void;
  call(method: 'account.verifyEmail', data: AccountVerifyEmail, cb?: RequestResolver<boolean>): void;
  call(method: 'help.getDeepLinkInfo', data: HelpGetDeepLinkInfo, cb?: RequestResolver<HelpDeepLinkInfo>): void;
  call(method: 'contacts.getSaved', data: ContactsGetSaved, cb?: RequestResolver<SavedContact[]>): void;
  call(method: 'channels.getLeftChannels', data: ChannelsGetLeftChannels, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'account.initTakeoutSession', data: AccountInitTakeoutSession, cb?: RequestResolver<AccountTakeout>): void;
  call(method: 'account.finishTakeoutSession', data: AccountFinishTakeoutSession, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getSplitRanges', data: MessagesGetSplitRanges, cb?: RequestResolver<MessageRange[]>): void;
  call(method: 'invokeWithMessagesRange', data: InvokeWithMessagesRange, cb?: RequestResolver<any>): void;
  call(method: 'invokeWithTakeout', data: InvokeWithTakeout, cb?: RequestResolver<any>): void;
  call(method: 'messages.markDialogUnread', data: MessagesMarkDialogUnread, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getDialogUnreadMarks', data: MessagesGetDialogUnreadMarks, cb?: RequestResolver<DialogPeer[]>): void;
  call(method: 'contacts.toggleTopPeers', data: ContactsToggleTopPeers, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.clearAllDrafts', data: MessagesClearAllDrafts, cb?: RequestResolver<boolean>): void;
  call(method: 'help.getAppConfig', data: HelpGetAppConfig, cb?: RequestResolver<JSONValue>): void;
  call(method: 'help.saveAppLog', data: HelpSaveAppLog, cb?: RequestResolver<boolean>): void;
  call(method: 'help.getPassportConfig', data: HelpGetPassportConfig, cb?: RequestResolver<HelpPassportConfig>): void;
  call(method: 'langpack.getLanguage', data: LangpackGetLanguage, cb?: RequestResolver<LangPackLanguage>): void;
  call(method: 'messages.updatePinnedMessage', data: MessagesUpdatePinnedMessage, cb?: RequestResolver<Updates>): void;
  call(method: 'account.confirmPasswordEmail', data: AccountConfirmPasswordEmail, cb?: RequestResolver<boolean>): void;
  call(method: 'account.resendPasswordEmail', data: AccountResendPasswordEmail, cb?: RequestResolver<boolean>): void;
  call(method: 'account.cancelPasswordEmail', data: AccountCancelPasswordEmail, cb?: RequestResolver<boolean>): void;
  call(method: 'help.getSupportName', data: HelpGetSupportName, cb?: RequestResolver<HelpSupportName>): void;
  call(method: 'help.getUserInfo', data: HelpGetUserInfo, cb?: RequestResolver<HelpUserInfo>): void;
  call(method: 'help.editUserInfo', data: HelpEditUserInfo, cb?: RequestResolver<HelpUserInfo>): void;
  call(method: 'account.getContactSignUpNotification', data: AccountGetContactSignUpNotification, cb?: RequestResolver<boolean>): void;
  call(method: 'account.setContactSignUpNotification', data: AccountSetContactSignUpNotification, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getNotifyExceptions', data: AccountGetNotifyExceptions, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.sendVote', data: MessagesSendVote, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getPollResults', data: MessagesGetPollResults, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getOnlines', data: MessagesGetOnlines, cb?: RequestResolver<ChatOnlines>): void;
  call(method: 'messages.getStatsURL', data: MessagesGetStatsURL, cb?: RequestResolver<StatsURL>): void;
  call(method: 'messages.editChatAbout', data: MessagesEditChatAbout, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.editChatDefaultBannedRights', data: MessagesEditChatDefaultBannedRights, cb?: RequestResolver<Updates>): void;
  call(method: 'account.getWallPaper', data: AccountGetWallPaper, cb?: RequestResolver<WallPaper>): void;
  call(method: 'account.uploadWallPaper', data: AccountUploadWallPaper, cb?: RequestResolver<WallPaper>): void;
  call(method: 'account.saveWallPaper', data: AccountSaveWallPaper, cb?: RequestResolver<boolean>): void;
  call(method: 'account.installWallPaper', data: AccountInstallWallPaper, cb?: RequestResolver<boolean>): void;
  call(method: 'account.resetWallPapers', data: AccountResetWallPapers, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getAutoDownloadSettings', data: AccountGetAutoDownloadSettings, cb?: RequestResolver<AccountAutoDownloadSettings>): void;
  call(method: 'account.saveAutoDownloadSettings', data: AccountSaveAutoDownloadSettings, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.getEmojiKeywords', data: MessagesGetEmojiKeywords, cb?: RequestResolver<EmojiKeywordsDifference>): void;
  call(method: 'messages.getEmojiKeywordsDifference', data: MessagesGetEmojiKeywordsDifference, cb?: RequestResolver<EmojiKeywordsDifference>): void;
  call(method: 'messages.getEmojiKeywordsLanguages', data: MessagesGetEmojiKeywordsLanguages, cb?: RequestResolver<EmojiLanguage[]>): void;
  call(method: 'messages.getEmojiURL', data: MessagesGetEmojiURL, cb?: RequestResolver<EmojiURL>): void;
  call(method: 'folders.editPeerFolders', data: FoldersEditPeerFolders, cb?: RequestResolver<Updates>): void;
  call(method: 'folders.deleteFolder', data: FoldersDeleteFolder, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getSearchCounters', data: MessagesGetSearchCounters, cb?: RequestResolver<MessagesSearchCounter[]>): void;
  call(method: 'channels.getGroupsForDiscussion', data: ChannelsGetGroupsForDiscussion, cb?: RequestResolver<MessagesChats>): void;
  call(method: 'channels.setDiscussionGroup', data: ChannelsSetDiscussionGroup, cb?: RequestResolver<boolean>): void;
  call(method: 'messages.requestUrlAuth', data: MessagesRequestUrlAuth, cb?: RequestResolver<UrlAuthResult>): void;
  call(method: 'messages.acceptUrlAuth', data: MessagesAcceptUrlAuth, cb?: RequestResolver<UrlAuthResult>): void;
  call(method: 'messages.hidePeerSettingsBar', data: MessagesHidePeerSettingsBar, cb?: RequestResolver<boolean>): void;
  call(method: 'contacts.addContact', data: ContactsAddContact, cb?: RequestResolver<Updates>): void;
  call(method: 'contacts.acceptContact', data: ContactsAcceptContact, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.editCreator', data: ChannelsEditCreator, cb?: RequestResolver<Updates>): void;
  call(method: 'contacts.getLocated', data: ContactsGetLocated, cb?: RequestResolver<Updates>): void;
  call(method: 'channels.editLocation', data: ChannelsEditLocation, cb?: RequestResolver<boolean>): void;
  call(method: 'channels.toggleSlowMode', data: ChannelsToggleSlowMode, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.getScheduledHistory', data: MessagesGetScheduledHistory, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.getScheduledMessages', data: MessagesGetScheduledMessages, cb?: RequestResolver<MessagesMessages>): void;
  call(method: 'messages.sendScheduledMessages', data: MessagesSendScheduledMessages, cb?: RequestResolver<Updates>): void;
  call(method: 'messages.deleteScheduledMessages', data: MessagesDeleteScheduledMessages, cb?: RequestResolver<Updates>): void;
  call(method: 'account.uploadTheme', data: AccountUploadTheme, cb?: RequestResolver<Document>): void;
  call(method: 'account.createTheme', data: AccountCreateTheme, cb?: RequestResolver<Theme>): void;
  call(method: 'account.updateTheme', data: AccountUpdateTheme, cb?: RequestResolver<Theme>): void;
  call(method: 'account.saveTheme', data: AccountSaveTheme, cb?: RequestResolver<boolean>): void;
  call(method: 'account.installTheme', data: AccountInstallTheme, cb?: RequestResolver<boolean>): void;
  call(method: 'account.getTheme', data: AccountGetTheme, cb?: RequestResolver<Theme>): void;
  call(method: 'account.getThemes', data: AccountGetThemes, cb?: RequestResolver<AccountThemes>): void;

  updates: {
    on(predicate: 'updateNewMessage', cb: UpdateResolver<Update.updateNewMessage>): void;
    on(predicate: 'updateMessageID', cb: UpdateResolver<Update.updateMessageID>): void;
    on(predicate: 'updateDeleteMessages', cb: UpdateResolver<Update.updateDeleteMessages>): void;
    on(predicate: 'updateUserTyping', cb: UpdateResolver<Update.updateUserTyping>): void;
    on(predicate: 'updateChatUserTyping', cb: UpdateResolver<Update.updateChatUserTyping>): void;
    on(predicate: 'updateChatParticipants', cb: UpdateResolver<Update.updateChatParticipants>): void;
    on(predicate: 'updateUserStatus', cb: UpdateResolver<Update.updateUserStatus>): void;
    on(predicate: 'updateUserName', cb: UpdateResolver<Update.updateUserName>): void;
    on(predicate: 'updateUserPhoto', cb: UpdateResolver<Update.updateUserPhoto>): void;
    on(predicate: 'updateNewEncryptedMessage', cb: UpdateResolver<Update.updateNewEncryptedMessage>): void;
    on(predicate: 'updateEncryptedChatTyping', cb: UpdateResolver<Update.updateEncryptedChatTyping>): void;
    on(predicate: 'updateEncryption', cb: UpdateResolver<Update.updateEncryption>): void;
    on(predicate: 'updateEncryptedMessagesRead', cb: UpdateResolver<Update.updateEncryptedMessagesRead>): void;
    on(predicate: 'updateChatParticipantAdd', cb: UpdateResolver<Update.updateChatParticipantAdd>): void;
    on(predicate: 'updateChatParticipantDelete', cb: UpdateResolver<Update.updateChatParticipantDelete>): void;
    on(predicate: 'updateDcOptions', cb: UpdateResolver<Update.updateDcOptions>): void;
    on(predicate: 'updateUserBlocked', cb: UpdateResolver<Update.updateUserBlocked>): void;
    on(predicate: 'updateNotifySettings', cb: UpdateResolver<Update.updateNotifySettings>): void;
    on(predicate: 'updateServiceNotification', cb: UpdateResolver<Update.updateServiceNotification>): void;
    on(predicate: 'updatePrivacy', cb: UpdateResolver<Update.updatePrivacy>): void;
    on(predicate: 'updateUserPhone', cb: UpdateResolver<Update.updateUserPhone>): void;
    on(predicate: 'updateReadHistoryInbox', cb: UpdateResolver<Update.updateReadHistoryInbox>): void;
    on(predicate: 'updateReadHistoryOutbox', cb: UpdateResolver<Update.updateReadHistoryOutbox>): void;
    on(predicate: 'updateWebPage', cb: UpdateResolver<Update.updateWebPage>): void;
    on(predicate: 'updateReadMessagesContents', cb: UpdateResolver<Update.updateReadMessagesContents>): void;
    on(predicate: 'updateChannelTooLong', cb: UpdateResolver<Update.updateChannelTooLong>): void;
    on(predicate: 'updateChannel', cb: UpdateResolver<Update.updateChannel>): void;
    on(predicate: 'updateNewChannelMessage', cb: UpdateResolver<Update.updateNewChannelMessage>): void;
    on(predicate: 'updateReadChannelInbox', cb: UpdateResolver<Update.updateReadChannelInbox>): void;
    on(predicate: 'updateDeleteChannelMessages', cb: UpdateResolver<Update.updateDeleteChannelMessages>): void;
    on(predicate: 'updateChannelMessageViews', cb: UpdateResolver<Update.updateChannelMessageViews>): void;
    on(predicate: 'updateChatParticipantAdmin', cb: UpdateResolver<Update.updateChatParticipantAdmin>): void;
    on(predicate: 'updateNewStickerSet', cb: UpdateResolver<Update.updateNewStickerSet>): void;
    on(predicate: 'updateStickerSetsOrder', cb: UpdateResolver<Update.updateStickerSetsOrder>): void;
    on(predicate: 'updateStickerSets', cb: UpdateResolver<Update.updateStickerSets>): void;
    on(predicate: 'updateSavedGifs', cb: UpdateResolver<Update.updateSavedGifs>): void;
    on(predicate: 'updateBotInlineQuery', cb: UpdateResolver<Update.updateBotInlineQuery>): void;
    on(predicate: 'updateBotInlineSend', cb: UpdateResolver<Update.updateBotInlineSend>): void;
    on(predicate: 'updateEditChannelMessage', cb: UpdateResolver<Update.updateEditChannelMessage>): void;
    on(predicate: 'updateChannelPinnedMessage', cb: UpdateResolver<Update.updateChannelPinnedMessage>): void;
    on(predicate: 'updateBotCallbackQuery', cb: UpdateResolver<Update.updateBotCallbackQuery>): void;
    on(predicate: 'updateEditMessage', cb: UpdateResolver<Update.updateEditMessage>): void;
    on(predicate: 'updateInlineBotCallbackQuery', cb: UpdateResolver<Update.updateInlineBotCallbackQuery>): void;
    on(predicate: 'updateReadChannelOutbox', cb: UpdateResolver<Update.updateReadChannelOutbox>): void;
    on(predicate: 'updateDraftMessage', cb: UpdateResolver<Update.updateDraftMessage>): void;
    on(predicate: 'updateReadFeaturedStickers', cb: UpdateResolver<Update.updateReadFeaturedStickers>): void;
    on(predicate: 'updateRecentStickers', cb: UpdateResolver<Update.updateRecentStickers>): void;
    on(predicate: 'updateConfig', cb: UpdateResolver<Update.updateConfig>): void;
    on(predicate: 'updatePtsChanged', cb: UpdateResolver<Update.updatePtsChanged>): void;
    on(predicate: 'updateChannelWebPage', cb: UpdateResolver<Update.updateChannelWebPage>): void;
    on(predicate: 'updateDialogPinned', cb: UpdateResolver<Update.updateDialogPinned>): void;
    on(predicate: 'updatePinnedDialogs', cb: UpdateResolver<Update.updatePinnedDialogs>): void;
    on(predicate: 'updateBotWebhookJSON', cb: UpdateResolver<Update.updateBotWebhookJSON>): void;
    on(predicate: 'updateBotWebhookJSONQuery', cb: UpdateResolver<Update.updateBotWebhookJSONQuery>): void;
    on(predicate: 'updateBotShippingQuery', cb: UpdateResolver<Update.updateBotShippingQuery>): void;
    on(predicate: 'updateBotPrecheckoutQuery', cb: UpdateResolver<Update.updateBotPrecheckoutQuery>): void;
    on(predicate: 'updatePhoneCall', cb: UpdateResolver<Update.updatePhoneCall>): void;
    on(predicate: 'updateLangPackTooLong', cb: UpdateResolver<Update.updateLangPackTooLong>): void;
    on(predicate: 'updateLangPack', cb: UpdateResolver<Update.updateLangPack>): void;
    on(predicate: 'updateFavedStickers', cb: UpdateResolver<Update.updateFavedStickers>): void;
    on(predicate: 'updateChannelReadMessagesContents', cb: UpdateResolver<Update.updateChannelReadMessagesContents>): void;
    on(predicate: 'updateContactsReset', cb: UpdateResolver<Update.updateContactsReset>): void;
    on(predicate: 'updateChannelAvailableMessages', cb: UpdateResolver<Update.updateChannelAvailableMessages>): void;
    on(predicate: 'updateDialogUnreadMark', cb: UpdateResolver<Update.updateDialogUnreadMark>): void;
    on(predicate: 'updateUserPinnedMessage', cb: UpdateResolver<Update.updateUserPinnedMessage>): void;
    on(predicate: 'updateChatPinnedMessage', cb: UpdateResolver<Update.updateChatPinnedMessage>): void;
    on(predicate: 'updateMessagePoll', cb: UpdateResolver<Update.updateMessagePoll>): void;
    on(predicate: 'updateChatDefaultBannedRights', cb: UpdateResolver<Update.updateChatDefaultBannedRights>): void;
    on(predicate: 'updateFolderPeers', cb: UpdateResolver<Update.updateFolderPeers>): void;
    on(predicate: 'updatePeerSettings', cb: UpdateResolver<Update.updatePeerSettings>): void;
    on(predicate: 'updatePeerLocated', cb: UpdateResolver<Update.updatePeerLocated>): void;
    on(predicate: 'updateNewScheduledMessage', cb: UpdateResolver<Update.updateNewScheduledMessage>): void;
    on(predicate: 'updateDeleteScheduledMessages', cb: UpdateResolver<Update.updateDeleteScheduledMessages>): void;
    on(predicate: 'updateTheme', cb: UpdateResolver<Update.updateTheme>): void;
    on(predicate: 'updatesTooLong', cb: UpdateResolver<Updates.updatesTooLong>): void;
    on(predicate: 'updateShortMessage', cb: UpdateResolver<Updates.updateShortMessage>): void;
    on(predicate: 'updateShortChatMessage', cb: UpdateResolver<Updates.updateShortChatMessage>): void;
    on(predicate: 'updateShort', cb: UpdateResolver<Updates.updateShort>): void;
    on(predicate: 'updatesCombined', cb: UpdateResolver<Updates.updatesCombined>): void;
    on(predicate: 'updates', cb: UpdateResolver<Updates.updates>): void;
    on(predicate: 'updateShortSentMessage', cb: UpdateResolver<Updates.updateShortSentMessage>): void;
    on(predicate: 'userEmpty', cb: UpdateResolver<User.userEmpty>): void;
    on(predicate: 'user', cb: UpdateResolver<User.user>): void;
    on(predicate: 'chatEmpty', cb: UpdateResolver<Chat.chatEmpty>): void;
    on(predicate: 'chat', cb: UpdateResolver<Chat.chat>): void;
    on(predicate: 'chatForbidden', cb: UpdateResolver<Chat.chatForbidden>): void;
    on(predicate: 'channel', cb: UpdateResolver<Chat.channel>): void;
    on(predicate: 'channelForbidden', cb: UpdateResolver<Chat.channelForbidden>): void;
  }
}
