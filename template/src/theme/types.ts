import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { darkTheme, lightTheme } from './theme';

export type ThemeMode = 'dark' | 'light';

export type AppTheme = typeof lightTheme | typeof darkTheme;

export type AppThemes = {
  dark: typeof darkTheme;
  light: typeof lightTheme;
};

export type AppStyle = ViewStyle | TextStyle | ImageStyle;
