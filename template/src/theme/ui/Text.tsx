import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { FontSize } from '../types';

/** The color roles text is allowed to take. Never a hex in feature code. */
export type TextColor =
  | 'text'
  | 'text2'
  | 'textMuted'
  | 'accent'
  | 'onAccent'
  | 'onDark'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

/** Which family the string is set in. `serif` is the display voice. */
export type TextFamily = 'sans' | 'serif';

export type TextProps = RNTextProps & {
  bold?: boolean;
  center?: boolean;
  color?: TextColor;
  family?: TextFamily;
  /** Tabular figures — required on anything that counts or measures. */
  numeric?: boolean;
  /** Step on the type scale. Line height comes with it. */
  size?: FontSize;
  uppercase?: boolean;
};

/**
 * Every string in the app goes through here.
 *
 * Size, weight and color are props rather than styles so a screen never states
 * a font family or a hex, and a change to the type scale lands everywhere at
 * once. `style` still wins for the one-off a screen genuinely needs.
 *
 * Text scales with the OS setting up to `MAX_FONT_SCALE`; pass
 * `maxFontSizeMultiplier` explicitly (including `undefined`, for long-form
 * copy that should scale without a ceiling) to override that.
 */
const MAX_FONT_SCALE = 1.6;

export function Text({
  bold = false,
  center = false,
  color = 'text',
  family = 'sans',
  numeric = false,
  size = 'md',
  style,
  uppercase = false,
  ...props
}: TextProps) {
  styles.useVariants({ bold, center, color, family, numeric, size, uppercase });

  // Checked by key presence rather than a default parameter, because a default
  // cannot tell "not passed" from an `undefined` passed on purpose.
  const maxFontSizeMultiplier =
    'maxFontSizeMultiplier' in props
      ? props.maxFontSizeMultiplier
      : MAX_FONT_SCALE;

  return (
    <RNText
      allowFontScaling
      {...props}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[styles.text, style]}
    />
  );
}

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.colors.text,
    fontFamily: theme.typography.fonts.sans,
    variants: {
      bold: {
        // Weight is a family here: the bundled faces are static instances, so
        // `fontWeight` would synthesize rather than select. Handled per family
        // in `compoundVariants` below.
        true: {},
      },
      center: {
        true: { textAlign: 'center' },
      },
      color: {
        accent: { color: theme.colors.accent },
        danger: { color: theme.colors.danger },
        info: { color: theme.colors.info },
        onAccent: { color: theme.colors.onAccent },
        onDark: { color: theme.colors.onDark },
        success: { color: theme.colors.success },
        text: { color: theme.colors.text },
        text2: { color: theme.colors.text2 },
        textMuted: { color: theme.colors.textMuted },
        warning: { color: theme.colors.warning },
      },
      family: {
        sans: { fontFamily: theme.typography.fonts.sans },
        serif: { fontFamily: theme.typography.fonts.serif },
      },
      numeric: {
        true: { fontVariant: ['tabular-nums'] },
      },
      size: {
        lg: {
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.lineHeight.lg,
        },
        md: {
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
        },
        sm: {
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.lineHeight.sm,
        },
        xl: {
          fontSize: theme.typography.fontSize.xl,
          lineHeight: theme.typography.lineHeight.xl,
        },
        xs: {
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.lineHeight.xs,
        },
        xxl: {
          fontSize: theme.typography.fontSize.xxl,
          lineHeight: theme.typography.lineHeight.xxl,
        },
      },
      uppercase: {
        true: {
          letterSpacing: theme.typography.eyebrowLetterSpacing,
          textTransform: 'uppercase',
        },
      },
    },
    compoundVariants: [
      {
        bold: true,
        family: 'sans',
        styles: { fontFamily: theme.typography.fonts.sansMedium },
      },
      {
        // The bundled serif ships one weight; bold falls back to it rather
        // than letting the platform synthesize a heavier face.
        bold: true,
        family: 'serif',
        styles: { fontFamily: theme.typography.fonts.serif },
      },
    ],
  },
}));
