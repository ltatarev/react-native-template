import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from '../colors';

export function useTheme() {
  const currentTheme = useColorScheme();

  if (currentTheme === 'dark') {
    return DARK_THEME;
  }

  return LIGHT_THEME;
}
