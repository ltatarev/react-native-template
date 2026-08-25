import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from '../hooks';

/**
 * The bar takes its contrast from the active theme rather than being fixed, so
 * an explicit light/dark choice reaches it too. Mounted once, by the app shell.
 *
 * Only the contrast is set here. React Native 0.87 removed the Android
 * `backgroundColor` prop, and under edge-to-edge the bar is transparent by
 * design: what shows through it is the page itself, which `Screen` already
 * paints out to the top inset.
 */
export function StatusBar() {
  const theme = useTheme();

  return <RNStatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />;
}
