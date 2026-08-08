import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { Spacing } from '../types';
import { View } from './View';

export type RowProps = {
  align?: 'start' | 'center' | 'end' | 'stretch';
  children: ReactNode;
  gap?: Spacing;
  justify?: 'start' | 'center' | 'end' | 'between';
  style?: StyleProp<ViewStyle>;
  /** Wraps onto more lines instead of squeezing — chip groups, tag lists. */
  wrap?: boolean;
};

/**
 * A horizontal group. The most repeated layout in any app, so it is a primitive
 * rather than four style rules restated on every screen.
 */
export function Row({
  align = 'center',
  children,
  gap = 'sm',
  justify = 'start',
  style,
  wrap = false,
}: RowProps) {
  styles.useVariants({ align, gap, justify, wrap });

  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    variants: {
      align: {
        center: { alignItems: 'center' },
        end: { alignItems: 'flex-end' },
        start: { alignItems: 'flex-start' },
        stretch: { alignItems: 'stretch' },
      },
      gap: {
        lg: { gap: theme.gutter.lg },
        md: { gap: theme.gutter.md },
        none: { gap: theme.gutter.none },
        sm: { gap: theme.gutter.sm },
        xl: { gap: theme.gutter.xl },
        xs: { gap: theme.gutter.xs },
        xxl: { gap: theme.gutter.xxl },
      },
      justify: {
        between: { justifyContent: 'space-between' },
        center: { justifyContent: 'center' },
        end: { justifyContent: 'flex-end' },
        start: { justifyContent: 'flex-start' },
      },
      wrap: {
        true: { flexWrap: 'wrap' },
      },
    },
  },
}));
