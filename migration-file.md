# React Native Template Migration Plan

This document captures the agreed plan for upgrading this React Native template
using `/Users/lucijatatarevic/Developer/react-native-instagram-feed` as the
reference codebase.

## Source Of Truth

- When this template and `react-native-instagram-feed` diverge in architecture,
  setup, coding practices, or UI conventions, use `react-native-instagram-feed`
  as the source of truth.
- Intentional exception: keep React Native at `0.86.0` in this template, even
  though `react-native-instagram-feed` currently uses React Native `0.85.3`.
- Use `@ltatarev/eslint-config-react-native` as the ESLint baseline.

## Product Direction

The template should become an opinionated production starter, not a minimal
empty starter.

It should include:

- Production-ready module structure.
- Strict TypeScript.
- Enforced module public surfaces.
- A small neutral example feature.
- Theme-driven UI primitives.
- i18n from the beginning.
- MMKV-backed persistence.
- App-facing adapters for native/external capabilities.
- Lightweight agent/developer guidance docs.

It should not include app-specific features from the Instagram feed app, such
as Instagram APIs, iCloud sync, IAP, widgets, analytics setup, or notifications.

## Agreed Core Libraries

Keep React Native and React:

- `react-native`: `0.86.0`
- `react`: current template version unless a compatibility fix is required

Core runtime libraries:

- React Navigation stack only
- `@reduxjs/toolkit` 2.x
- `react-redux` 9.x
- `redux-persist`
- `react-native-mmkv`
- `react-native-unistyles`
- `i18next`
- `react-i18next`
- `react-native-keyboard-controller`
- `react-native-gesture-handler`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-bootsplash`
- `react-native-svg`
- `react-native-svg-transformer`
- `react-native-reanimated`
- `react-native-worklets`
- `react-native-haptic-feedback`

Do not keep in core:

- `react-native-fast-image`
- `react-native-vector-icons`
- RTK Query Pokemon demo
- bottom tabs
- native menu
- Sentry
- analytics
- IAP
- notifications
- webview
- image picker
- permissions
- Instagram/feed-specific sync

## Architecture Agreement

Top-level source layout:

```text
src/
├── modules/
│   ├── home/
│   ├── main/
│   └── redux/
├── theme/
│   ├── ui/
│   ├── theme.ts
│   ├── types.ts
│   ├── unistyles.ts
│   └── styles.ts
└── utils/
    ├── error-handling/
    ├── haptic-feedback/
    ├── logger/
    ├── storage/
    └── toast.tsx

i18n/
├── en_EN.json
├── index.ts
└── resources.ts
```

Module rules:

- Feature code lives under `src/modules/<feature>`.
- Each module exposes its public interface through `src/modules/<feature>/index.ts`.
- Cross-module feature imports must use `modules/<name>`.
- Cross-module feature imports must not reach into
  `modules/<name>/<internal-file>`.
- ESLint should enforce this with `no-restricted-imports`.
- Keep exceptions narrow and explicit for root Redux/store internals when needed.

Redux rules:

- Root store lives in `src/modules/redux`.
- Store and persistor are created at module level, not inside React render.
- Expose typed hooks from `modules/redux`:
  - `useAppDispatch`
  - `useAppSelector`
- Use Redux Toolkit slices and thunks.
- Use Redux Toolkit 2 and React Redux 9 typed hook patterns.

External/native capability rules:

- Feature code should not import native SDKs directly.
- Hide native/external details behind app-facing adapters in `utils/*`.
- Standard adapters:
  - `utils/storage`
  - `utils/toast`
  - `utils/logger`
  - `utils/error-handling`
  - `utils/haptic-feedback`

## UI Agreement

- Remove `src/ui`.
- Shared UI primitives live under `src/theme/ui`.
- Styling uses `react-native-unistyles`.
- Import `StyleSheet` from `react-native-unistyles`, not from `react-native`.
- Color literals belong in theme files, not feature UI.
- Use theme tokens for colors, typography, spacing, radii, shadow, and z-index.
- User-facing text goes through `react-i18next`.
- Icons use SVG assets through `react-native-svg` and
  `react-native-svg-transformer`.
- Do not use `react-native-vector-icons` in core.

Custom toast pattern:

- Visual/runtime layer lives under `src/theme/ui/Toast`.
- App-facing imperative adapter lives at `src/utils/toast.tsx`.
- Feature code imports toast functionality only from `utils/toast`.

Navigation:

- Core template has stack navigation only.
- Do not include bottom tabs in core.
- Structure should make tabs easy to add later.

## Tooling Agreement

- Use ESLint 9 flat config.
- Base ESLint on `@ltatarev/eslint-config-react-native`.
- Add project overrides for:
  - module public-surface imports
  - `no-console`
  - Redux Immer `state` and `draft`
  - Jest globals
- Use strict TypeScript.
- Use Prettier settings aligned with `react-native-instagram-feed`.
- Add Jest unit config for pure business logic.
- Add Madge circular dependency check.
- Add `AGENTS.md` and `CONTEXT.md` as lighter template-specific versions of the
  feed app docs.

Recommended scripts:

```json
{
  "lint": "eslint .",
  "test": "jest",
  "test:unit": "jest --config jest.unit.config.js --watchman=false",
  "madge": "npx madge -c --ts-config tsconfig.json --extensions tsx --warning .",
  "madge:image": "npx madge -c --ts-config tsconfig.json --extensions tsx --warning --image graph.svg .",
  "sanity": "yarn lint; yarn tsc; yarn madge"
}
```

## Shippable Task Breakdown

### 1. Tooling Baseline

Status: Complete.

Scope:

- Add `eslint.config.mjs` using `@ltatarev/eslint-config-react-native`.
- Add project overrides for module public-surface imports, `no-console`, Redux
  Immer `state/draft`, and Jest globals.
- Add or update scripts: `lint`, `tsc`, `madge`, `sanity`.

Acceptance:

- `yarn lint` runs against the current template structure.
- ESLint config is flat config, not `.eslintrc`.
- Config uses `@ltatarev/eslint-config-react-native`.

### 2. TypeScript And Path Alias Cleanup

Status: Complete.

Scope:

- Make `tsconfig.json` strict.
- Align aliases with feed style:
  - `assets/*`
  - `common/*`
  - `modules/*`
  - `theme/*`
  - `utils/*`
- Sync aliases in `babel.config.js`.

Acceptance:

- `yarn tsc` resolves aliases.
- No new relative import churn is needed for cross-module imports.

### 3. Dependency Core Update

Scope:

- Remove `react-native-fast-image`.
- Remove `react-native-vector-icons`.
- Remove RTK Query demo dependencies if no longer used.
- Add agreed core dependencies:
  - MMKV
  - Unistyles
  - i18n
  - keyboard controller
  - SVG transformer
  - Reanimated/worklets
  - haptic feedback
- Keep React Native `0.86.0`.

Acceptance:

- `package.json` reflects the agreed core.
- App code does not import removed libraries.

### 4. Metro And Babel Runtime Setup

Scope:

- Add SVG transformer config to Metro.
- Add `react-native-unistyles/plugin` to Babel.
- Add `react-native-worklets/plugin` in the correct plugin order.
- Keep module resolver aliases aligned with TypeScript.

Acceptance:

- SVG imports are supported.
- Worklets are supported.
- Alias resolution works consistently in TypeScript and Babel.

### 5. Jest Unit Harness

Scope:

- Add `jest.unit.config.js`.
- Add `jest.unit.setup.ts`.
- Mock React Native native surfaces needed for pure unit tests.
- Add `test:unit` script.
- Add one small utility test.

Acceptance:

- `yarn test:unit` passes.

### 6. Root Redux Module

Scope:

- Create `src/modules/redux`.
- Move root store there.
- Add:
  - `store.ts`
  - `types.ts`
  - `hooks.ts`
  - `index.ts`
- Upgrade store typing to Redux Toolkit 2 / React Redux 9 patterns.

Acceptance:

- App imports `store` and `persistor` from `modules/redux`.
- App imports `useAppDispatch` and `useAppSelector` from `modules/redux`.
- Store is not created inside React render.

### 7. MMKV Storage Adapter

Scope:

- Add `src/utils/storage`.
- Implement a redux-persist-compatible MMKV adapter.
- Remove direct AsyncStorage usage from app code.

Acceptance:

- `redux-persist` uses `utils/storage`.
- App code does not import AsyncStorage directly.

### 8. App Shell Providers

Scope:

- Refactor `src/modules/main/screens/App.tsx`.
- Stabilize provider order.
- Include:
  - Redux `Provider`
  - `PersistGate`
  - `GestureHandlerRootView`
  - `KeyboardProvider`
  - `NavigationContainer`
  - Unistyles/theme initialization
  - toast host

Acceptance:

- App shell boots with stable provider order.
- Store and persistor are module-level singletons.

### 9. Stack Navigation Only

Scope:

- Keep core navigation to native stack.
- Remove tab assumptions.
- Make navigator easy to extend later.

Acceptance:

- App has one root stack.
- App has one neutral home route.
- No bottom-tab dependency or setup is present in core.

### 10. i18n Foundation

Scope:

- Add `i18n/`.
- Add:
  - `i18n/index.ts`
  - `i18n/resources.ts`
  - `i18n/en_EN.json`
- Initialize `react-i18next`.
- Move user-facing starter text into translations.

Acceptance:

- Starter screen renders text through `t(...)`.
- Example feature has no hardcoded user-facing labels.

### 11. Unistyles Theme Foundation

Scope:

- Add:
  - `src/theme/theme.ts`
  - `src/theme/unistyles.ts`
  - `src/theme/styles.ts`
  - `src/theme/types.ts`
- Define tokens for:
  - colors
  - typography
  - gutter
  - radii
  - shadow
  - zIndex
- Configure light and dark themes.

Acceptance:

- App uses `StyleSheet` from `react-native-unistyles`.
- Feature styles use theme tokens.

### 12. Move Shared UI To `theme/ui`

Scope:

- Move or replace `src/ui` primitives into `src/theme/ui`.
- Include minimal primitives:
  - `View`
  - `Text`
  - `Button`
  - `Touchable`
  - `TextInput`
  - `Screen`
  - `ActivityIndicator`
  - `Modal`
- Update imports.

Acceptance:

- No imports from `ui/*`.
- Shared UI imports come from `theme/ui`.

### 13. Custom Toast Implementation

Scope:

- Add visual/runtime toast layer under `src/theme/ui/Toast`.
- Add app-facing adapter at `src/utils/toast.tsx`.
- Mount toast host in app shell.
- Use toast from the neutral example feature.

Acceptance:

- Example screen can trigger a toast.
- Feature code does not import toast internals.

### 14. Utility Adapters

Scope:

- Add:
  - `utils/logger`
  - `utils/error-handling`
  - `utils/haptic-feedback`
- Keep interfaces small and app-facing.
- Use `react-native-haptic-feedback` only inside the haptic adapter.

Acceptance:

- Feature code does not import native SDKs directly.
- Example feature can trigger haptic feedback through the adapter.

### 15. Neutral Home Feature

Scope:

- Replace the Pokemon demo with a small neutral `home` module.
- Include:
  - screen
  - slice/selectors if useful
  - public `index.ts`
- Demonstrate:
  - typed Redux hooks
  - i18n
  - theme UI
  - toast
  - haptic adapter

Acceptance:

- `modules/home` is a reference module without external API/demo baggage.
- Public exports are available from `modules/home`.

### 16. Module Public Surface Enforcement

Scope:

- Add ESLint `no-restricted-imports` rule to block internal cross-module imports.
- Allow feature code to import `modules/<name>`.
- Add narrow exceptions for root Redux/store internals if needed.

Acceptance:

- Lint catches imports like `modules/home/screens/HomeScreen` from another module.
- Valid imports like `modules/home` pass.

### 17. Template Agent Docs

Scope:

- Add lighter `AGENTS.md` adapted from `react-native-instagram-feed`.
- Add `CONTEXT.md` for template architecture vocabulary and conventions.
- Cover:
  - module interfaces
  - styling
  - i18n
  - storage
  - adapters
  - testing
  - validation

Acceptance:

- Docs describe this template, not Lumee-specific domains.
- Docs preserve the core principles from the feed app.

### 18. README Refresh

Scope:

- Update generated-template README.
- Document:
  - scripts
  - architecture
  - aliases
  - styling
  - testing
  - adding a module

Acceptance:

- A new developer can run and understand the template without reading the feed
  repo.

### 19. Final Sanity Pass

Scope:

- Run:
  - `yarn lint`
  - `yarn tsc`
  - `yarn test:unit`
  - `yarn madge`
- Fix issues introduced by the upgrade.

Acceptance:

- `yarn sanity` passes, or any remaining failure is explicitly documented with
  the reason.

## Suggested Commit Order

1. Tooling baseline.
2. TypeScript and alias cleanup.
3. Dependency core update.
4. Metro/Babel runtime setup.
5. Jest unit harness.
6. Root Redux module.
7. MMKV storage adapter.
8. App shell providers.
9. Stack navigation cleanup.
10. i18n foundation.
11. Unistyles theme foundation.
12. Move shared UI to `theme/ui`.
13. Custom toast implementation.
14. Utility adapters.
15. Neutral home feature.
16. Module public-surface enforcement.
17. Template agent docs.
18. README refresh.
19. Final sanity pass.
