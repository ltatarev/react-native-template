# Growing The App

The template ships the layers every app needs and nothing above them. This is
the shape the next few layers take when a product actually needs them, drawn
from what the apps built on this template kept converging on.

Nothing here is installed. Each one adds native weight, and a template that
ships all of it makes every app pay for the app it is not. Add one when the
product asks for it, in the shape below, so the fifth app puts it in the same
place as the first.

## The Rule That Does Not Change

A capability package is never imported from a screen. Wrap it in a `utils/*`
adapter that exposes the smallest API the feature needs, and import the adapter.
That is what makes it possible to swap the package, mock it in a test, or find
every caller — and it is the one convention that everything below assumes.

## Bottom Tabs

**`@react-navigation/bottom-tabs`** — reached for as soon as an app has more than
one home.

The tab navigator goes in `modules/main/navigator.tsx`, wrapping the stack rather
than replacing it: pushed screens still need to cover the bar. Tab labels come
from `i18n`, tab icons from `theme/ui`'s `Icon`.

If the design calls for a floating bar rather than the platform one, that is a
`theme/ui` component fed by a custom `tabBar` prop — and every screen under it
needs bottom clearance, which is `Screen`'s `bottomClearance` prop reading one
shared token rather than each screen guessing a number.

## Sheets

**`@lodev09/react-native-true-sheet`** — when a JS sheet is not enough.

`theme/ui/Sheet` covers a sheet raised inside a screen. Reach for the native one
when a sheet needs real detents, a scroll view that hands off to the sheet's own
gesture, or to sit above a native tab bar. Its react-navigation integration also
makes a sheet a real route, with params and `goBack`.

Keep it behind `theme/ui/Sheet`'s API if you can, so features do not learn two
sheet shapes. The library should have one or two importers, not twenty.

## Notifications

**`@notifee/react-native`** — local scheduled notifications.

Two pieces, and keeping them apart is the point:

- `utils/notifications` — the adapter: permission, schedule, cancel, list. Knows
  nothing about the product.
- A module that owns *what* is scheduled and *when* — `modules/reminders` or
  similar — holding the rules, and a sync that reconciles what the OS is holding
  against what the app currently believes.

That reconciliation is not optional. A reinstall clears every scheduled
notification, the OS sends no event when one fires, and a notification for
something the user already dealt with is worse than none. Run it on launch and
on foreground (`utils/app-state`'s `useOnForeground`), and let it fail quietly —
a missing notification makes nothing on screen wrong.

## Local Database

**`@op-engineering/op-sqlite`** — when Redux Persist stops fitting.

The signal is not size, it is shape: a snapshot serialized on every change stops
working once the app has a list that grows without bound, needs to query rather
than filter in memory, or wants a write to be durable the instant it happens.

- `utils/sqlite` — the adapter: open, migrate, query, transaction.
- Migrations are ordered, forward-only, and run before anything reads. The app
  shell gates on that (`useSplashScreen(ready)` exists for this) — a screen that
  renders mid-migration shows a half-migrated row and then corrects itself under
  the reader.
- Redux keeps UI state. The database keeps records. Do not mirror one into the
  other and hope they stay in step.

## Images And Files

**`react-native-image-picker`**, **`@dr.pogodin/react-native-fs`** — anything the
user contributes.

- `utils/image-picker` — permission and pick, returning a plain descriptor
  rather than the library's shape.
- `utils/file-storage` — where files live, how they are named, and how they get
  cleaned up.

The part that always gets missed: a picked file lives in a cache the OS may empty.
Copy it somewhere owned before recording a path, and delete it when the record
that referenced it goes away, or the app grows without bound in a place the user
cannot see.

## Drawn Graphics

**`@shopify/react-native-skia`** — a chart, a generative surface, a custom
progress form. Note it needs `jest.unit.config.js` pointed at its own test
environment and setup file, or unit tests fail on import.

Anything Skia draws should also read at rest: check what it looks like with
`useReducedMotion` returning true before shipping it.

## Widgets

Home-screen widgets are native, and the app's job is only to keep the data they
read current — a `utils/widget` adapter writing to a shared container, driven by a
host component beside the navigator that syncs on state change and on foreground.

Write what the widget renders, not what the app knows. A widget that has to
compute anything is a widget that goes stale in a way nobody sees.

## Subscriptions

If the app charges: a `modules/purchase` module owning entitlement state, a
paywall screen, and a refresh on every foreground — an entitlement can be revoked
or refunded with no event to observe, and a cached `isActive` would otherwise
survive until the next cold launch.

Fail toward the paying user: if the refresh cannot reach the store, keep the
cached entitlement rather than locking out someone who is offline.
