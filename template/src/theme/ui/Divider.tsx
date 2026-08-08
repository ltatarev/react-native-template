import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { View } from './View';

export type DividerProps = {
  /** Insets the line from both edges — how a list separator sits inside a card. */
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** A hairline between rows. Never announced: it separates, it does not inform. */
export function Divider({ inset = false, style }: DividerProps) {
  styles.useVariants({ inset });

  return <View accessibilityElementsHidden style={[styles.divider, style]} />;
}

const styles = StyleSheet.create(theme => ({
  divider: {
    backgroundColor: theme.colors.hairline,
    height: StyleSheet.hairlineWidth,
    variants: {
      inset: {
        true: { marginHorizontal: theme.gutter.md },
      },
    },
  },
}));
