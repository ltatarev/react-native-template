import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isIPhoneX() {
  return isIOS() && DeviceInfo.hasNotch();
}

export function ifIPhoneX(iPhoneXStyle) {
  if (isIPhoneX()) {
    return iPhoneXStyle;
  }

  return {};
}

export function ifIOS(iOsStyle) {
  if (isIOS()) {
    return iOsStyle;
  }

  return {};
}

export function ifAndroid(androidStyle) {
  if (isAndroid()) {
    return androidStyle;
  }

  return {};
}

export function getStatusBarHeight() {
  if (isIOS()) {
    return isIPhoneX() ? 44 : 20;
  }

  return 0;
}
