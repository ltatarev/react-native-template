import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'theme';

export function Text({
  style,
  children,
  medium,
  uppercase,
  center,
  bold,
  extraBold,
  italic,
  ...otherProps
}) {
  const theme = useTheme();

  const resolvedTextStyle = [
    styles.text,
    { color: theme['color-primary-700'] },
    uppercase && styles.uppercase,
    bold && styles.bold,
    extraBold && styles.extraBold,
    medium && styles.medium,
    italic && styles.italic,
    center && styles.center,
    style,
  ];

  if (!children) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RNText {...otherProps} allowFontScaling={false} style={resolvedTextStyle}>
      {children}
    </RNText>
  );
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  extraBold: PropTypes.bool,
  italic: PropTypes.bool,
  medium: PropTypes.bool,
  style: PropTypes.object,
  uppercase: PropTypes.bool,
};

Text.defaultProps = {
  bold: false,
  center: false,
  extraBold: false,
  italic: false,
  medium: false,
  style: undefined,
  uppercase: false,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  extraBold: {
    fontFamily: 'Poppins-ExtraBold',
  },
  center: {
    textAlign: 'center',
  },
});
