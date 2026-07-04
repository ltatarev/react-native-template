import { StyleSheet } from 'react-native-unistyles';
import { DARK_THEME, LIGHT_THEME } from './colors';

export type AppThemes = {
  dark: typeof DARK_THEME;
  light: typeof LIGHT_THEME;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    dark: DARK_THEME,
    light: LIGHT_THEME,
  },
  settings: {
    adaptiveThemes: true,
  },
});
