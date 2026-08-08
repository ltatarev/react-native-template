import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { darkTheme, lightTheme } from './theme';

export type ThemeMode = 'dark' | 'light';

export type AppTheme = typeof lightTheme | typeof darkTheme;

export type AppThemes = {
  dark: typeof darkTheme;
  light: typeof lightTheme;
};

export type AppStyle = ViewStyle | TextStyle | ImageStyle;

/** A key of the spacing scale — what components take instead of a number. */
export type Spacing = keyof AppTheme['gutter'];

/** A step on the type scale. `Text` takes this as its `size`. */
export type FontSize = keyof AppTheme['typography']['fontSize'];

/** A color role. Anything that tints itself takes one of these, never a hex. */
export type ColorName = keyof AppTheme['colors'];
