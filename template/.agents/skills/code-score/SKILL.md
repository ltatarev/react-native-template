---
name: code-analyzer
description: >
  Analyze React Native code files against the Lumee project's conventions and return
  a structured review with specific, actionable fixes. Use this skill whenever the user
  shares React Native code and asks to review it, refactor it, check it against their
  conventions, or asks "does this follow my style?" — even if they don't explicitly
  mention conventions. Also trigger when the user says "clean this up", "this was vibe
  coded", or "make this match the rest of the codebase." Also trigger when the user
  asks to update, refresh, or sync this skill with the codebase — or when a review
  reveals the skill is out of date vs AGENTS.md / ESLint / actual patterns. When the user
  picks refactor action IDs from a review (e.g. "apply R-LAYER-01"), implement only
  those changes. Flag file placement (module vs utils vs theme) on every review.
---

# Code Analyzer (Lumee)

Analyze one or more React Native files against the conventions below.
Produce a structured review — no refactored code, just clear findings and precise fixes.

**Source of truth**: `AGENTS.md` (full detail), `eslint.config.mjs` + `@ltatarev/eslint-config-react-native` (enforced rules), `CONTEXT.md` (domain/sync terminology).

**Last synced**: 19.06.2026

---

## Your Conventions

### File & Folder Structure

**Package by feature** — each module under `src/modules/` is self-contained:

```md
src/modules/<feature>/
  screens/        # orchestration only — wire hooks, navigation, compose UI
  fragments/      # screen sections — one concern per file (feed module)
  components/     # presentational UI — handlers via props
  hooks/          # single-responsibility logic — composed by screens
  redux/          # slice.ts, thunks.ts, selectors.ts, index.ts
  orchestration/  # cross-slice flows (connection module)
```

**Shared code locations** (never put these inside a feature module):

| What          | Where                | Import as                    |
| ------------- | -------------------- | ---------------------------- |
| Shared UI     | `src/theme/ui/`      | `theme/ui` or `theme/ui/...` |
| Shared utils  | `src/utils/`         | `utils/...`                  |
| Shared types  | `src/common/types/`  | `common/types/...`           |
| Global assets | `src/assets/`        | `assets/...`                 |
| i18n          | `i18n/` (repo root)  | `react-i18next`              |
| Root store    | `src/modules/redux/` | `modules/redux`              |

**Module boundary rule** (ESLint `no-restricted-imports`):

- Cross-module imports use `modules/<name>` only — never `modules/<name>/redux/slice` etc.
- **Exceptions** (deep imports allowed): `modules/**/redux/**`, `modules/**/orchestration/**`, `modules/sync/**`, `modules/redux/store.ts`, `modules/feed/persist/**`, `modules/widget/services/syncWidgetPayload.ts`
- Module components are **not** shared between modules
- If used by one module only, keep it in that module
- Do **not** use `@/` path aliases — use `modules/*`, `theme/*`, `utils/*`, `common/*`, `assets/*`

**File naming**:

| Kind               | Pattern                                 | Example                 |
| ------------------ | --------------------------------------- | ----------------------- |
| Component / screen | `PascalCase.tsx`                        | `ActiveImageModal.tsx`  |
| Hook               | `useXxx.ts`                             | `useImageActions.ts`    |
| Utility            | `camelCase.ts`                          | `formatDate.ts`         |
| Redux              | `slice.ts`, `thunks.ts`, `selectors.ts` | —                       |
| Navigator          | `navigator.tsx`                         | —                       |
| Platform-specific  | `.ios.tsx` / `.android.tsx`             | complex platform splits |

One primary export per component file. Prefer **named exports**; default exports only in legacy utils and `i18n/index.ts`.

### File Placement (is it in the right place?)

Every review must assess **whether the file belongs in its current path**. Check path, imports, and consumers — not just code style.

#### Top-level: where should this file live?

| Question | If yes → place in |
| --- | --- |
| Used by **one feature only** (or only meaningful in one domain) | `src/modules/<feature>/` |
| Used by **2+ modules**, no feature-specific Redux/domain rules | `src/utils/<topic>/` |
| Shared **design-system UI** (no `modules/*` imports) | `src/theme/ui/` |
| Shared **type** across modules | `src/common/types/` |
| Global static asset | `src/assets/` |
| Module-specific asset (settings icon, feed-only image) | `src/modules/<feature>/assets/` |
| Instagram HTTP / scrape client | `src/utils/instagram/` (not module code) |
| Feature Redux slice/thunk/selector | `src/modules/<feature>/redux/` |
| iCloud sync infrastructure | `src/modules/sync/` |
| Cross-slice Instagram connection flow | `src/modules/connection/` |

**Default**: when unsure, grep importers (`rg "from 'modules/feed"`, `rg "usePhotoLibraryAccess"`). One consumer in one module → keep in that module.

#### Within a module: correct subfolder?

| File kind | Belongs in | Not in |
| --- | --- | --- |
| Route / navigator target | `screens/` | `components/`, `fragments/` |
| Screen section (one pane/area) | `fragments/` | `screens/`, `components/` |
| Presentational module UI | `components/` | `screens/`, `theme/ui/` (unless truly generic) |
| Feature logic hook | `hooks/` | `utils/`, `redux/`, `components/` |
| Slice / thunk / selector | `redux/` | `hooks/` (business dispatch stays in thunks; hooks call thunks) |
| Module constants / routes | `const.ts` or module root | scattered in components |
| Persist / sync adapter for feature | `persist/`, `sync/` under module | `utils/` |

#### Misplacement signals

| Signal | Severity | Likely fix |
| --- | --- | --- |
| `theme/ui/*` imports `modules/*` | 🔴 High | Move to module `components/` or strip domain logic |
| `utils/*` imports `modules/*` (except storage/sync adapters) | 🔴 High | Move to module `hooks/` or `redux/` |
| Pure helper (date, array, string) in `modules/*/hooks/` | 🟡 Medium | Move to `utils/` |
| Screen file in `components/` | 🟡 Medium | Move to `screens/` |
| Component with no reuse outside one screen in `components/` | 🟢 Low | Consider `fragments/` if single-screen only |
| Hook only used by one other hook in same folder | 🟢 Low | OK as sub-hook; don't export from barrel unless needed |
| File imports its own subfolder barrel (`hooks/x` → `../hooks`) | 🔴 High | Use direct sibling import (`./useAvatarChange`) |
| Module A imports module B's `components/` or `hooks/` subpath | 🔴 High | Wrong module ownership — move shared code up to `utils/` or `theme/ui/`, or expose via `modules/<name>` barrel |
| Domain logic in `utils/instagram/` | 🟡 Medium | Keep HTTP in utils; move orchestration to module thunks |

#### Placement review checklist

1. **Path vs role** — does the folder name match what the file does (screen vs hook vs util)?
2. **Import direction** — `utils/` and `theme/ui/` must not depend on feature modules
3. **Consumer count** — who imports this file? Same module only → stay; multiple modules → promote to shared layer
4. **Domain coupling** — feed asset merge, sync ports, connection matchers belong in their owning module
5. **Barrel exposure** — should it be exported from `modules/<feature>/index` or stay internal?

**References**: `utils/permissions/` (generic) composed by `modules/feed/hooks/usePhotoLibraryAccess.ts` (feed-specific). `theme/ui/Button.tsx` (generic) vs `modules/feed/components/FooterMenu.tsx` (feed-only).

### Component Patterns

- **Functional components only** — no class components
- Export as `export function ComponentName(...)` (not `const ComponentName = () =>`)
- Props type defined **above** the component as `type XxxProps = { ... }`
- Optional props must have **default values** in the destructuring signature
- Import shared primitives from `theme/ui` (`Text`, `View`, `Button`, `Touchable`, …) — not raw RN equivalents when a themed wrapper exists
- Use `React.memo`, `useMemo`, `useCallback` when profiling warrants it — don't blanket-wrap everything
- Long lists: `FlatList` — never `ScrollView` + `.map()` for long feeds

**JSX props order** (ESLint `react/jsx-sort-props` — error):

1. `key` (reserved, always first)
2. Shorthand props (`disabled`, `accessible`)
3. Regular props (alphabetically)
4. Callbacks (`onPress`, `onChangeText`, …) — always last

### Layer Responsibilities (keep files simple)

**Default rule**: one file, one job. If a file mixes orchestration, business logic, and layout — split it.

#### Screens (`screens/`)

High-level **orchestrators** only. A screen should:

- Read route params, navigation, and top-level selectors
- Compose focused hooks (`useCaption`, `useDateSelection`, …)
- Wire hook outputs into fragments/components as props
- Own screen-level layout concerns (pager, modal shell, conditional branches)

A screen should **not**:

- Contain detailed business logic (validation, API calls, clipboard, permissions)
- Hold large `useEffect` blocks with multi-step workflows
- Render deep JSX trees inline — extract to fragments/components
- Dispatch many unrelated Redux actions inline — move to a hook

**Reference**: `ActiveImageModal.tsx` — hooks + fragment composition, minimal inline logic.

#### Fragments (`fragments/`)

Screen **sections** with a single responsibility (e.g. edit pane, image pane, settings section).

- Layout + composition of `theme/ui` and module components
- Receive data and handlers entirely via props
- May hold local UI-only state (scroll offset, animation shared values)
- One visual concern per file — split when a fragment handles two modes/sections

A fragment should **not**:

- Call `useAppDispatch`, fetch data, or own cross-screen side effects
- Duplicate hook logic that belongs at the screen level

**Reference**: `EditView.tsx` — layout + `CaptionInput`, all handlers passed in.

#### Module components (`components/`)

**Presentational UI** — reusable within the module.

- Props in, JSX out — all handlers passed as `onXxx` callbacks
- No Redux (`useAppSelector` / `useAppDispatch`) — parent screen/hook owns data
- No navigation — receive `onPress` / `onDismiss` from parent
- Styling and accessibility only; no business rules beyond display conditions

**Reference**: `FooterMenu.tsx` — icons, touch targets, `onEditPress` / `onBackPress` props.

`theme/ui/` components follow the same presentational rule at the design-system level.

#### Hooks (`hooks/`)

**Single responsibility** — one cohesive concern per hook.

- Name reflects scope: `useCaption`, `useSaveStatus`, `useDateSelection`
- Compose smaller hooks at the **screen** when flows intersect — don't build god-hooks
- Return a focused API: state + handlers the screen/fragment needs
- Side effects (permissions, clipboard, dispatch) live here — not in components

A hook should **not**:

- Cover unrelated domains (e.g. caption editing + photo permissions + menu building in one hook unless tightly coupled)
- Exceed what one screen area needs — extract sub-hooks when responsibilities diverge
- Render JSX (hooks return data/callbacks only)
- Import sibling hooks via the folder barrel (`from '../hooks'`) — use `from './useX'` instead

**Reference**: `useSaveStatus.ts` (save indicator only) composed alongside `useCaption.ts` (caption editing only) in `ActiveImageModal`.

#### Review signals (split the file when you see)

| Signal | Severity | Action |
|--------|----------|--------|
| Screen > ~250 lines or hard to scan | 🟡 Medium | Extract fragments; move logic to hooks |
| Component imports `modules/redux` or dispatches | 🔴 High | Move data/logic to screen hook; pass props |
| Fragment with `useEffect` + dispatch | 🔴 High | Lift to screen-level hook |
| Hook name is vague (`useStuff`, `useHelpers`) | 🟡 Medium | Split/rename by responsibility |
| Hook handles 3+ unrelated concerns | 🔴 High | Decompose into focused hooks |
| Duplicate handler logic across screen and fragment | 🟡 Medium | Consolidate in one hook |

### State Management

| Concern                   | Approach                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- |
| Global app state          | Redux Toolkit slices in `modules/<feature>/redux/`                                      |
| Async remote data         | `createAsyncThunk` via typed `createAppAsyncThunk` — **not** RTK Query                  |
| HTTP to Instagram         | `utils/instagram/` (axios) → module thunks                                              |
| Local UI state            | `useState` / `useRef`                                                                   |
| Persisted preferences     | MMKV via `StorageService` (`utils/storage/`)                                            |
| Cross-slice orchestration | `modules/connection/` matchers — not direct cross-slice dispatches from UI              |
| iCloud sync               | `SyncPort` / `StoreApplierPort` — register via `modules/feed/sync`, `modules/user/sync` |
| Prop drilling             | Avoid beyond 2 levels — use Redux or Context                                            |

**Redux file layout per module**: `slice.ts`, `thunks.ts`, `selectors.ts`, `index.ts` (barrel).

**Hooks rules**:

- Never call `setState` **synchronously** in a `useEffect` body — initialize in `useState` instead
- `useCallback` / `useMemo`: include **all** inferred dependencies, including `setState` functions (React Compiler requirement)
- Use `useAppSelector` / `useAppDispatch` from `modules/redux` — not raw `useSelector`

### Styling Approach

- Import `StyleSheet` from `react-native-unistyles` — **never** from `react-native`
- `StyleSheet.create(theme => ({ ... }))` at bottom of file; static styles may use `StyleSheet.create({ ... })`
- Theme tokens only: `theme.colors.*`, `theme.spacing.*`, `theme.border.radii.*` — color literals live in `theme/theme.ts` only
- Dynamic sizing/colors derived from props (e.g. avatar diameter) are acceptable inline exceptions
- Platform splits: `Platform.select` for simple cases; `.ios.tsx` / `.android.tsx` for complex

**ESLint-enforced styling rules** (all errors unless noted):

| Rule                                          | Requirement                                         |
| --------------------------------------------- | --------------------------------------------------- |
| `react-native/no-inline-styles`               | No inline `style={{ ... }}`                         |
| `react-native/no-color-literals`              | No `'#fff'` etc. in components                      |
| `react-native/no-unused-styles`               | Remove dead style keys                              |
| `react-native/no-single-element-style-arrays` | `[styles.foo]` → use `styles.foo` directly          |
| `react-native/sort-styles`                    | Style properties sorted                             |
| `react-native/no-raw-text`                    | Text must be in `<Text>` (warning; `Label` skipped) |

### Naming Conventions

| Symbol                | Convention              | Example           |
| --------------------- | ----------------------- | ----------------- |
| Components / screens  | PascalCase              | `FeedScreen`      |
| Hooks                 | camelCase, `use` prefix | `useImageActions` |
| Functions / variables | camelCase               | `handleSubmit`    |
| Constants (values)    | SCREAMING_SNAKE_CASE    | `MAX_RETRY_COUNT` |
| Types                 | PascalCase              | `AssetPayload`    |
| Props types           | `XxxProps`              | `ButtonProps`     |
| Redux slice           | `featureSlice`          | `feedSlice`       |
| Selectors             | `featureSelectors`      | `feedSelectors`   |

Avoid TypeScript `enum` — use `const STATUS = { ... } as const` + derived union type.

### TypeScript Usage

- `strict: true` always
- Never `any` — use `unknown` when truly unknown
- Prefer `type` over `interface` for object shapes (use `interface` only when extending external types)
- Explicit types on function parameters; explicit return types on hooks and public utilities
- Prefer `undefined` over `null` for optional values
- Use `import type { ... }` for type-only imports

### Imports

**Order** (ESLint `simple-import-sort/imports` — error; auto-fix with `yarn lint --fix`):

1. `react` / `react-native` packages
2. External packages (`@react-navigation`, `react-native-unistyles`, …)
3. Side-effect imports
4. Alias imports (`modules/*`, `theme/*`, `utils/*`, `common/*`)
5. Parent relative (`../`)
6. Same-folder (`./`)

Blank line between groups. No unused imports (`unused-imports/no-unused-imports` — warn).

**Barrel imports — avoid circular dependencies**:

Barrels (`index.ts`) are for **external** consumers. A file must not import
through a barrel that re-exports it.

| You are in | ❌ Avoid | ✅ Use instead |
| --- | --- | --- |
| `hooks/useSettingsScreen.ts` | `from '../hooks'`, `from 'modules/settings/hooks'` | `from './useAvatarChange'` |
| `components/Foo.tsx` | `from '../components'` | `from './Bar'` |
| `redux/thunks.ts` | `from '../redux'` when index re-exports thunks | `from './slice'`, `from './selectors'` |
| `modules/foo/**` (internal file) | `from 'modules/foo'` (own module root barrel) | direct `./` or `../` path to the file |

**OK**: screens/fragments import child barrels (`from '../hooks'`,
`from '../components'`). Other modules import via `modules/<name>`. One-way
`hooks/` → `../redux` is fine when redux does not import hooks.

### Internationalization

- All user-facing strings via `useTranslation()` + `t('key.path')`
- Keys in `i18n/en_EN.json` — nested keys, `{{interpolation}}` as needed
- Accessibility labels and hints also use `t()` — never hardcoded English in UI

### Accessibility

Enforced by `eslint-plugin-react-native-a11y` (all rules) + `jsx-a11y`:

- Every interactive element: `accessible`, `accessibilityRole`, `accessibilityLabel`
- `accessibilityHint` recommended
- Images: `accessibilityLabel` required

### API / Data Fetching

- Wrap in `createAppAsyncThunk` in the relevant module's `redux/thunks.ts`
- Update slice `extraReducers` for fulfilled/rejected
- Catch in axios layer → `ErrorService.captureError('Feature.action', error)`
- Throw from thunks when UI needs rejection handling
- Do **not** add RTK Query or axios calls scattered in components/hooks
- Do **not** hardcode API URLs — use `react-native-config`

### External Services

| Service   | Wrapper                                    | Do not import directly                                                           |
| --------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Sentry    | `ErrorService` (`utils/error-handling/`)   | `@sentry/react-native` (except `Sentry.wrap` in `modules/main/screens/index.ts`) |
| Amplitude | `TrackingService` (`utils/tracking.ts`)    | `@amplitude/...`                                                                 |
| Storage   | `StorageService` / MMKV (`utils/storage/`) | `@react-native-async-storage/async-storage`                                      |

Screen tracking via `useScreenTrack` in main module — not per-screen Amplitude calls.

### Reanimated & Worklets

- Call JS from worklets via `scheduleOnRN` from `react-native-worklets` — **never** `runOnJS` from `react-native-reanimated`
- Use `useSharedValue` (not `useRef`) when values are read in worklets
- Mark worklet callbacks with `'worklet'` directive

### Code Style (ESLint / Prettier)

| Rule                | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| Max line length     | 90 chars (`max-len` — error)                             |
| Quotes              | single (`prettier`)                                      |
| Trailing commas     | all                                                      |
| `const` vs `let`    | `const` by default (`prefer-const` — warn)               |
| `var`               | never                                                    |
| `console.log`       | warn — use `Logger` in `__DEV__`, `ErrorService` in prod |
| `no-param-reassign` | error — except Redux `state` / Immer `draft`             |

### Domain-Specific (flag when reviewing sync/feed code)

When files touch iCloud sync, feed persist, or connection flows, check terminology against `CONTEXT.md`:

- Use **Asset** (not post/image) for feed item metadata in Redux
- Use **SyncPort** — not direct `SyncManager` imports in app code
- Feed persist shape owned by `modules/feed/persist/` — no hard-coded `'feed/assets'` outside feed module
- Image files vs local paths — never sync `file://` URIs to iCloud

---

## Analysis Process

When given code to analyze:

1. **Identify the file type** — screen, fragment, component, hook, utility, redux, API layer, native module, test
2. **Assess file placement** — current path vs role, consumers, import direction (see **File Placement**)
3. **Check layer responsibilities** — screens orchestrate, fragments section, components present, hooks own logic
4. **Check applicable convention sections** above (skip sections that don't apply)
5. **Cross-check ESLint rules** — violations listed in styling/imports/accessibility tables are errors in CI
6. **Find every violation** — be specific (line numbers when visible, symbol names always)
7. **Map violations to refactor action IDs** — from the catalog below; include in output
8. **Ignore non-violations** — don't invent issues; flag ambiguity as a question
9. **Note pre-existing patterns** — if the file matches established module style, say so
10. **Watch for skill drift** — if repo patterns contradict this skill, follow **Self-Update**

**Quick ESLint parity check** (run mentally or suggest `yarn lint <file>`):

- `no-restricted-imports` — module boundary
- Same-folder barrel import — file imports `../hooks`, `../components`, `../redux`, or `modules/<own-module>` while inside that barrel's tree
- `react/jsx-sort-props` — prop order
- `simple-import-sort/imports` — import order
- `react-native/no-inline-styles`, `no-color-literals`, `no-unused-styles`
- `react-native-a11y/*` — accessibility
- `max-len` — 90 chars

---

## Output Format

Produce a review in this structure:

### 📋 File: `filename.tsx`

**Type:** Screen / Fragment / Component / Hook / Utility / Redux / API / Native / Test

#### Placement

| Verdict | Current path | Suggested path | Why |
| --- | --- | --- | --- |
| ✅ / ⚠️ / 🔴 | `src/modules/feed/hooks/useX.ts` | `—` or target path | One-line rationale (consumers, imports, domain) |

Skip this section only for test files where path is standard (`*.test.ts` next to source).

#### Violations

| #   | Severity  | Area            | What's Wrong                                           | How to Fix                                     |
| --- | --------- | --------------- | ------------------------------------------------------ | ---------------------------------------------- |
| 1   | 🔴 High   | Module boundary | `import { feedSlice } from 'modules/feed/redux/slice'` | Import from `modules/feed` barrel              |
| 1b  | 🔴 High   | Barrel / circular | `import { useX } from '../hooks'` inside `hooks/` | `import { useX } from './useX'`                |
| 2   | 🟡 Medium | Styling         | Inline style on line 34                                | Move to `StyleSheet.create` at bottom          |
| 3   | 🟡 Medium | i18n            | Hardcoded `"Save"` on line 52                          | Use `t('feed.save')` + add key to `en_EN.json` |
| 4   | 🔴 High   | Layer           | `FeedCard` dispatches `feedActions` on line 88         | Move dispatch to hook; pass `onSave` prop      |

#### Refactor Action Items

Pick by ID — e.g. `apply R-LAYER-01, R-NAME-01` or `refactor all 🔴 items`.

| ID | Severity | Action | Scope |
| --- | --- | --- | --- |
| R-LAYER-01 | 🔴 | Split god-hook into focused hooks + thin composer | hooks/ |
| R-LAYER-02 | 🟡 | Extract screen section into `fragments/` | screens/ |
| R-LAYER-03 | 🔴 | Lift Redux/dispatch from component to hook; pass props | components/ |
| R-LAYER-04 | 🟡 | Extract repeated JSX into `components/` | screens/ |
| R-NAME-01 | 🟡 | Rename props type to `UseXxxParams` | hooks, components |
| R-NAME-02 | 🟡 | Add explicit `UseXxxReturn` on hooks | hooks/ |
| R-TS-01 | 🟢 | Remove unnecessary non-null assertions | any |
| R-TS-02 | 🔴 | Replace `any` with proper type or `unknown` | any |
| R-HOOK-01 | 🟡 | Fix `useCallback`/`useMemo` dependency arrays | hooks/ |
| R-HOOK-02 | 🟡 | Move sync `setState` from effect body to `useState` init | hooks, components |
| R-STYLE-01 | 🟡 | Move inline styles to Unistyles `StyleSheet` | components, screens |
| R-STYLE-02 | 🟡 | Replace color literals with theme tokens | components, screens |
| R-I18N-01 | 🟡 | Extract hardcoded UI string to `i18n/en_EN.json` | UI files |
| R-A11Y-01 | 🔴 | Add missing `accessibilityRole` / `accessibilityLabel` | UI files |
| R-IMPORT-01 | 🟡 | Fix import order (`yarn lint --fix`) | any |
| R-IMPORT-02 | 🔴 | Fix module boundary import (use barrel) | any |
| R-IMPORT-03 | 🔴 | Replace same-folder barrel import with direct `./` path | hooks/, components/, redux/ |
| R-PLACE-01 | 🔴 | Move file to correct feature module | misplaced domain code |
| R-PLACE-02 | 🟡 | Promote generic helper to `utils/` | 2+ modules, no domain deps |
| R-PLACE-03 | 🟡 | Move shared UI to `theme/ui/` | design-system, no `modules/*` imports |
| R-PLACE-04 | 🟡 | Move shared type to `common/types/` | cross-module type |
| R-PLACE-05 | 🟡 | Fix within-module subfolder | wrong screens/components/hooks folder |
| R-ERROR-01 | 🟢 | Add `Logger.warn` in `__DEV__` for swallowed catch blocks | hooks, utils |
| R-CLEAN-01 | 🟢 | Remove stale TODO / dead code | any |

Add file-specific IDs only when no catalog ID fits — format: `R-CUSTOM-01` with description.

#### Questions (if any)

- Unclear whether X is intentional — [explain ambiguity]

#### Summary

X violations found across Y areas. Most issues are in [area]. [Or: file follows conventions — no violations found.]

When multiple files are shared, produce one review block per file, then a **cross-file summary** with a combined **Refactor Action Items** table (deduplicated IDs).

### Applying refactor actions

When the user picks action IDs or says "refactor based on findings":

1. Implement **only** the selected IDs (or all 🔴 High if they say "fix critical")
2. Keep diffs scoped — one concern per commit if they later ask to commit
3. Run `yarn lint` on changed files; fix errors you introduce
4. Run `yarn tsc` if types changed
5. Report which IDs were applied and what changed

Do **not** refactor unless the user asks — reviews output action items; application is opt-in.

---

## Refactor Action Catalog

Stable IDs for pick-and-apply workflows. Map violations to these first; add `R-CUSTOM-*` only when needed.

| ID | When to suggest | What to do |
| --- | --- | --- |
| **R-LAYER-01** | Hook has 3+ unrelated concerns or >~200 lines | Extract focused hooks (`usePhotoLibraryAccess`, `useImageMenuItems`, …); leave thin composer |
| **R-LAYER-02** | Screen >~250 lines or deep inline JSX | Extract `fragments/` per screen section |
| **R-LAYER-03** | Component/fragment uses `useAppDispatch` / `useAppSelector` | Move to hook; pass data + `onXxx` props |
| **R-LAYER-04** | Same JSX block repeated in one screen | Extract to `components/` |
| **R-NAME-01** | Props type not `UseXxxParams` / `XxxProps` | Rename to match codebase |
| **R-NAME-02** | Hook lacks explicit return type | Add `UseXxxReturn` |
| **R-TS-01** | Unnecessary `!` on typed values | Remove assertion |
| **R-TS-02** | `any` in strict code | Narrow type |
| **R-HOOK-01** | Incomplete hook deps (incl. `setState`) | Add all inferred dependencies |
| **R-HOOK-02** | Sync `setState` in `useEffect` body | Initialize in `useState` |
| **R-STYLE-01** | Inline `style={{ }}` | Unistyles stylesheet |
| **R-STYLE-02** | Color literals in components | `theme.colors.*` |
| **R-I18N-01** | Hardcoded user-facing string | `t('key')` + `en_EN.json` |
| **R-A11Y-01** | Missing a11y on interactive element | `accessible`, `accessibilityRole`, `accessibilityLabel` |
| **R-IMPORT-01** | Import order violation | `yarn lint --fix` |
| **R-IMPORT-02** | Deep `modules/foo/bar` import | `modules/foo` barrel |
| **R-IMPORT-03** | File imports its own subfolder or module barrel | `./file` sibling import; never `../hooks` from `hooks/` |
| **R-PLACE-01** | File in wrong feature module | Move to owning `modules/<feature>/` |
| **R-PLACE-02** | Generic util/hook in module, used elsewhere | Move to `utils/<topic>/` |
| **R-PLACE-03** | Reusable UI in module, no domain imports | Move to `theme/ui/` |
| **R-PLACE-04** | Type duplicated or scoped to wrong module | Move to `common/types/` |
| **R-PLACE-05** | Wrong subfolder (screen in `components/`, etc.) | Move within module tree |
| **R-ERROR-01** | Empty `catch` with no visibility | `Logger.warn` in `__DEV__` |
| **R-CLEAN-01** | Stale TODO, unused styles/imports | Remove or track in issue tracker |

Extend this catalog during **Self-Update** when a new recurring fix pattern emerges.

---

## Severity Guide

- 🔴 **High** — contradicts core structure: wrong module boundary, **same-folder barrel import (circular dep risk)**, **wrong file placement**, missing types, `any`, direct SDK imports, wrong state management, sync/domain boundary violations, accessibility blockers, business logic in components/fragments, god-hooks
- 🟡 **Medium** — ESLint errors or visible review issues: import order, prop order, inline styles, hardcoded strings, `useCallback` deps, synchronous `setState` in effect, bloated screens, vague hook scope, **questionable placement** (generic code in module)
- 🟢 **Low** — warnings and polish: `console.log`, line length, unused imports, minor naming inconsistency, missing `accessibilityHint`

---

## Self-Update (keep this skill current)

This skill must stay aligned with the repo. **Update `.cursor/skills/code-score/SKILL.md` directly** when triggered — do not create a separate doc.

### When to self-update

- User asks to update, refresh, or sync the code-score / conventions skill
- A review finds the skill contradicts `AGENTS.md`, ESLint, or widespread codebase patterns
- `AGENTS.md`, `eslint.config.mjs`, `tsconfig.json`, or `CONTEXT.md` changed materially since **Last synced**
- New enforced lint rules or path aliases were added
- A new architectural pattern is adopted project-wide (e.g. new state library, new import alias)

### Self-update process

1. **Re-read sources** (in parallel where possible):
   - `AGENTS.md` — conventions, anti-patterns, file structure
   - `eslint.config.mjs` — project-specific rule overrides
   - `node_modules/@ltatarev/eslint-config-react-native/index.js` — RN style rules
   - `node_modules/@ltatarev/eslint-config-react/index.js` — import sort, max-len, jsx-sort-props
   - `tsconfig.json` — path aliases
   - `.prettierrc.json` — formatting
   - `CONTEXT.md` — domain/sync terminology (if sync/feed sections exist)
   - 2–3 representative “good” files per category (screen, hook, `theme/ui` component)

2. **Diff against current skill** — list what changed, was added, or was removed in the repo

3. **Edit only `.cursor/skills/code-score/SKILL.md`**:
   - Update affected sections under **Your Conventions** — distill rules, don't paste all of `AGENTS.md`
   - Refresh ESLint rule tables if rules changed
   - Update module-boundary exceptions if `eslint.config.mjs` `no-restricted-imports` overrides changed
   - Bump **Last synced** date at the top
   - Keep frontmatter `description` accurate if trigger scenarios changed

4. **Preserve skill shape** — do not remove Analysis Process, Output Format, Refactor Action Catalog, Severity Guide, or Self-Update sections

5. **Report to user** — short changelog: what was updated and why (no need to dump the full file)

### Self-update constraints

- **Distill, don't duplicate** — skill is a review checklist; `AGENTS.md` stays the long-form reference
- **Only document enforced or de-facto conventions** — not one-off patterns in a single file
- **Don't invent rules** — if unsure whether something is a convention, sample more files or flag as a question
- **Don't edit** `AGENTS.md`, `eslint.config.mjs`, or app code unless the user explicitly asks
- **Stay under ~350 lines** — if growing too large, tighten tables and move edge-case detail to a bullet under the relevant section

### Drift detection during reviews

If reviewing code surfaces a mismatch between this skill and the repo:

1. Note it in the review **Questions** section
2. Offer to self-update the skill (or self-update immediately if the user said "sync skill" / "update conventions")
3. After self-update, re-run the review if the user wants confirmation

---

## Notes

- `AGENTS.md` is the canonical reference when this skill and the codebase diverge — **self-update the skill** when drift is confirmed, don't leave stale rules
- Don't suggest RTK Query, AsyncStorage, plain RN `StyleSheet`, or `@/` imports — these are explicitly out of scope for this project
- Flag same-folder barrel imports (`hooks/x.ts` → `../hooks`) as 🔴 — use `R-IMPORT-03`
- Pre-existing tsc errors in untouched files are out of scope unless the review target introduced them
- **Reviews** output violations + refactor action IDs — apply refactors only when the user picks IDs or asks to refactor
