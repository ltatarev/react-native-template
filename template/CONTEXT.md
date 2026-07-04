# Template Context

This template is an opinionated production starter for React Native apps. It is
not a minimal generated shell and it intentionally avoids app-specific domains
such as feeds, payments, analytics, notifications, or third-party APIs.

## Core Vocabulary

**Feature module**
: A self-contained product area under `src/modules/<name>`. It owns its
screens, Redux slice, selectors, hooks, and any module-specific helpers.

**Module public surface**
: The `src/modules/<name>/index.ts` barrel. Other modules import from
`modules/<name>` only. Internal file imports such as
`modules/home/screens/HomeScreen` are intentionally blocked.

**App shell**
: The `main` module. It owns provider order, root navigation, status bar, and
global runtime hosts such as the toast host.

**Root Redux module**
: The `redux` module. It owns the configured store, persistor, root reducer,
Redux types, and typed hooks.

**Theme UI**
: Shared UI primitives under `src/theme/ui`. These are reusable across
features and styled with theme tokens.

**Theme tokens**
: The shared values in `src/theme/theme.ts`: colors, typography, gutter, radii,
shadow, and z-index. Feature UI should read these through Unistyles instead of
hardcoding literals.

**Adapter**
: A small app-facing wrapper around native or external capability code.
Adapters live under `src/utils` and keep feature modules decoupled from native
SDKs and implementation details.

## Boundaries

- `modules/main` may compose the app shell.
- `modules/redux` may compose root state.
- Feature modules may import other feature modules through public surfaces.
- Feature modules may import adapters from `utils/*`.
- Feature modules may import shared primitives from `theme/ui`.
- Feature modules should not import native SDKs directly.
- Feature modules should not reach into another module's internal files.

## Adding A Module

1. Create `src/modules/<name>/const.ts` with `MODULE_NAME`.
2. Create `src/modules/<name>/index.ts` as the public surface.
3. Add screens under `screens/` and export only what other modules need.
4. Add Redux files under `redux/` when state is useful.
5. Register the reducer in `modules/redux/store.ts` if the module owns state.
6. Add user-facing text to `i18n/en_EN.json`.
7. Style with `react-native-unistyles` and theme tokens.

## Styling

- Import `StyleSheet` from `react-native-unistyles`.
- Keep styles next to components unless they become reusable primitives.
- Use `theme.colors`, `theme.typography`, `theme.gutter`, `theme.radii`,
  `theme.shadow`, and `theme.zIndex`.
- Shared primitives belong in `theme/ui`.

## Text And Localization

- Initialize i18n once through `src/index.ts`.
- Store resources in `i18n/en_EN.json`.
- Components call `useTranslation()` and render text through `t(...)`.
- Avoid hardcoded user-facing labels in features.

## Storage And Persistence

- Redux persistence uses MMKV through `utils/storage`.
- App code should not import AsyncStorage directly.
- If another storage use case appears, expose it through a small adapter before
  using it in a feature.

## Feedback And Native Capabilities

- Toasts are triggered through `utils/toast`.
- Haptics are triggered through `utils/haptic-feedback`.
- Errors flow through `utils/error-handling`.
- Logs flow through `utils/logger`.

## Testing And Validation

- Put pure logic tests near the code they cover.
- Use `yarn test:unit` for the Jest unit harness.
- Use `yarn lint` to catch module boundary, style, and import issues.
- Use `yarn tsc` to preserve strict TypeScript behavior.
- Use `yarn madge` when import structure changes.
