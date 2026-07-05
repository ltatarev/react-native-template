import React from 'react';
import type { ViewProps as RNViewProps } from 'react-native';
import { View as RNView } from 'react-native';

export type ViewProps = RNViewProps;

export function View(props: ViewProps) {
  return <RNView {...props} />;
}
