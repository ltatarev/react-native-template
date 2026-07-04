import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from 'theme';

type TextProps = {
  children: ReactNode;
  bold?: boolean;
  center?: boolean;
  extraBold?: boolean;
  italic?: boolean;
  medium?: boolean;
  style?: StyleProp<TextStyle>;
  uppercase?: boolean;
} & RNTextProps;

export function Text(props: TextProps) {
  const {
    style,
    children,
    medium = false,
    uppercase = false,
    center = false,
    bold = false,
    extraBold = false,
    italic = false,
    ...otherProps
  } = props;
  const theme = useTheme();

  const resolvedTextStyle = [
    styles.text,
    { color: theme['color-primary-700'] },
    uppercase && styles.uppercase,
    bold && styles.bold,
    extraBold && styles.extraBold,
    medium && styles.medium,
    italic && styles.italic,
    center && styles.center,
    style,
  ];

  return (
    <RNText {...otherProps} allowFontScaling={false} style={resolvedTextStyle}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  center: {
    textAlign: 'center',
  },
  extraBold: {
    fontFamily: 'Poppins-ExtraBold',
  },
  italic: {
    fontStyle: 'italic',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
