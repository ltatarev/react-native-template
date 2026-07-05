import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IconProps {
  color: string;
  name: string;
  size: number;
}

export function Icon({ color, name, size }: IconProps) {
  return (
    <Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[styles.icon, { color, fontSize: size, lineHeight: size }]}
    >
      {name.slice(0, 1).toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
