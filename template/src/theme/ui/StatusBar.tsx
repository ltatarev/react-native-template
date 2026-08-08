import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from '../hooks';

/**
 * The bar takes its contrast from the active theme rather than being fixed, so
 * an explicit light/dark choice reaches it too. Mounted once, by the app shell.
 */
export function StatusBar() {
  const theme = useTheme();

  return (
    <RNStatusBar
      backgroundColor={theme.colors.page}
      barStyle={theme.isDark ? 'light-content' : 'dark-content'}
    />
  );
}
