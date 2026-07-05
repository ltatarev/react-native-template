# Storage Architecture

This template keeps persistence behind app-facing adapters so feature modules do
not depend on storage SDKs directly.

## Storage Instances

### Redux Storage

- **Instance**: `createMMKV({ id: 'redux-persist' })`
- **Location**: `src/utils/storage/reduxStorage.ts`
- **Purpose**: Stores Redux Persist state under the `root` key.
- **Access**: Imported as `reduxStorage` by `modules/redux/store.ts`.

Add new MMKV instances only when the data has a different lifecycle, privacy
boundary, or sync behavior from Redux state.

## Key Naming

- Redux Persist owns the `root` key.
- Feature modules should not read or write Redux Persist keys directly.
- App preferences should use explicit, namespaced keys such as
  `theme.preference` or `onboarding.completed`.

## Usage

Feature code should prefer one of these paths:

- Redux state for UI and product state that belongs in the app snapshot.
- A small `utils/*` adapter for preferences, credentials, files, or native SDKs.
- A module-owned service when the behavior is specific to one feature.

Avoid importing `react-native-mmkv`, AsyncStorage, or file-system packages from
screens and components. Wrap those capabilities first, then export the smallest
API the feature needs.
