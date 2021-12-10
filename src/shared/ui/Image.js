import React from 'react';
import { ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

export function Image({ source, width, height, style }) {
  return (
    <FastImage
      style={{
        width,
        height,
        ...style,
      }}
      source={source}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

Image.propTypes = {
  source: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: ViewPropTypes.style,
};

Image.defaultProps = {
  width: 150,
  height: 150,
  style: {},
};
