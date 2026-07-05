import { Dimensions, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';

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
