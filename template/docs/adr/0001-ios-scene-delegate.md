# ADR 0001: Start React Native from a SceneDelegate on iOS

## Status

Accepted

## Context

React Native 0.88 adds UIScene lifecycle support. The community template now
starts React Native from a `SceneDelegate`, and its `AppDelegate` does nothing.
Apple deprecates the app-delegate window lifecycle, and new iOS APIs expect
scenes. The 0.88 release is non-breaking, so the old `AppDelegate` start still
works.

## Decision

`ios/SceneDelegate.swift` owns the React Native start. It creates the
`RCTReactNativeFactory` and the window, attaches the bootsplash in
`customize(_:)`, and forwards deep links and user activities to
`RCTLinkingManager`. `ios/AppDelegate.swift` only returns `true`. `Info.plist`
declares one scene configuration that points to `SceneDelegate`.

## Considered

- Keep the `AppDelegate` start. This works on 0.88, but a generated app then
  differs from `npx @react-native-community/cli init` output.
- Move to a `SceneDelegate`. A generated app matches upstream and the
  bootsplash README.

## Consequences

- Native code that needs the window, the root view, or incoming URLs goes in
  `SceneDelegate`, not in `AppDelegate`.
- Deep links go through `scene(_:openURLContexts:)` and
  `scene(_:continue:)`. `application(_:open:options:)` no longer receives them.
- The app supports one scene only (`UIApplicationSupportsMultipleScenes` is
  `false`).
