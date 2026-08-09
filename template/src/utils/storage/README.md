# Storage Architecture

Persistence sits behind app-facing adapters so feature modules never depend on
a storage SDK directly.

## Storage Instances

Two MMKV instances, split by lifecycle rather than by feature. Both are created
once in `src/utils/storage/instances.ts`, keyed by the id they carry on disk —
v4 does not hand an id back off an instance, so that record is the only way
anything downstream (including the `utils/devtools` MMKV panel) can say which
store a key came from. Nothing outside `instances.ts` calls `createMMKV`.

### Redux Storage

- **Instance**: `storageInstances['redux-persist']`
- **Location**: `src/utils/storage/reduxStorage.ts`
- **Purpose**: backs Redux Persist, which stores the app snapshot under `root`.
- **Access**: imported as `reduxStorage` by `modules/redux/store.ts` only.

### App Preferences

- **Instance**: `storageInstances['app-preferences']`
- **Location**: `src/utils/storage/appPreferences.ts`
- **Purpose**: values that have to be readable synchronously before the first
  frame, or that must outlive a Redux Persist purge or migration.
- **Access**: `appPreferences` from `utils/storage`.

Keep the two apart. Clearing or migrating app state should never disturb a value
read at module load, and a value read at module load cannot wait on rehydration.

Add a third instance only when data has a genuinely different lifecycle, privacy
boundary, or sync behavior — not merely because it belongs to a different
feature.

## Key Naming

- Redux Persist owns the `root` key. Nothing else reads or writes it.
- App preferences use namespaced, dotted keys: `onboarding.completed`,
  `theme.preference`, `review.lastPromptedAt`.
- Register every key below as it is added, so a key is never reused for two
  meanings across releases.

| Key | Type | Written by | Meaning |
| --- | ---- | ---------- | ------- |
| _(none yet)_ | | | |

## Choosing Where State Lives

- **Redux** — UI and product state that belongs in the app snapshot, and that
  the UI re-renders from.
- **App preferences** — a flag or a small value read before React mounts, or one
  that must survive a state reset.
- **A `utils/*` adapter** — credentials, files, or anything behind a native SDK.
- **A module-owned service** — behavior specific to one feature, with its own
  storage shape (a database, a cache directory).

Screens and components should not import `react-native-mmkv`, AsyncStorage, or a
filesystem package. Wrap the capability first, then export the smallest API the
feature needs.
