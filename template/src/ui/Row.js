import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export function Row({ children, style, ...otherProps }) {
  const containerStyle = [style, styles.row];

  return (
    <View style={containerStyle} {...otherProps}>
      {children}
    </View>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Row.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
