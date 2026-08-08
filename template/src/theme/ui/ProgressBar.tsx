import React, { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { motion } from '../scales';
import { useReducedMotion } from './motion';
import { View } from './View';

export type ProgressBarTone = 'accent' | 'success' | 'warning' | 'danger';

export type ProgressBarProps = {
  /** Animate the fill when the value changes. On by default. */
  animated?: boolean;
  height?: number;
  max: number;
  style?: StyleProp<ViewStyle>;
  tone?: ProgressBarTone;
  value: number;
};

/**
 * A determinate progress track.
 *
 * The fill runs on a clamped spring, so it never overshoots the number it is
 * reporting. It announces itself as a progress bar with its real values, which
 * is the only way the reader gets the number when the bar itself is decoration.
 */
export function ProgressBar({
  animated = true,
  height,
  max,
  style,
  tone = 'accent',
  value,
}: ProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const fraction = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const progress = useSharedValue(fraction);

  useEffect(() => {
    if (animated && !reducedMotion) {
      progress.value = withSpring(fraction, motion.springs.value);

      return;
    }

    progress.value = fraction;
  }, [animated, fraction, progress, reducedMotion]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  styles.useVariants({ tone });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ max, min: 0, now: Math.min(value, max) }}
      style={[styles.track, height === undefined ? undefined : { height }, style]}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  fill: {
    borderRadius: theme.size.progressBar / 2,
    height: '100%',
    variants: {
      tone: {
        accent: { backgroundColor: theme.colors.accent },
        danger: { backgroundColor: theme.colors.danger },
        success: { backgroundColor: theme.colors.success },
        warning: { backgroundColor: theme.colors.warning },
      },
    },
  },
  track: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.size.progressBar / 2,
    height: theme.size.progressBar,
    overflow: 'hidden',
  },
}));
