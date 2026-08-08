# Template Context

This template is an opinionated production starter for React Native apps. It is
not a minimal generated shell, and it intentionally avoids app-specific domains
such as feeds, payments, analytics, notifications, or third-party APIs.

What it does ship is every layer an app needs before it has a product: the shell,
the token system, the primitive set, the state and persistence wiring, and the
three screens (first-run, home, settings) that exist in every app regardless of
what it does. See `docs/growing-the-app.md` for the shape the next layers take.

## Core Vocabulary

**Feature module**
: A self-contained product area under `src/modules/<name>`. It owns its
screens, Redux slice, selectors, hooks, and any module-specific helpers.

**Common layer**
: Shared pure hooks, types, and helpers under `src/common`. This layer is for
generic building blocks that do not depend on app services, Redux, navigation,
or theme — and that could be lifted into another app unchanged.

**Module public surface**
: The `src/modules/<name>/index.ts` barrel. Other modules import from
`modules/<name>` only. Internal file imports such as
`modules/home/screens/HomeScreen` are intentionally blocked.

**App shell**
: The `main` module. It owns provider order, root navigation, status bar, and
global runtime hosts such as the toast host.

**Host**
: A component mounted beside the navigator that renders nothing and only runs
effects — a foreground refresh, a sync, a notification handler. Work that belongs
to the app rather than to a screen lives in one, so it survives navigation.

**Root Redux module**
: The `redux` module. It owns the configured store, persistor, root reducer,
Redux types, and typed hooks. It is the one place allowed to import another
module's slice directly.

**Theme UI**
: Shared UI primitives under `src/theme/ui`. These are reusable across
features and styled with theme tokens. Nothing in here knows what the app is for.

**Theme tokens**
: `src/theme/scales.ts` holds what both themes share — `gutter` (spacing),
`radii`, `typography`, `motion`, `size`, `zIndex`, `shadow`, `durations`,
`borderWidth`. `src/theme/theme.ts` holds the two palettes plus `name` and
`isDark`. Feature UI reads all of it through Unistyles rather than hardcoding
literals.

**Appearance mode**
: The reader's choice of `system`, `light`, or `dark`, persisted in
`theme/redux` and pushed into Unistyles by `useAppearanceSync`. Nothing else
calls `UnistylesRuntime.setTheme`.

**Adapter**
: A small app-facing wrapper around native or external capability code.
Adapters live under `src/utils` and keep feature modules decoupled from native
SDKs and implementation details.

**Feature flag**
: A typed boolean capability gate owned by `modules/feature-flag`. Flags are
named in `const.ts`, read through selectors, and updated through slice actions.

**Cross-module route**
: A route name in `modules/navigation/routes.ts`. That module depends on nothing,
so a name kept there lets one feature navigate to another's screen without the
import that would make them a cycle.

**Design system gallery**
: `modules/design-system`'s screen, which renders every primitive in the live
theme. A development surface, not a product one — it is where a new primitive is
reviewed and where a palette change is checked in one pass.

**Architecture decision record**
: A short document under `docs/adr/` that captures an important technical
decision, its alternatives, and the consequences future maintainers should
preserve.

## Boundaries

- `modules/main` may compose the app shell.
- `modules/redux` may compose root state, and may import module slices directly.
- `modules/navigation` imports nothing from other modules, by design.
- Feature modules may import other feature modules through public surfaces.
- Feature modules may import pure shared helpers from `common/*`.
- Feature modules may import adapters from `utils/*`.
- Feature modules may import shared primitives from `theme/ui`.
- Feature modules should not import native SDKs directly.
- Feature modules should not reach into another module's internal files.
- A screen types only the routes it navigates to, rather than importing the root
  stack's param list — that would be a reverse dependency on `modules/main`.

## Adding A Module

1. Create `src/modules/<name>/const.ts` with `MODULE_NAME`, plus any route names
   built with `RouteService.constructRouteName`.
2. Create `src/modules/<name>/index.ts` as the public surface.
3. Add screens under `screens/` and export only what other modules need.
4. Add module components under `components/` when they are reusable within the
   module.
5. Add `fragments/` for larger screen sections that are not shared primitives.
6. Add module hooks under `hooks/`.
7. Add Redux files under `redux/` when state is useful.
8. Add `utils/` for pure module helpers.
9. Add specialized folders such as `persist/`, `merge/`, `sync/`, or
   `orchestration/` only when the module owns that behavior.
10. Register the reducer in `modules/redux/store.ts` if the module owns state.
11. Register routes in `modules/main/navigator.tsx`.
12. Add user-facing text to `i18n/en_EN.json`.
13. Build screens from `theme/ui` primitives and theme tokens.

## Shared Code

- Put generic pure hooks, types, and helpers in `src/common`.
- Put native or external capability adapters in `src/utils`.
- Put reusable visual primitives in `src/theme/ui`.
- Keep module-specific helpers inside the owning module.
- Do not move code into `common` only because two files currently need it; move
  it when the concept is truly independent of a feature.

## Feature Flags

- Define flags in `src/modules/feature-flag/const.ts`.
- Read flags through selectors from `modules/feature-flag`.
- Keep flag names product-neutral and stable.
- Remove flags once the gated behavior is permanent.

## Styling

- Import `StyleSheet` from `react-native-unistyles`.
- Every screen's outer element is `Screen`; every string goes through `Text`.
- Prefer an existing primitive to new markup. Add to `theme/ui` when the shape
  is genuinely shared, and add it to the gallery at the same time.
- Keep styles next to components unless they become reusable primitives.
- Use `theme.colors`, `theme.typography`, `theme.gutter`, `theme.radii`,
  `theme.shadow`, `theme.motion`, `theme.size`, and `theme.zIndex`.
- Prefer Unistyles `variants` over a style function when a value is one of a set.
- `theme/gutter.ts` is device metrics, not spacing. Spacing is `theme.gutter`.

## Motion And Accessibility

- Animations run on the UI thread; springs come from `theme.motion`.
- Every animation honors Reduce Motion.
- Icon-only controls carry an `accessibilityLabel`; decoration is hidden from
  assistive tech.
- Text scales with the OS setting, to a ceiling `Text` sets and a caller can lift
  for long-form copy.

## Text And Localization

- Initialize i18n once through `src/index.ts`.
- Store resources in `i18n/en_EN.json`.
- Components call `useTranslation()` and render text through `t(...)`.
- Avoid hardcoded user-facing labels in features, including labels inside shared
  primitives.

## Storage And Persistence

- Redux persistence uses MMKV through `utils/storage`.
- `appPreferences` is the second MMKV instance, for values read before the first
  frame or that must outlive a state reset. Keep the two apart.
- App code should not import AsyncStorage or MMKV directly.
- If another storage use case appears, expose it through a small adapter before
  using it in a feature.
- Document new storage instances and key namespaces in
  `src/utils/storage/README.md`, including the key table.

## Feedback And Native Capabilities

- Toasts are triggered through `utils/toast`, and may carry one action.
- Haptics are triggered through `utils/haptic-feedback`.
- Errors flow through `utils/error-handling`.
- Logs flow through `utils/logger`.
- Foreground and background transitions come from `utils/app-state`. Anything
  checked at launch that can change while the app is away is re-checked there.
- Platform checks and the app version come from `utils/services`.

## Testing And Validation

- Put pure logic tests near the code they cover.
- Use `yarn test:unit` for the Jest unit harness. It runs in node, so tests cover
  pure logic and token math rather than rendered components.
- Use `yarn lint` to catch module boundary, style, and import issues.
- Use `yarn tsc` to preserve strict TypeScript behavior.
- Use `yarn madge` when import structure changes.

## Architecture Decisions

- Add an ADR when a decision changes module boundaries, persistence, native
  behavior, navigation ownership, or long-lived product semantics.
- Start from `docs/adr/0000-template.md`.
- Prefer short ADRs that capture the decision and tradeoffs over long design
  essays.
