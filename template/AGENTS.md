# Agent Instructions

Purpose: keep AI coding assistants aligned with this React Native template.
Prefer these project conventions over generic React Native advice. For the
architecture vocabulary, read `CONTEXT.md`.

## Project Snapshot

- Framework: React Native `0.86.0` with React `19.2.3`.
- Language: TypeScript with `strict: true`.
- Package manager: Yarn 4.
- Styling: `react-native-unistyles`.
- State: Redux Toolkit with typed hooks from `modules/redux`.
- Navigation: React Navigation native stack only.
- Internationalization: `react-i18next`, resources under `i18n/`.
- Persistence: redux-persist backed by MMKV through `utils/storage`.
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
├── common/      # Pure shared hooks and types
├── modules/
│   ├── feature-flag/ # Typed boolean gates
│   ├── home/      # Neutral reference feature
│   ├── main/      # App shell and root navigator
│   └── redux/     # Root store and typed Redux hooks
├── theme/
│   ├── providers/ # Theme initialization providers
│   ├── services/  # Theme setup and platform adapters
│   ├── ui/        # Shared UI primitives
│   ├── styles.ts
│   ├── theme.ts
│   ├── types.ts
│   └── unistyles.ts
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

### Module Boundaries

- Feature code lives under `src/modules/<feature>`.
- Each module exposes its public API through `src/modules/<feature>/index.ts`.
- Cross-module imports use `modules/<name>`.
- Do not import `modules/<name>/<internal-file>` from another module.
- ESLint enforces public-surface imports with `no-restricted-imports`.
- If another module needs something, export it from that module's `index.ts`.

Common module subfolders:

- `screens/` for route-level components.
- `components/` for reusable module-local components.
- `fragments/` for larger screen sections that are not shared UI primitives.
- `hooks/` for module hooks.
- `redux/` for slices, selectors, thunks, and adapters.
- `utils/` for pure module helpers.
- `persist/`, `merge/`, `sync/`, or `orchestration/` only when the module owns
  that specialized behavior.

### State

- Root Redux setup lives in `src/modules/redux`.
- Store and persistor are module-level singletons.
- Components use `useAppDispatch` and `useAppSelector` from `modules/redux`.
- Feature slices/selectors stay inside their module and are exported from the
  module public surface when other modules need them.
- Feature flags live in `modules/feature-flag`; add flags in `const.ts` and
  read them through selectors.

### React And Hooks

- Use function declarations for React components.
- Initialize state with the right value in `useState`; do not call `setState`
  synchronously in a `useEffect` body.
- Clean up subscriptions and timers in effects.
- Include all values used by `useCallback` and `useMemo` dependency arrays.
- Use `React.memo`, `useMemo`, and `useCallback` when they protect real work or
  stable references; do not add them mechanically.
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
- Shared UI primitives live in `theme/ui`.
- Feature screens import shared primitives from `theme/ui`, not from internal
  primitive files.
- Use theme tokens for colors, typography, spacing, radii, shadows, and z-index.
- Do not add color literals to feature UI.
- Keep user-facing text in `i18n`.
- Dynamic prop-derived styles are acceptable when a value truly depends on
  runtime data, but static layout belongs in `StyleSheet.create`.
- Do not use single-element style arrays.

### Adapters

Feature code should not import native SDKs or external capability packages
directly. Use app-facing adapters:

- `utils/storage` for persisted storage.
- `utils/toast` for imperative toast messages.
- `utils/logger` for logging.
- `utils/error-handling` for error capture and messages.
- `utils/haptic-feedback` for native haptics.
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

## Docs

- Use `CONTEXT.md` for project vocabulary and boundaries.
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
