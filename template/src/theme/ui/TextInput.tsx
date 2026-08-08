import React, { forwardRef, useState } from 'react';
import type {
  StyleProp,
  TextInput as RNTextInputType,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../hooks';
import { Text } from './Text';
import { View } from './View';

export type TextInputProps = RNTextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  /** Shown under the field, and turns the border to `danger`. */
  errorMessage?: string;
  /** Quiet line under the field when there is no error. */
  hint?: string;
  /** Field label. Also becomes the accessibility label when none is given. */
  label?: string;
};

/**
 * A labelled text field.
 *
 * Focus and error are drawn on the border rather than by swapping the field for
 * a different one, so the layout never shifts as the reader types. The error
 * message replaces the hint in the same slot for the same reason.
 */
export const TextInput = forwardRef<RNTextInputType, TextInputProps>(
  function TextInput(
    {
      accessibilityLabel,
      containerStyle,
      disabled = false,
      errorMessage,
      hint,
      label,
      style,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const hasError = errorMessage !== undefined;

    styles.useVariants({ disabled, focused, hasError });

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <Text bold uppercase color="text2" size="xs">
            {label}
          </Text>
        ) : null}
        <RNTextInput
          accessibilityLabel={accessibilityLabel ?? label}
          editable={!disabled}
          keyboardAppearance={theme.isDark ? 'dark' : 'light'}
          placeholderTextColor={theme.colors.textMuted}
          ref={ref}
          selectionColor={theme.colors.accent}
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, style]}
          onBlur={event => {
            setFocused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setFocused(true);
            onFocus?.(event);
          }}
        />
        {hasError || hint !== undefined ? (
          <Text color={hasError ? 'danger' : 'textMuted'} size="xs">
            {errorMessage ?? hint}
          </Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.gutter.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.ctrl,
    borderWidth: theme.borderWidth,
    color: theme.colors.text,
    fontFamily: theme.typography.fonts.sans,
    fontSize: theme.typography.fontSize.md,
    minHeight: theme.size.control,
    paddingHorizontal: theme.gutter.md,
    paddingVertical: theme.gutter.sm,
    variants: {
      disabled: {
        true: {
          backgroundColor: theme.colors.surfaceMuted,
          color: theme.colors.textMuted,
        },
      },
      focused: {
        true: { borderColor: theme.colors.accent },
        false: { borderColor: theme.colors.hairline },
      },
      hasError: {
        true: { borderColor: theme.colors.danger },
      },
    },
  },
}));
