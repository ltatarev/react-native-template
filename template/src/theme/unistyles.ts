import { StyleSheet } from 'react-native-unistyles';
import { darkTheme, lightTheme } from './theme';
import type { AppThemes } from './types';

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
  settings: {
    adaptiveThemes: true,
  },
});
