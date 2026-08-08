import { createMMKV } from 'react-native-mmkv';

const preferences = createMMKV({ id: 'app-preferences' });

export type AppPreferences = {
  /** Parsed JSON, or `undefined` when the key is unset or unreadable. */
  getJson: (key: string) => unknown;
  getString: (key: string) => string | undefined;
  remove: (key: string) => void;
  setJson: (key: string, value: unknown) => void;
  setString: (key: string, value: string) => void;
};

/**
 * Synchronous key-value storage for the handful of values that have to be known
 * before the first frame, or that must survive a Redux Persist migration.
 *
 * A separate MMKV instance from the Redux snapshot on purpose: clearing or
 * migrating app state should never touch a value read at module load, and a
 * value read at module load cannot wait on rehydration.
 *
 * Keys are namespaced strings — `onboarding.completed`, `theme.preference`.
 * Document every one in this folder's README.
 *
 * `getJson` hands back `unknown`: what is on disk was written by an older build,
 * so the caller validates the shape before trusting it.
 */
export const appPreferences: AppPreferences = {
  getJson: key => {
    const raw = preferences.getString(key);

    if (raw === undefined) {
      return undefined;
    }

    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return undefined;
    }
  },
  getString: key => preferences.getString(key) ?? undefined,
  remove: key => {
    preferences.remove(key);
  },
  setJson: (key, value) => {
    preferences.set(key, JSON.stringify(value));
  },
  setString: (key, value) => {
    preferences.set(key, value);
  },
};
