import { Dimensions, Platform } from 'react-native';
import { getDeviceId, hasNotch } from 'react-native-device-info';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
export { height, width };

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIOS() {
  return Platform.OS === 'ios';
}

// TODO: Hack for iPhone 14 lineup
// Remove after upgrading react-native-device-info
function isiOSWithNotch() {
  const deviceId = getDeviceId();

  return hasNotch() || _.startsWith(deviceId, 'iPhone15');
}

export function isIOSwithNotch() {
  return isIOS() && isiOSWithNotch();
}

export function getStatusBarHeight() {
  if (isIOS()) {
    return isIOSwithNotch() ? 44 : 20;
  }

  return 0;
}
