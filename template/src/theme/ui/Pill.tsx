import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { TextColor } from './Text';
import { Text } from './Text';
import { View } from './View';

export type PillTone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type PillSize = 'sm' | 'md';

export type PillProps = {
  label: string;
  size?: PillSize;
  style?: StyleProp<ViewStyle>;
  tone?: PillTone;
};

/** Label color per tone — the chip's fill is the same role at low weight. */
const LABEL_COLOR: Record<PillTone, TextColor> = {
  accent: 'accent',
  danger: 'danger',
  info: 'info',
  neutral: 'text2',
  success: 'success',
  warning: 'warning',
};

/**
 * A small label that states something rather than doing it: a status, a count,
 * a category. Not pressable — a chip that acts is a `Button` with
 * `size="sm"`.
 */
export function Pill({ label, size = 'md', style, tone = 'neutral' }: PillProps) {
  styles.useVariants({ size, tone });

  return (
    <View style={[styles.pill, style]}>
      <Text bold color={LABEL_COLOR[tone]} size={size === 'sm' ? 'xs' : 'sm'}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  pill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: theme.radii.chip,
    flexDirection: 'row',
    variants: {
      size: {
        md: {
          paddingHorizontal: theme.gutter.md,
          paddingVertical: theme.gutter.xs,
        },
        sm: {
          paddingHorizontal: theme.gutter.sm,
          paddingVertical: 2,
        },
      },
      tone: {
        accent: { backgroundColor: theme.colors.accentSoft },
        danger: { backgroundColor: theme.colors.surfaceMuted },
        info: { backgroundColor: theme.colors.surfaceMuted },
        neutral: { backgroundColor: theme.colors.surfaceMuted },
        success: { backgroundColor: theme.colors.surfaceMuted },
        warning: { backgroundColor: theme.colors.surfaceMuted },
      },
    },
  },
}));
