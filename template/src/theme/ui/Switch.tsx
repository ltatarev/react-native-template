import React from 'react';
import type { SwitchProps as RNSwitchProps } from 'react-native';
import { Switch as RNSwitch } from 'react-native';
import { useTheme } from '../hooks';

export type SwitchProps = Omit<
  RNSwitchProps,
  'ios_backgroundColor' | 'thumbColor' | 'trackColor'
>;

/**
 * The platform switch in the theme's ink: accent when on, hairline when off.
 *
 * Colors are runtime props rather than a stylesheet because that is the only
 * channel the native control accepts them through.
 */
export function Switch(props: SwitchProps) {
  const theme = useTheme();

  return (
    <RNSwitch
      ios_backgroundColor={theme.colors.hairline}
      thumbColor={theme.colors.surface}
      trackColor={{
        false: theme.colors.hairline,
        true: theme.colors.accent,
      }}
      {...props}
    />
  );
}
