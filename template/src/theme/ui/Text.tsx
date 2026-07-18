import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';

export type TextProps = RNTextProps;

export function Text(props: TextProps) {
  return <RNText {...props} />;
}
