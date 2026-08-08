import { Dimensions, Platform } from 'react-native';
import { getBuildNumber, getVersion, hasNotch } from 'react-native-device-info';

const { height, width } = Dimensions.get('window');
export { height, width };

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isIOSwithNotch() {
  return isIOS() && hasNotch();
}

export function getStatusBarHeight() {
  if (isIOS()) {
    return isIOSwithNotch() ? 44 : 20;
  }

  return 0;
}

/**
 * The marketing version and build, as one string: `1.4.0 (28)`.
 *
 * Wrapped here rather than read from the SDK in a screen (adapter rule), and
 * joined here rather than by each caller, so every place the app states its own
 * version states it the same way — a settings row, a support email, a log line.
 */
export function getAppVersion(): string {
  return `${getVersion()} (${getBuildNumber()})`;
}
