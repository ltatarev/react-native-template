import React, { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { HapticFeedbackService } from 'utils/haptic-feedback';
import { useTheme } from '../hooks';
import { durations } from '../scales';
import type { FontSize } from '../types';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { usePressScale,useReducedMotion } from './motion';
import { Text } from './Text';
import { Touchable } from './Touchable';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  accessibilityHint?: string;
  disabled?: boolean;
  /** Impact haptic on press. Defaults to true. */
  haptic?: boolean;
  icon?: IconName;
  label: string;
  /** Crossfades the label into a spinner and blocks presses. */
  loading?: boolean;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
  onPress: () => void;
};

const LABEL_SIZE: Record<ButtonSize, FontSize> = { lg: 'lg', md: 'md', sm: 'sm' };

/** Distance the label and spinner travel past each other during the swap. */
const SWAP_SHIFT = 8;

/**
 * The app's only button.
 *
 * `loading` is part of the button rather than the caller's problem: a press that
 * starts async work has to say so in place, and swapping the label for a
 * spinner keeps the button the same width while it does.
 */
export function Button({
  accessibilityHint,
  disabled = false,
  haptic = true,
  icon,
  label,
  loading = false,
  size = 'md',
  style,
  variant = 'primary',
  onPress,
}: ButtonProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const press = usePressScale();
  const loadingProgress = useSharedValue(loading ? 1 : 0);
  const inert = disabled || loading;

  useEffect(() => {
    loadingProgress.value = withTiming(loading ? 1 : 0, {
      duration: reducedMotion ? 0 : durations.base,
    });
  }, [loading, loadingProgress, reducedMotion]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: press.scale.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(loadingProgress.value, [0, 0.6], [1, 0]),
    transform: [
      {
        translateY: interpolate(
          loadingProgress.value,
          [0, 1],
          [0, -SWAP_SHIFT],
        ),
      },
    ],
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(loadingProgress.value, [0.4, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(loadingProgress.value, [0, 1], [SWAP_SHIFT, 0]),
      },
    ],
  }));

  /** What the label is set in, so the icon and spinner can match it. */
  const contentColor: string = {
    destructive: theme.colors.onDark,
    ghost: theme.colors.text,
    primary: theme.colors.onPrimaryButton,
    secondary: theme.colors.text,
  }[variant];

  function handlePress() {
    if (haptic) {
      HapticFeedbackService.triggerImpact();
    }

    onPress();
  }

  styles.useVariants({ disabled, size, variant });

  return (
    <Animated.View style={[scaleStyle, style]}>
      <Touchable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={label}
        accessibilityState={{ busy: loading, disabled: inert }}
        disabled={inert}
        style={styles.container}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}>
        <Animated.View style={[styles.content, labelStyle]}>
          {icon ? (
            <Icon
              colorValue={contentColor}
              name={icon}
              size={theme.size.icon[size === 'sm' ? 'sm' : 'md']}
            />
          ) : null}
          <Text
            bold
            size={LABEL_SIZE[size]}
            style={styles.label}>
            {label}
          </Text>
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[styles.spinner, spinnerStyle]}>
          <ActivityIndicator color={contentColor} size="small" />
        </Animated.View>
      </Touchable>
    </Animated.View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    borderRadius: theme.radii.ctrl,
    justifyContent: 'center',
    variants: {
      disabled: {
        true: { opacity: 0.5 },
      },
      size: {
        lg: {
          minHeight: theme.size.control,
          paddingHorizontal: theme.gutter.lg,
          paddingVertical: theme.gutter.md,
        },
        md: {
          minHeight: theme.size.controlSm,
          paddingHorizontal: theme.gutter.md,
          paddingVertical: theme.gutter.sm,
        },
        sm: {
          minHeight: theme.size.controlXs,
          paddingHorizontal: theme.gutter.sm,
          paddingVertical: theme.gutter.xs,
        },
      },
      variant: {
        destructive: { backgroundColor: theme.colors.danger },
        ghost: { backgroundColor: 'transparent' },
        primary: { backgroundColor: theme.colors.primaryButton },
        secondary: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.hairline,
          borderWidth: theme.borderWidth,
        },
      },
    },
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.gutter.sm,
    justifyContent: 'center',
  },
  label: {
    variants: {
      variant: {
        destructive: { color: theme.colors.onDark },
        ghost: { color: theme.colors.text },
        primary: { color: theme.colors.onPrimaryButton },
        secondary: { color: theme.colors.text },
      },
    },
  },
  spinner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
