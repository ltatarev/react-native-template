import { StyleSheet } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../theme';

let configured = false;

export function configureAppThemes(): void {
  if (configured) {
    return;
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

  configured = true;
}
