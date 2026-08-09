import { createMMKV } from 'react-native-mmkv';

/**
 * Every MMKV instance the app opens, created here and nowhere else, keyed by
 * the id it carries on disk. v4 does not hand an id back off an instance, so a
 * record is the only way anything downstream can say which store a key came
 * from.
 *
 * The adapters next door are still how the app reads and writes. This exists
 * so the devtools inspector can be handed all of them at once without either
 * adapter having to surrender its instance to the rest of the app.
 */
export const storageInstances = {
  'app-preferences': createMMKV({ id: 'app-preferences' }),
  'redux-persist': createMMKV({ id: 'redux-persist' }),
};
