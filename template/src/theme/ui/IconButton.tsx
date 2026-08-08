import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { HapticFeedbackService } from 'utils/haptic-feedback';
import { useTheme } from '../hooks';
import { motion } from '../scales';
import type { IconColor } from './Icon';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { usePressScale } from './motion';
import { Touchable } from './Touchable';

export type IconButtonVariant = 'plain' | 'filled' | 'outlined';
export type IconButtonSize = 'sm' | 'md';

export type IconButtonProps = {
  /**
   * What the button does, spoken. Required: a glyph alone tells a screen
   * reader nothing.
   */
  accessibilityLabel: string;
  color?: IconColor;
  disabled?: boolean;
  haptic?: boolean;
  icon: IconName;
  size?: IconButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: IconButtonVariant;
  onPress: () => void;
};

/**
 * A glyph that acts: a close button, a row's overflow, a header action.
 *
 * The touch target is `theme.size.touchTarget` regardless of the glyph inside
 * it, so a 14pt icon is still comfortably pressable.
 */
export function IconButton({
  accessibilityLabel,
  color = 'text',
  disabled = false,
  haptic = true,
  icon,
  size = 'md',
  style,
  variant = 'plain',
  onPress,
}: IconButtonProps) {
  const theme = useTheme();
  const press = usePressScale(motion.pressScale.icon);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: press.scale.value }],
  }));

  function handlePress() {
    if (haptic) {
      HapticFeedbackService.triggerSelection();
    }

    onPress();
  }

  styles.useVariants({ disabled, size, variant });

  return (
    <Animated.View style={[scaleStyle, style]}>
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        disabled={disabled}
        style={styles.container}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}>
        <Icon
          color={color}
          name={icon}
          size={size === 'sm' ? theme.size.icon.sm : theme.size.icon.md}
        />
      </Touchable>
    </Animated.View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      disabled: {
        true: { opacity: 0.4 },
      },
      size: {
        md: {
          borderRadius: theme.radii.chip,
          height: theme.size.touchTarget,
          width: theme.size.touchTarget,
        },
        sm: {
          borderRadius: theme.radii.chip,
          height: theme.size.controlXs,
          width: theme.size.controlXs,
        },
      },
      variant: {
        filled: { backgroundColor: theme.colors.surfaceMuted },
        outlined: {
          borderColor: theme.colors.hairline,
          borderWidth: theme.borderWidth,
        },
        plain: { backgroundColor: 'transparent' },
      },
    },
  },
}));
