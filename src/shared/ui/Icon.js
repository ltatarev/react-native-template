import React from 'react';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

export function Icon(props) {
  const { size, name, color } = props;

  return <RNIcon size={size} name={name} color={color} />;
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
