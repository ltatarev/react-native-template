import { useUnistyles } from 'react-native-unistyles';
import type { AppTheme } from '../types';

/**
 * The active theme object; re-renders when the theme changes.
 *
 * Read through Unistyles rather than `useColorScheme`, so it reflects an
 * explicit light/dark choice (see `theme/redux`) and not only the OS setting.
 * Inside `StyleSheet.create` the theme is already an argument — this hook is
 * for the values styles cannot express: a native `StatusBar` prop, a color
 * handed to an SVG, a branch on `isDark`.
 */
export function useTheme(): AppTheme {
  const { theme } = useUnistyles();

  return theme;
}
