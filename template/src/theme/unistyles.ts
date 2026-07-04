import { StyleSheet } from 'react-native-unistyles';
import { DARK_THEME, LIGHT_THEME } from './colors';

export type AppThemes = {
  dark: typeof DARK_THEME;
  light: typeof LIGHT_THEME;
};

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
