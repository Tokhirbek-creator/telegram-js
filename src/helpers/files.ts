import { StorageFileType, Document, InputFileLocation, DocumentAttributeSticker } from 'cache/types';

export function hexToStr(hex: string): string {
  let str = '';

  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(+`0x${hex.slice(i, i + 2)}`);
  }

  return str;
}

export function strToBlob(str: string, type: string) {
  const buf = new Uint8Array(str.length);

  for (let i = 0; i < str.length; i += 1) {
    buf[i] = str.charCodeAt(i);
  }

  return new Blob([buf], { type });
}

export function hexToBlob(str: string, type: string) {
  const buf = new Uint8Array(str.length / 2);

  for (let i = 0; i < str.length; i += 2) {
    buf[i / 2] = +`0x${str.slice(i, i + 2)}`;
  }

  return new Blob([buf], { type });
}

export function blobToUrl(blob: Blob) {
  return (URL || webkitURL).createObjectURL(blob);
}

export function typeToMime(type: StorageFileType) {
  switch (type._) {
    case 'storage.fileJpeg': return 'image/jpeg';
    case 'storage.filePng': return 'image/png';
    default: return 'image/jpeg';
  }
}

export function locationToString(location: InputFileLocation): string {
  switch (location._) {
    case 'inputPeerPhotoFileLocation':
      return `profile_${location.local_id}_${location.volume_id}`;

    case 'inputPhotoFileLocation':
      return `photo_${location.file_reference}`;

    default:
      throw new Error(`No location hash value for ${location._}`);
  }
}

export function getDocumentLocation(document: Document, size: string = 'y'): InputFileLocation {
  return {
    _: 'inputDocumentFileLocation',
    id: document.id,
    access_hash: document.access_hash,
    file_reference: document.file_reference,
    thumb_size: size,
  };
}

export function getAttributeSticker(document: Document): DocumentAttributeSticker | null {
  for (let i = 0; i < document.attributes.length; i += 1) {
    const attr = document.attributes[i];
    if (attr._ === 'documentAttributeSticker') return attr;
  }

  return null;
}
