# Troubleshooting

## Install And Runtime

- Run `yarn install --immutable` from the app root after changing dependencies.
- If Metro serves stale files, stop Metro and run `yarn start --reset-cache`.
- If TypeScript aliases fail, check both `tsconfig.json` and `babel.config.js`.

## iOS

- Run `bundle check || bundle install` before installing pods on a fresh
  machine.
- Use `yarn pod-install` after native dependency changes.
- If Xcode opens the wrong project, open the `.xcworkspace`, not `.xcodeproj`.

## Android

- Clean the app build from Android Studio or run the Gradle clean task when
  generated native files are stale.
- Check `android/app/src/main/res/values/strings.xml` when app naming looks
  wrong after template replacement.

## Validation

- `yarn lint` catches import boundaries, React Native style rules, and import
  order.
- `yarn tsc` catches strict TypeScript issues.
- `yarn test:unit` runs pure unit tests without a native app runtime.
- `yarn madge` detects circular dependencies.
