import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import { Text } from './Text';

export function TouchableText({
  title,
  onPress,
  containerStyle,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={containerStyle}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Text {...otherProps}>{title}</Text>
    </TouchableOpacity>
  );
}

TouchableText.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};

TouchableText.defaultProps = {
  containerStyle: {},
};
