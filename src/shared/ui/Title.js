import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';
import { Text } from './Text';

export function Title(props) {
  const { title, titleStyle } = props;
  const resolvedTitleStyle = [styles.title, titleStyle];

  return (
    <Text uppercase bold style={resolvedTitleStyle}>
      {title}
    </Text>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: ViewPropTypes.style,
};

Title.defaultProps = {
  titleStyle: null,
};

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 54,
    letterSpacing: 1,
  },
});
