import React from 'react';
import { Image as RNImage } from 'react-native';

interface ImageProps {
  source: number;
  width?: number;
  height?: number;
  style?: object;
}

export function Image({
  source,
  width = 150,
  height = 150,
  style = {},
}: ImageProps) {
  const resolvedStyle = {
    width,
    height,
    ...style,
  };

  return (
    <RNImage
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      source={source}
      style={resolvedStyle}
    />
  );
}
