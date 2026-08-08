import { useEffect } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import { useAppSelector } from 'modules/redux';
import { selectAppearanceMode } from '../redux';

/**
 * Pushes the persisted appearance choice into Unistyles.
 *
 * `system` hands control back to the OS through adaptive themes; an explicit
 * light/dark turns them off and pins the theme, otherwise the OS would win the
 * next time it changed. Mounted once, by `ThemeProvider`.
 */
export function useAppearanceSync(): void {
  const appearanceMode = useAppSelector(selectAppearanceMode);

  useEffect(() => {
    if (appearanceMode === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true);

      return;
    }

    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(appearanceMode);
  }, [appearanceMode]);
}
