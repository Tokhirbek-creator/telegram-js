import ClientWorker from './worker';
import { WorkerMessage, ClientError } from './worker.types';
import { InputFile } from '../cache/types';

/**
 * Worker callbacks
 */
type RequestResolver = (err: ClientError | null, res?: any) => void;
type UpdateResolver = (res?: any) => void;
type AnyResolver = (...payload: unknown[]) => void;
type EventResolver = (event: any) => void;
export type UploadResolver = (input: InputFile) => void;
export type UploadProgressResolver = (uploaded: number, total: number) => void;
export type DownloadOptions = { dc_id?: number, mime_type?: string, size: number };
export type DownloadResolver = (url: string) => void;
export type DownloadProgressResolver = (downloaded: number, total: number) => void;

let saveMetaField = 'meta';
let test = false;

if (document.location.search.indexOf('test') !== -1) {
  test = true;
}

if (test) saveMetaField = 'metatest';
/**
 * Vars
 */
const worker = new ClientWorker();
const requests: Record<string, RequestResolver> = {};
const queue: Record<string, AnyResolver> = {};
const updates: Record<string, UpdateResolver[]> = {};
const eventListeners: Record<string, EventResolver[]> = {};
const clientDebug = localStorage.getItem('debugmt') || document.location.search.indexOf('debug') !== -1;
const dc = +localStorage.getItem('dc')! || 2;
const svc = {
  test,
  baseDC: dc,
  meta: JSON.parse(localStorage.getItem(saveMetaField) || '{}'),
};

export const uploadingFiles: Record<string, { ready: UploadResolver, progress?: UploadProgressResolver }> = {};
export const downloadingFiles: Record<string, { ready: DownloadResolver, progress?: DownloadProgressResolver }> = {};

/**
 * Init client
 */
worker.postMessage({
  id: '',
  type: 'init',
  payload: {
    dc,
    test: svc.test,
    debug: clientDebug,
    meta: svc.meta,
  },
} as WorkerMessage);

/**
 * Pass online / offline events
 */
window.addEventListener('online', () => worker.postMessage({ type: 'windowEvent', payload: 'online' }));
window.addEventListener('offline', () => worker.postMessage({ type: 'windowEvent', payload: 'offline' }));

/**
 * Make RPC API request
 */
function call(method: string, data: Record<string, any>, cb?: RequestResolver): void;
function call(method: string, data: Record<string, any>, headers: Record<string, any>, cb?: RequestResolver): void;
function call(method: string, ...args: unknown[]): void {
  const id = method + Date.now().toString() + Math.random() * 1000;

  let params: Record<string, any> = {};
  let headers: Record<string, any> = {};
  let cb: RequestResolver | undefined;

  if (typeof args[0] === 'object') params = args[0] as Record<string, any>;
  if (args.length > 1 && typeof args[1] === 'object') headers = args[1] as Record<string, any>;
  if (args.length > 1 && typeof args[1] === 'function') cb = args[1] as RequestResolver;
  if (args.length > 2 && typeof args[2] === 'function') cb = args[2] as RequestResolver;

  worker.postMessage({
    id,
    type: 'call',
    payload: { method, params, headers },
  } as WorkerMessage);

  if (cb) requests[id] = cb;
}

/**
 * Any task wrapper
 */
export function task(type: WorkerMessage['type'], payload: any, cb?: AnyResolver) {
  const id = type + Date.now().toString() + Math.random() * 1000;
  worker.postMessage({ id, type, payload } as WorkerMessage);
  if (cb) queue[id] = cb;
}

/**
 * Subscribe client event
 */
function subscribe(type: string, cb: EventResolver) {
  if (!eventListeners[type]) eventListeners[type] = [];
  eventListeners[type].push(cb);
}

/**
 * Emit client event
 */
function emit(type: string, data: any) {
  if (!eventListeners[type]) eventListeners[type] = [];

  for (let i = 0; i < eventListeners[type].length; i++) {
    eventListeners[type][i](data);
  }
}

/**
 * Subscribe RPC update
 */
function on(predicate: string, cb: UpdateResolver) {
  if (!updates[predicate]) {
    updates[predicate] = [];

    worker.postMessage({
      id: predicate,
      type: 'update',
      payload: {},
    } as WorkerMessage);
  }

  updates[predicate].push(cb);
}

/**
 * Message resolver
 */
worker.onmessage = (event: MessageEvent) => {
  if (!event.data || !event.data.type) return;

  const data = event.data as WorkerMessage;

  switch (data.type) {
    case 'call':
      if (requests[event.data.id]) requests[event.data.id](data.payload.err, data.payload.result);
      delete requests[event.data.id];
      break;

    case 'update':
      for (let i = 0; i < updates[event.data.id].length; i += 1) {
        updates[event.data.id][i](data.payload);
      }
      break;

    case 'meta':
      svc.meta = data.payload;
      break;

    case 'network':
      emit('networkChanged', data.payload);
      break;

    case 'upload_progress': {
      const resolvers = uploadingFiles[data.payload.id];
      if (resolvers && resolvers.progress) resolvers.progress(data.payload.uploaded, data.payload.total);
      break;
    }

    case 'upload_ready': {
      const resolvers = uploadingFiles[data.payload.id];
      if (resolvers) {
        resolvers.ready(data.payload.inputFile);
        delete uploadingFiles[data.payload.id];
      }
      break;
    }

    case 'download_progress': {
      const resolvers = downloadingFiles[data.payload.id];
      if (resolvers && resolvers.progress) resolvers.progress(data.payload.downloaded, data.payload.total);
      break;
    }

    case 'download_ready': {
      const resolvers = downloadingFiles[data.payload.id];
      if (resolvers) {
        resolvers.ready(data.payload.url);
        delete downloadingFiles[data.payload.id];
      }
      break;
    }

    default:
      if (event.data.id && queue[event.data.id]) {
        queue[event.data.id](data.payload);
        delete queue[event.data.id];
      }
  }
};

// Returns id of authorized user
function getUserID(): number {
  return svc.meta && svc.meta[dc] ? svc.meta[dc].userID as number : 0;
}

// Returns base datacenter
function getBaseDC(): number {
  return dc;
}

// Switches base datacenter
function setBaseDC(dc_id: number) {
  svc.baseDC = dc_id;
  localStorage.setItem('dc', dc_id.toString());

  worker.postMessage({
    id: '',
    type: 'switch_dc',
    payload: dc_id,
  } as WorkerMessage);
}

// Returns result of kdf hash algo
function getPasswordKdfAsync(algo: any, password: string, cb: AnyResolver) {
  task('password_kdf', { algo, password }, cb);
}

function authorize(dc_id: number, cb?: AnyResolver) {
  task('authorize', dc_id, cb);
}

const client = {
  svc,
  call,
  on: subscribe,
  updates: {
    on,
  },
  getUserID,
  getBaseDC,
  setBaseDC,
  getPasswordKdfAsync,
  authorize,
  storage: window.localStorage,
};

/**
 * Cache client meta after page closing
 */
window.addEventListener('beforeunload', () => {
  client.storage.setItem(saveMetaField, JSON.stringify(svc.meta));
});

(window as any).client = client;

export default client;
