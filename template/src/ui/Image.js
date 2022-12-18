import React, { useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

export function Image({
  source, width, height, style,
}) {
  const resolvedStyle = useMemo(
    () => ({
      width,
      height,
      ...style,
    }),
    [height, width, style],
  );

  return (
    <FastImage
      resizeMode={FastImage.resizeMode.cover}
      source={source}
      style={resolvedStyle}
    />
  );
}

Image.propTypes = {
  source: PropTypes.number.isRequired,
  height: PropTypes.number,
  style: PropTypes.object,
  width: PropTypes.number,
};

Image.defaultProps = {
  width: 150,
  height: 150,
  style: {},
};
