import { promisifyTransaction } from 'helpers/indexedDb';

// Stores the low level API to deal with the application database. Also stores the database schema.

const META_STORE_NAME = 'meta';

// Increment it when you change the schema below
const SCHEMA_VERSION = 6;

function makeSchema(db: IDBDatabase) {
  db.createObjectStore('cache');
}

function actualizeSchema(db: IDBDatabase, _oldVersion: number, _newVersion: number) {
  const stores = db.objectStoreNames;

  if (!stores.contains(META_STORE_NAME)) {
    db.createObjectStore(META_STORE_NAME);
  }

  // for (let i = 0; i < stores.length; ++i) {
  //   if (stores[i] !== META_STORE_NAME) { // not removed to not loose the session during development
  //     db.deleteObjectStore(stores[i]);
  //   }
  // }

  if (stores.contains('cache')) {
    db.deleteObjectStore('cache');
  }
  makeSchema(db);
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('tgm', SCHEMA_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      actualizeSchema(request.result, event.oldVersion, event.newVersion || SCHEMA_VERSION);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

let databasePromise: Promise<IDBDatabase> | undefined;

export function getDatabase(): Promise<IDBDatabase> {
  // avoid redundant reopening
  if (!databasePromise) {
    databasePromise = openDatabase();
    databasePromise.catch((error) => {
      databasePromise = undefined;
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Failed to open the indexedDB database', error);
      }
    });
  }

  return databasePromise;
}

export async function runTransaction<T>(
  storeNames: string | string[],
  mode: IDBTransactionMode,
  action: (transaction: IDBTransaction) => Promise<T> | T,
): Promise<T> {
  const database = await getDatabase();
  return promisifyTransaction(database.transaction(storeNames, mode), action);
}
