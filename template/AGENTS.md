# Agent Instructions

Purpose: keep AI coding assistants aligned with this React Native template.
Prefer these project conventions over generic React Native advice. For the
architecture vocabulary, read `CONTEXT.md`. For the shape a capability takes when
the product needs one the template does not ship, read `docs/growing-the-app.md`.

## Project Snapshot

- Framework: React Native `0.86` with React `19.2`.
- Language: TypeScript with `strict: true`.
- Package manager: Yarn 4.
- Styling: `react-native-unistyles`.
- State: Redux Toolkit with typed hooks from `modules/redux`.
- Navigation: React Navigation native stack only.
- Internationalization: `react-i18next`, resources under `i18n/`.
- Persistence: redux-persist backed by MMKV through `utils/storage`.
- Shared UI primitives: `theme/ui`.
- Common pure helpers: `src/common`.
- Feature flags: `modules/feature-flag`.
- Native/external capabilities: wrap them in `utils/*` adapters.

## Commands

Run commands from the template directory.

```sh
yarn lint
yarn tsc
yarn test:unit
yarn madge
yarn sanity
```

Use focused checks while working and run broader checks before handoff. Avoid
native app targets unless a task specifically needs simulator or device runtime
verification.

`yarn sanity` is non-mutating. `yarn sanity:fix` runs lint with `--fix`, then
typecheck and dependency graph validation, so expect it to edit files.

## Path Aliases

Aliases are defined in both `tsconfig.json` and `babel.config.js`.

| Alias       | Resolves to     |
| ----------- | --------------- |
| `assets/*`  | `src/assets/*`  |
| `common/*`  | `src/common/*`  |
| `modules/*` | `src/modules/*` |
| `theme/*`   | `src/theme/*`   |
| `utils/*`   | `src/utils/*`   |

Do not introduce a new alias style such as `@/`.

## Architecture

The codebase is package-by-feature.

```text
src/
├── common/        # Pure shared hooks, types, and helpers
│   ├── hooks/
│   ├── types/
│   └── utils/
├── modules/
│   ├── design-system/ # Primitive gallery (development only)
│   ├── feature-flag/  # Typed boolean gates
│   ├── home/          # Neutral reference feature
│   ├── main/          # App shell and root navigator
│   ├── navigation/    # Route helpers, screen options, navigation ref
│   ├── onboarding/    # First-run gate
│   ├── redux/         # Root store and typed Redux hooks
│   └── settings/      # Appearance and about
├── theme/
│   ├── hooks/     # useTheme, useAppearanceSync
│   ├── providers/ # Theme initialization
│   ├── redux/     # Persisted appearance mode
│   ├── services/  # Theme setup
│   ├── ui/        # Shared UI primitives
│   ├── gutter.ts  # Device metrics
│   ├── scales.ts  # Spacing, radii, type, motion, size, z-index
│   ├── styles.ts
│   ├── theme.ts   # The two palettes
│   ├── types.ts
│   └── unistyles.ts
└── utils/
    ├── app-state/
    ├── error-handling/
    ├── haptic-feedback/
    ├── hooks/
    ├── logger/
    ├── services/
    ├── storage/
    └── toast.tsx

i18n/
├── en_EN.json
├── index.ts
└── resources.ts
```

### Module Boundaries

- Feature code lives under `src/modules/<feature>`.
- Each module exposes its public API through `src/modules/<feature>/index.ts`.
- Cross-module imports use `modules/<name>`.
- Do not import `modules/<name>/<internal-file>` from another module.
- ESLint enforces public-surface imports with `no-restricted-imports`.
  `modules/redux/store.ts` is the one exemption: a slice is not part of a
  module's public surface, and the root reducer is its only consumer.
- If another module needs something, export it from that module's `index.ts`.
- A route name two modules both need goes in `modules/navigation/routes.ts`,
  which depends on nothing. That is what keeps sibling features from importing
  each other just to navigate.

Common module subfolders:

- `screens/` for route-level components.
- `components/` for reusable module-local components.
- `fragments/` for larger screen sections that are not shared UI primitives.
- `hooks/` for module hooks.
- `redux/` for slices, selectors, thunks, and adapters.
- `utils/` for pure module helpers.
- `persist/`, `merge/`, `sync/`, or `orchestration/` only when the module owns
  that specialized behavior.

### App Shell

`modules/main/screens/App.tsx` owns provider order and nothing else. The order is
load-bearing and documented in that file; read it before changing it.

Global runtime hosts (`ToastHost`, and anything like it) are siblings of the
navigator, not children of a screen: they belong to the app, so they survive
navigation and float over every route at the same height. A host that renders
`null` and only runs effects is a normal and preferred shape for app-level work —
a foreground refresh, a sync, a notification handler.

### State

- Root Redux setup lives in `src/modules/redux`.
- Store and persistor are module-level singletons.
- Components use `useAppDispatch` and `useAppSelector` from `modules/redux`.
- Feature slices/selectors stay inside their module and are exported from the
  module public surface when other modules need them.
- Feature flags live in `modules/feature-flag`; add flags in `const.ts` and
  read them through selectors.
- Nothing that reads state renders before `PersistGate` — otherwise it paints
  once with defaults and again with the real values.

### React And Hooks

- Use function declarations for React components.
- Initialize state with the right value in `useState`; do not call `setState`
  synchronously in a `useEffect` body.
- Clean up subscriptions and timers in effects.
- Include all values used by `useCallback` and `useMemo` dependency arrays.
- Use `React.memo`, `useMemo`, and `useCallback` when they protect real work or
  stable references; do not add them mechanically.
- A hook that takes a callback and subscribes to something holds the callback in
  a ref, so an inline closure does not resubscribe every render. See
  `useOnFocus` and `utils/app-state`.
- Use `FlatList` for long lists.

### React Native And Worklets

- Use `Platform.select` for small platform differences and platform-specific
  files for larger branches.
- When calling JS from a worklet, use `scheduleOnRN` from
  `react-native-worklets`.
- Do not use `runOnJS` from `react-native-reanimated`.
- Mark worklet callbacks with the `'worklet'` directive where required.

### Styling And UI

- Import `StyleSheet` from `react-native-unistyles`.
- Shared UI primitives live in `theme/ui`. Feature screens import them from
  `theme/ui`, never from an internal primitive file.
- Reach for an existing primitive before writing markup: `Screen`, `Text`,
  `View`, `Row`, `Touchable`, `Button`, `IconButton`, `Icon`, `Card`, `Divider`,
  `Pill`, `SectionHeader`, `EmptyState`, `Skeleton`, `ProgressBar`, `Switch`,
  `TextInput`, `Sheet`, `ConfirmDialog`, `LoadingScreen`.
- `modules/design-system`'s gallery renders all of them in the live theme. Add a
  new primitive to it, and look at both themes there before a feature uses it.
- Every screen's outer element is `Screen`. It owns the page background, insets,
  scrolling, and keyboard handling — do not reassemble that stack per screen.
- Every string goes through `Text`, with `size`/`color`/`bold` props rather than
  a font family or a hex in a stylesheet.
- Use theme tokens for colors, typography, spacing, radii, shadows, motion,
  sizes, and z-index. Spacing is `theme.gutter`; motion is `theme.motion`.
- Do not add color literals to feature UI.
- Keep user-facing text in `i18n`.
- Dynamic prop-derived styles are acceptable when a value truly depends on
  runtime data, but static layout belongs in `StyleSheet.create`. Prefer
  Unistyles `variants` over a style function when the value is one of a set.
- Do not use single-element style arrays.

### Motion And Accessibility

- Animations run on the UI thread through Reanimated.
- Every animation honors Reduce Motion. Reanimated layout animations do it
  themselves; anything hand-driven checks `useReducedMotion` from `theme/ui`.
- Springs and press-scales come from `theme.motion`, so the whole app moves the
  same way. `usePressScale` and `useModalPresence` in `theme/ui/motion.ts` are
  the two shapes almost everything needs.
- A control with no visible label needs `accessibilityLabel` — `IconButton`
  requires one.
- Decoration is hidden from assistive tech (`Divider`, `Icon`, `Skeleton` do this
  already); the control or region around it carries the label.
- A progress or busy state announces its real values, not just its appearance.

### Adapters

Feature code should not import native SDKs or external capability packages
directly. Use app-facing adapters:

- `utils/storage` for persisted storage, and `appPreferences` for values read
  before the first frame.
- `utils/toast` for imperative toast messages.
- `utils/logger` for logging.
- `utils/error-handling` for error capture and messages.
- `utils/haptic-feedback` for native haptics.
- `utils/app-state` for foreground/background transitions.
- `utils/services` for platform checks and app version.
- Document new storage instances and key namespaces in
  `src/utils/storage/README.md`.

## Code Style

- Use function declarations for React components.
- Prefer named exports.
- Keep TypeScript strict; avoid `any`.
- Use `unknown` when a value is truly unknown.
- Use `type` for object shapes and unions.
- Prefer `as const` objects over enums.
- Prefer `undefined` for optional values.
- Use explicit parameter and return types for exported functions, thunks,
  utilities, and non-trivial callbacks.
- Name a magic number as a module constant with a comment saying why it is that
  number.
- Let ESLint sort imports and exports.
- Keep Redux Toolkit Immer mutations named `state` or `draft`.
- Do not leave direct `console` calls in production code paths.

Prettier settings:

- Single quotes.
- Trailing commas everywhere possible.
- `arrowParens: avoid`.
- `bracketSameLine: true`.
- `bracketSpacing: true`.

Let lint and Prettier shape import order and style order.

## Live Debugging

The running app can be inspected from the shell through Rozenite, so an agent
reads console logs, network calls and React renders directly instead of asking
for a screenshot of the debugger.

- Start Metro with `yarn start:debug` (`WITH_ROZENITE=true`). A plain
  `yarn start` leaves Rozenite off, and the agent CLI answers 404.
- Drive it with the `rozenite-agent` skill in `.claude/skills/`: create a
  session, then call a domain. The built-in ones are `console`, `network`,
  `react`, `performance` and `memory`; the app also serves `redux-devtools`
  and `mmkv`.
- Opening a session disconnects React Native DevTools — the platform allows one
  debugger connection at a time. Stop the session to get the DevTools back.
- `utils/devtools` is the only place that imports `@rozenite/*`. The Redux
  enhancer is on the store, and the MMKV panel is mounted by `DevToolsHost` in
  the shell. Every plugin swaps itself for a no-op in a release bundle, so none
  of it is gated on `__DEV__` by hand.
- Adding a panel means adding its plugin to `utils/devtools`, not importing a
  `@rozenite/*` package into feature code.

## Skills

Four skills are vendored in `.claude/skills/` and tracked in `skills-lock.json`,
so they work on a fresh clone with no install step:

- `add-feature` — scaffolding a module, screen, slice, or route within the
  package-by-feature boundaries described above.
- `build-ui` — building screens and components to the `theme/ui` + Unistyles +
  i18n + accessibility standard described above.
- `validate-change` — the check-selection and handoff procedure for a change.
- `rozenite-agent` — driving the running app through Rozenite (see Live
  Debugging).

Reach for them rather than re-deriving the conventions from this file.

The rest of the library comes from the `adora` plugin, registered in
`.claude/settings.json` and resolving as `/adora:<skill-name>` — `write-tests`,
`verify`, `commit-changes`, `gitmoji`, `unistyles`, `truesheet-usage`,
`domain-model`, `grill-plan`, `ticket-shaping`, `implement-ticket`,
`ios-widget`, `bootsplash`, `xcode-cloud`. If a `/adora:` skill does not
resolve, the plugin is not installed yet; `.claude/README.md` says how.

## Docs

- Use `CONTEXT.md` for project vocabulary and boundaries.
- Use `docs/growing-the-app.md` before adding a capability package.
- Add ADRs under `docs/adr/` for decisions that change module ownership,
  persistence, native behavior, or long-lived product semantics.
- Keep troubleshooting notes in `troubleshooting.md` when a setup/build issue
  is likely to recur.

## Validation

Before handing off meaningful changes, run the checks that match the risk:

- `yarn lint` for style, imports, module boundaries, and React Native rules.
- `yarn tsc` for type safety.
- `yarn test:unit` for pure unit tests.
- `yarn madge` when import graph or module boundaries changed.
- `yarn sanity` for the final template pass.
