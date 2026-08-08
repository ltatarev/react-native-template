import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const hideHeader: NativeStackNavigationOptions = { headerShown: false };

export const hideHeaderLeft: NativeStackNavigationOptions = {
  headerBackVisible: false,
};

/**
 * How every screen above the app's base route is pushed.
 *
 * `headerShown` is stated rather than assumed: the root navigator hides the
 * header at its base, and a screen that says nothing about it inherits that by
 * luck rather than by intent.
 */
export const defaultScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTransparent: true,
  title: '',
};

/**
 * How a screen that is presented rather than pushed arrives.
 *
 * `fullScreenModal` rather than `modal`: a modal card leaves the page behind it
 * showing and rounds its own corners, which is right for something being filled
 * in and wrong for a surface meant to be the only thing on screen.
 */
export const modalScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  headerShown: false,
  presentation: 'fullScreenModal',
};

/**
 * How a screen that is a form arrives: the platform's own sheet, with the page
 * behind it visible and a drag-to-dismiss the reader already knows.
 *
 * Any keyboard-aware content inside needs `<Screen keyboardProvider />` — a
 * sheet presentation renders in a view hierarchy the app-root
 * `KeyboardProvider` cannot measure.
 */
export const sheetScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'formSheet',
};

/**
 * Reduce Motion cross-fades a push rather than sliding it in, which is what iOS
 * itself does under the setting. The screen still announces that it replaced the
 * one behind it; it just does not travel to get there. `'none'` would be the
 * harsher reading — the setting asks for less movement, not for the transition
 * to disappear.
 */
export function pushAnimation(
  reduceMotion: boolean,
): NativeStackNavigationOptions['animation'] {
  return reduceMotion ? 'fade' : 'slide_from_right';
}

/** The same reading, for a screen that is presented rather than pushed. */
export function modalAnimation(
  reduceMotion: boolean,
): NativeStackNavigationOptions['animation'] {
  return reduceMotion ? 'fade' : 'slide_from_bottom';
}
