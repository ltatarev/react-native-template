import React from 'react';
import FastImage from 'react-native-fast-image';

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
    <FastImage
      resizeMode={FastImage.resizeMode.cover}
      source={source}
      style={resolvedStyle}
    />
  );
}
