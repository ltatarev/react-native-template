import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from 'theme';

const STATUS_BAR_COLOR = 'dark-content';

export function StatusBar() {
  const theme = useTheme();

  return (
    <RNStatusBar
      backgroundColor={theme['background-color-1']}
      barStyle={STATUS_BAR_COLOR}
    />
  );
}
