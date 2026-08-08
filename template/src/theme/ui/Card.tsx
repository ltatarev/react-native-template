import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { motion } from '../scales';
import type { Spacing } from '../types';
import { usePressScale } from './motion';
import { Touchable } from './Touchable';
import { View } from './View';

export type CardElevation = 'flat' | 'raised';

export type CardProps = {
  children: ReactNode;
  elevation?: CardElevation;
  padding?: Spacing;
  style?: StyleProp<ViewStyle>;
  /** Makes the whole card pressable, with the shared press-scale. */
  onPress?: () => void;
};

/**
 * A bounded surface: a group of rows, a summary, a tile.
 *
 * A card is not pressable unless it is given an `onPress` — the press-scale is
 * what tells the reader the whole card is the target, rather than something
 * inside it.
 */
export function Card({
  children,
  elevation = 'flat',
  padding = 'md',
  style,
  onPress,
}: CardProps) {
  const press = usePressScale(motion.pressScale.card);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: press.scale.value }],
  }));

  styles.useVariants({ elevation, padding });

  if (!onPress) {
    return <View style={[styles.card, style]}>{children}</View>;
  }

  return (
    <Animated.View style={[scaleStyle, style]}>
      <Touchable
        style={styles.card}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}>
        {children}
      </Touchable>
    </Animated.View>
  );
}

const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.radii.card,
    borderWidth: theme.borderWidth,
    variants: {
      elevation: {
        flat: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.hairline,
        },
        raised: {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.hairline2,
          ...theme.shadow.sm,
        },
      },
      padding: {
        lg: { padding: theme.gutter.lg },
        md: { padding: theme.gutter.md },
        none: { padding: theme.gutter.none },
        sm: { padding: theme.gutter.sm },
        xl: { padding: theme.gutter.xl },
        xs: { padding: theme.gutter.xs },
        xxl: { padding: theme.gutter.xxl },
      },
    },
  },
}));
