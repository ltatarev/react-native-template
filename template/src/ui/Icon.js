import React from 'react';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

export function Icon(props) {
  const { size, name, color } = props;

  return <RNIcon color={color} name={name} size={size} />;
}

Icon.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
