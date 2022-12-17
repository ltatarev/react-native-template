import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function deviceHeightPercentage(ratio) {
  return height * ratio;
}

export function deviceWidthPercentage(ratio) {
  return width * ratio;
}
