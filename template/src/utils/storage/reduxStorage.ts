import type { Storage } from 'redux-persist';
import { storageInstances } from './instances';

const reduxPersistStorage = storageInstances['redux-persist'];

export const reduxStorage: Storage = {
  getItem: (key) => Promise.resolve(reduxPersistStorage.getString(key) ?? null),
  removeItem: (key) => {
    reduxPersistStorage.remove(key);
    return Promise.resolve();
  },
  setItem: (key, value) => {
    reduxPersistStorage.set(key, value);
    return Promise.resolve();
  },
};
