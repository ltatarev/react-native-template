import React, { useEffect } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { motion } from '../scales';
import { useReducedMotion } from './motion';

export type SkeletonRadius = 'card' | 'chip' | 'sm';

export type SkeletonProps = {
  height?: DimensionValue;
  radius?: SkeletonRadius;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
};

const DIM_OPACITY = 0.4;

/**
 * A block the shape of content that has not arrived.
 *
 * It pulses rather than shimmers: a pulse is one animated value and reads at
 * any size, where a sweeping band needs the placeholder's measured width and
 * looks wrong on a small one. Holds still under Reduce Motion, and is hidden
 * from assistive tech — the region around it carries the loading label.
 */
export function Skeleton({
  height,
  radius = 'sm',
  style,
  width,
}: SkeletonProps) {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    opacity.value = withRepeat(
      withTiming(DIM_OPACITY, { duration: motion.skeletonDuration }),
      -1,
      true,
    );

    return () => cancelAnimation(opacity);
  }, [opacity, reducedMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  styles.useVariants({ radius });

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.block, { height, width }, animatedStyle, style]}
    />
  );
}

const styles = StyleSheet.create(theme => ({
  block: {
    backgroundColor: theme.colors.surfaceMuted,
    variants: {
      radius: {
        card: { borderRadius: theme.radii.card },
        chip: { borderRadius: theme.radii.chip },
        sm: { borderRadius: theme.radii.sm },
      },
    },
  },
}));
