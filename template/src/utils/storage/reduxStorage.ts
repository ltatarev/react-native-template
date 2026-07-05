import { createMMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

const reduxPersistStorage = createMMKV({
  id: 'redux-persist',
});

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
