# React Native Template

Opinionated production starter for React Native apps. The template includes a
strict TypeScript setup, Redux Toolkit, stack navigation, MMKV-backed
persistence, Unistyles theme tokens, i18n, shared UI primitives, and small
app-facing adapters for native capabilities.

## Usage

Make sure your machine is ready for React Native development, then create a new
app from the template:

```sh
npx react-native init MyApp --template https://github.com/ltatarev/react-native-template.git
```

Current template runtime:

- React Native `0.86.0`
- React `19.2.3`
- Node.js `>=22.11.0`
- Yarn `4.17.0`

## Setup

From a generated app or the `template/` directory in this repository:

```sh
corepack enable
yarn
bundle install
yarn install-pods
```

Run the app:

```sh
yarn start
yarn ios
yarn android
```

## Scripts

| Script              | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `yarn lint`         | Run ESLint flat config.                      |
| `yarn tsc`          | Run strict TypeScript without emitting files. |
| `yarn test:unit`    | Run the unit Jest harness.                   |
| `yarn madge`        | Check circular dependencies.                 |
| `yarn madge:image`  | Generate a dependency graph image.           |
| `yarn sanity`       | Run lint, TypeScript, and Madge checks.      |
| `yarn install-pods` | Install iOS Pods through Bundler.            |

## Architecture

```text
src/
├── modules/
│   ├── home/      # Neutral reference feature
│   ├── main/      # App shell and root navigator
│   └── redux/     # Store, persistor, typed hooks
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

The codebase is package-by-feature. Feature modules live under
`src/modules/<feature>` and expose their public API through
`src/modules/<feature>/index.ts`.

Cross-module imports should use the public module surface:

```ts
import { HomeScreen } from 'modules/home';
```

Do not reach into another module's internals:

```ts
import { HomeScreen } from 'modules/home/screens/HomeScreen';
```

ESLint enforces this with `no-restricted-imports`.

## Aliases

Aliases are configured in both TypeScript and Babel.

| Alias       | Resolves to     |
| ----------- | --------------- |
| `assets/*`  | `src/assets/*`  |
| `common/*`  | `src/common/*`  |
| `modules/*` | `src/modules/*` |
| `theme/*`   | `src/theme/*`   |
| `utils/*`   | `src/utils/*`   |

## Styling

Styling uses `react-native-unistyles`.

- Import `StyleSheet` from `react-native-unistyles`.
- Keep shared primitives in `src/theme/ui`.
- Use tokens from `theme.ts` for colors, typography, gutter, radii, shadow, and
  z-index.
- Avoid color literals in feature UI.

Example:

```ts
const styles = StyleSheet.create(theme => ({
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.gutter.md,
  },
}));
```

## State And Persistence

- Root store setup lives in `src/modules/redux`.
- Use `useAppDispatch` and `useAppSelector` from `modules/redux`.
- Feature state uses Redux Toolkit slices and selectors.
- Redux persistence uses MMKV through `utils/storage`.

## Internationalization

i18n is initialized from `src/index.ts`.

- Resources live in `i18n/en_EN.json`.
- Components use `useTranslation()` from `react-i18next`.
- User-facing feature text should render through `t(...)`.

## Adapters

Feature code should not import native SDKs directly. Use the app-facing
adapters in `src/utils`:

- `utils/storage`
- `utils/toast`
- `utils/logger`
- `utils/error-handling`
- `utils/haptic-feedback`

## Adding A Module

1. Create `src/modules/<name>/const.ts` with `MODULE_NAME`.
2. Create `src/modules/<name>/index.ts` as the public surface.
3. Add screens under `screens/`.
4. Add Redux slice/selectors under `redux/` if the module owns state.
5. Register the reducer in `modules/redux/store.ts` when needed.
6. Add text keys to `i18n/en_EN.json`.
7. Style screens with Unistyles and theme tokens.
8. Export only the API other modules need from the module barrel.

## Agent Context

Template-specific coding guidance lives in:

- `template/AGENTS.md`
- `template/CONTEXT.md`
