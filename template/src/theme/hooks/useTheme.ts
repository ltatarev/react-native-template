import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../theme';

export function useTheme() {
  const currentTheme = useColorScheme();

  if (currentTheme === 'dark') {
    return darkTheme;
  }

  return lightTheme;
}
