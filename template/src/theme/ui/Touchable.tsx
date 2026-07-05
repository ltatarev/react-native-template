import React from 'react';
import type { PressableProps } from 'react-native';
import { Pressable } from 'react-native';

export type TouchableProps = PressableProps;

export function Touchable(props: TouchableProps) {
  return <Pressable accessibilityRole="button" {...props} />;
}
