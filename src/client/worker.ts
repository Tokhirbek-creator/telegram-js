/* eslint-disable no-restricted-globals */

import { inflate } from 'pako/lib/inflate';
import { Client, TypeLanguage, TLConstructor, Bytes } from '../../packages/mtproto-js/src';
import { API_ID, API_HASH, APP_VERSION } from '../const/api';
import { WorkerMessage, ClientError } from './worker.types';
import { UploadFile } from '../cache/types';
import { typeToMime, hexToBlob } from '../helpers/files';
import schema from './layer105.json';

/**
 * Vars
 */
let client: Client | undefined;

// Worker context
const ctx: Worker = self as any;

// Pending tasks
const pending: WorkerMessage[] = [];

/**
 * Resolve worker task
 */
function resolve(id: string, type: string, payload: any) {
  ctx.postMessage({ id, type, payload } as WorkerMessage);
}

/**
 * Send event
 */
function send(type: string, payload: any) {
  ctx.postMessage({ type, payload } as WorkerMessage);
}

/**
 * Resolve update
 */
function resolveUpdate(id: string, update: any) {
  ctx.postMessage({ id, type: 'update', payload: update } as WorkerMessage);
}

const fileCache: Record<string, any> = {};

/**
 * File managers: getFile method
 */
function downloadFilePart(
  location: any, cb: (f: string) => void, dc: number = client!.cfg.dc, mime = '', offset = 0, limit = 512 * 1024, parts = '',
) {
  if (!client) throw new Error('Client is undefined');

  const cacheKey = JSON.stringify(location);

  if (fileCache[cacheKey]) {
    cb(fileCache[cacheKey]);
    return;
  }

  client.call('upload.getFile', { location, offset, limit }, { dc, thread: 2 }, (err, result) => {
    // redirect to another dc
    if (err && err.message && err.message.indexOf('FILE_MIGRATE_') > -1) {
      downloadFilePart(location, cb, +err.message.slice(-1), mime, offset, limit, parts);
      return;
    }

    // todo handling errors
    if (err) {
      throw new Error(JSON.stringify(err));
      return;
    }

    if (!err && result) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      processFilePart(location, result, mime, dc, offset, limit, parts, cb);
    }
  });
}

/**
 * File part processor
 */
function processFilePart(
  location: any, file: UploadFile, imime: string, dc: number, offset: number, limit: number, parts: string, cb: (url: string) => void,
) {
  // todo load parts
  if (file.bytes.length / 2 === limit) {
    downloadFilePart(location, cb, dc, imime, offset + 4096, limit, parts + file.bytes);
    return;
  }

  const mime = imime || typeToMime(file.type);
  const blob = hexToBlob(file.bytes, mime);
  const url = (URL || webkitURL).createObjectURL(blob);

  fileCache[JSON.stringify(location)] = url;
  cb(url);
}

const pendingFiles: Record<string, {
  data: Bytes,
  size: number,
  name: string,
  partSize: number,
  total: number,
  big: boolean,
}> = {};
const reader = new FileReaderSync();
/**
 * File managers: saveFilePart
 */
function saveFilePart(id: string, part: number, cb: () => void) {
  if (!client) throw new Error('Client is undefined');
  if (!pendingFiles[id]) return;

  const uploaded = pendingFiles[id].partSize * part;
  const remaining = Math.min(pendingFiles[id].partSize, pendingFiles[id].size - uploaded);

  const payload = {
    file_id: id,
    file_part: part,
    bytes: pendingFiles[id].data.slice(uploaded, uploaded + remaining).hex,
  };

  client.call(pendingFiles[id].big ? 'upload.saveFilePartBig' : 'upload.saveFilePart', payload, { thread: 2 }, (err, res) => {
    if (err || !res) throw new Error(`Error while uploadig file: ${JSON.stringify(err)}`);

    send('upload_progress', { id, uploaded: uploaded + remaining, total: pendingFiles[id].size });

    if (part < pendingFiles[id].total - 1) saveFilePart(id, part + 1, cb);
    else cb();
  });
}

function uploadFile(id: string, file: File) {
  let partSize = 262144; // 256 Kb

  if (file.size > 67108864) {
    partSize = 524288;
  } else if (file.size < 102400) {
    partSize = 32768;
  }

  pendingFiles[id] = {
    data: new Bytes(reader.readAsArrayBuffer(file)),
    size: file.size,
    name: file.name,
    partSize, // 256kb
    total: Math.ceil(file.size / partSize),
    big: file.size > 1024 * 1024 * 10,
  };

  saveFilePart(id, 0, () => {
    const inputFile = {
      _: pendingFiles[id].big ? 'inputFileBig' : 'inputFile',
      id,
      parts: pendingFiles[id].total,
      name: pendingFiles[id].name,
    };

    send('upload_ready', { id, inputFile });
  });
}

/**
 * Process worker message
 */
function process(message: WorkerMessage) {
  const { payload, type, id } = message;

  if (type === 'init') {
    const tl = new TypeLanguage(schema);
    client = new Client(tl, {
      ssl: true,
      protocol: 'intermediate',
      transport: 'websocket',

      APILayer: 105,
      APIID: API_ID,
      APIHash: API_HASH,

      deviceModel: 'test',
      systemVersion: 'test',
      appVersion: APP_VERSION,
      langCode: 'en',
      ...payload,
    });

    // Broadcast meta changes
    client.on('metaChanged', (newMeta: any) => {
      resolve('', 'meta', newMeta);
    });

    // Broadcast network changes
    client.on('networkChanged', (state: any) => {
      resolve('', 'network', state);
    });

    client.updates.fetch();

    while (pending.length > 0) {
      process(pending.shift()!);
    }
  }

  if (!client) {
    if (type !== 'init') pending.push(message);
    return;
  }

  switch (type) {
    case 'init': {
      break;
    }

    case 'windowEvent': {
      // todo: check support
      const event = new Event(payload);
      self.dispatchEvent(event);

      break;
    }

    case 'call': {
      client.call(
        payload.method,
        payload.params,
        payload.headers,
        (err: ClientError, result?: TLConstructor) => resolve(id, type, { err, result }),
      );

      break;
    }

    case 'update': {
      client.updates.on(id, (update) => resolveUpdate(id, update));
      break;
    }

    case 'password_kdf': {
      client.getPasswordKdfAsync(payload.algo, payload.password, (srp_hash: any) => {
        resolve(id, type, srp_hash);
      });
      break;
    }

    case 'switch_dc': {
      client.cfg.dc = +payload;
      break;
    }

    case 'authorize': {
      client.authorize(payload, (key) => {
        resolve(id, type, key);
      });
      break;
    }

    case 'get_file': {
      downloadFilePart(payload.location, (url) => {
        resolve(id, type, url);
      }, payload.dc, payload.mime);
      break;
    }

    case 'ungzip': {
      resolve(id, type, inflate(payload, { to: 'string' }));
      break;
    }

    case 'upload_file': {
      uploadFile(payload.id, payload.file);
      break;
    }

    default: {
      throw new Error(`Unknown task: ${type}`);
    }
  }
}


// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    process(event.data);
  }
});

/* For jest testing */
export default class WorkerMock {
  onmessage: undefined | ((event: MessageEvent) => void);

  // eslint-disable-next-line
  constructor() {}

  // eslint-disable-next-line
  postMessage(_msg: any): void {};
}
