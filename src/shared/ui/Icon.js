import React from 'react';
import PropTypes from 'prop-types';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Icon(props) {
  const { size, name, color } = props;

  return <RNIcon size={size} name={name} color={color} />;
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
