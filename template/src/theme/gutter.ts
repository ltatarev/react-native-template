/**
 * Device metrics.
 *
 * Spacing lives on the theme (`theme.gutter`, defined in `scales.ts`) — this
 * file is only for the screen dimensions that layout math needs outside a
 * `StyleSheet`. Prefer `rt.insets` / `rt.screen` from Unistyles inside styles;
 * these read once at module load and do not follow a rotation.
 */
import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function deviceHeightPercentage(ratio: number): number {
  return height * ratio;
}

export function deviceWidthPercentage(ratio: number): number {
  return width * ratio;
}

const screenHeight: number = Math.max(width, height);
const screenWidth: number = Math.min(width, height);

export const SCREEN_SIZE: Record<string, number> = {
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
