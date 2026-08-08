import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

/**
 * Hides the native splash once the app is ready to be looked at.
 *
 * `ready` exists because the splash is the app's only cover for the gap before
 * the first real frame — a migration, a database open, a rehydration. Hiding it
 * on mount regardless would flash an empty screen for as long as that takes.
 * Defaults to true for an app with nothing to wait on.
 */
export function useSplashScreen(ready: boolean = true): void {
  useEffect(() => {
    if (!ready) {
      return;
    }

    RNBootSplash.hide({ fade: true });
  }, [ready]);
}
