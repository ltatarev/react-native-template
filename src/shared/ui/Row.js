import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes } from 'react-native';

export function Row({ children, style, ...otherProps }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <View style={{ ...style, ...styles.row }} {...otherProps}>
      {children}
    </View>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

Row.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
