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

export const SCREEN_SIZE = {
  w: screenWidth,
  'w-1/2': screenWidth * 0.5,
  'w-1/3': screenWidth * 0.333,
  'w-2/3': screenWidth * 0.666,
  'w-1/4': screenWidth * 0.25,
  'w-2/4': screenWidth * 0.5,
  'w-3/4': screenWidth * 0.75,
  h: screenHeight,
  'h-1/2': screenHeight * 0.5,
  'h-1/3': screenHeight * 0.333,
  'h-2/3': screenHeight * 0.666,
  'h-1/4': screenHeight * 0.25,
  'h-2/4': screenHeight * 0.5,
  'h-3/4': screenHeight * 0.75,
};

export const iPhoneXPadding = 34;

export const gutter = {
  small: 25,
  medium: 40,
};
