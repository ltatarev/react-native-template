# ADR 0001: Start React Native from a SceneDelegate on iOS

## Status

Accepted

## Context

React Native 0.88 adds UIScene lifecycle support. The community template now
starts React Native from a `SceneDelegate`, and its `AppDelegate` does nothing.
Apple deprecates the app-delegate window lifecycle, and new iOS APIs expect
scenes. An app built with the iOS 27 SDK does not launch without the UIScene
life cycle, so the old `AppDelegate` start works only on older SDKs.

## Decision

`ios/SceneDelegate.swift` owns the React Native start. It creates the
`RCTReactNativeFactory` and the window, attaches the bootsplash in
`customize(_:)`, and forwards deep links and user activities to
`RCTLinkingManager`. `ios/AppDelegate.swift` only returns `true`. `Info.plist`
declares one scene configuration that points to `SceneDelegate`.

## Considered

- Keep the `AppDelegate` start. This works on 0.88 with an older SDK, but the
  app does not launch when it is built with the iOS 27 SDK.
- Move to a `SceneDelegate`. A generated app matches upstream and the
  bootsplash README.

## Consequences

- Native code that needs the window, the root view, or incoming URLs goes in
  `SceneDelegate`, not in `AppDelegate`.
- Deep links go through `scene(_:openURLContexts:)` and
  `scene(_:continue:)`. `application(_:open:options:)` no longer receives them.
- `AppDelegate` declares `window`, and `SceneDelegate` sets it to the scene's
  window. Some native libraries read `UIApplication.shared.delegate.window`.
- `UIViewControllerBasedStatusBarAppearance` is `YES`. With the iOS 27 SDK,
  `StatusBar` style and visibility work only with this value (RN 0.88.1).
- The app supports one scene only (`UIApplicationSupportsMultipleScenes` is
  `false`).
