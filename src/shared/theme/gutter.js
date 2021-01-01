import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function deviceHeightPercentage(ratio) {
  return height * ratio;
}

export function deviceWidthPercentage(ratio) {
  return width * ratio;
}

const screenHeight = Math.max(width, height);
const screenWidth = Math.min(width, height);

export const screenSize = {
  height: screenHeight,
  width: screenWidth,
  widthHalf: screenWidth * 0.5,
  widthThird: screenWidth * 0.333,
  widthTwoThirds: screenWidth * 0.666,
  widthQuarter: screenWidth * 0.25,
  widthThreeQuarters: screenWidth * 0.75,
};

export const iPhoneXPadding = 34;

export const gutter = {
  small: 25,
  medium: 40,
};
