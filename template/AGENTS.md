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
├── modules/
│   ├── home/      # Neutral reference feature
│   ├── main/      # App shell and root navigator
│   └── redux/     # Root store and typed Redux hooks
├── theme/
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

### State

- Root Redux setup lives in `src/modules/redux`.
- Store and persistor are module-level singletons.
- Components use `useAppDispatch` and `useAppSelector` from `modules/redux`.
- Feature slices/selectors stay inside their module and are exported from the
  module public surface when other modules need them.

### Styling And UI

- Import `StyleSheet` from `react-native-unistyles`.
- Shared UI primitives live in `theme/ui`.
- Feature screens import shared primitives from `theme/ui`, not from internal
  primitive files.
- Use theme tokens for colors, typography, spacing, radii, shadows, and z-index.
- Do not add color literals to feature UI.
- Keep user-facing text in `i18n`.

### Adapters

Feature code should not import native SDKs or external capability packages
directly. Use app-facing adapters:

- `utils/storage` for persisted storage.
- `utils/toast` for imperative toast messages.
- `utils/logger` for logging.
- `utils/error-handling` for error capture and messages.
- `utils/haptic-feedback` for native haptics.

## Code Style

- Use function declarations for React components.
- Prefer named exports.
- Keep TypeScript strict; avoid `any`.
- Use `type` for object shapes and unions.
- Prefer `as const` objects over enums.
- Let ESLint sort imports and exports.
- Keep Redux Toolkit Immer mutations named `state` or `draft`.
- Do not leave direct `console` calls in production code paths.

## Validation

Before handing off meaningful changes, run the checks that match the risk:

- `yarn lint` for style, imports, module boundaries, and React Native rules.
- `yarn tsc` for type safety.
- `yarn test:unit` for pure unit tests.
- `yarn madge` when import graph or module boundaries changed.
- `yarn sanity` for the final template pass.
