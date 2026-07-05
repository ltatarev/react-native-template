import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from './Text';
import { Touchable } from './Touchable';

type ButtonProps = {
  accessibilityHint?: string;
  disabled?: boolean;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  accessibilityHint,
  disabled = false,
  label,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Touchable
      accessibilityHint={accessibilityHint ?? `Activates ${label}`}
      accessibilityLabel={label}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text bold center style={[styles.label, textStyle]}>
        {label}
      </Text>
    </Touchable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.lg,
    justifyContent: 'center',
    paddingHorizontal: theme.gutter.lg,
    paddingVertical: theme.gutter.md,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
  },
  pressed: {
    opacity: 0.85,
  },
}));
