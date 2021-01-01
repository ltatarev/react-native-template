import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { colors } from 'shared/theme';

export function StatusBar() {
  const statusBarColor = 'dark-content';

  const statusBarBackground = colors.backgroundPrimary;

  return (
    <RNStatusBar
      barStyle={statusBarColor}
      backgroundColor={statusBarBackground}
    />
  );
}
