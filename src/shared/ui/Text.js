import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';

export function Text(props) {
  const {
    style,
    children,
    medium,
    uppercase,
    center,
    bold,
    extraBold,
    italic,
    ...otherProps
  } = props;

  const resolvedTextStyle = [
    styles.text,
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
  style: RNText.propTypes.style,
  children: PropTypes.node,
  uppercase: PropTypes.bool,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  medium: PropTypes.bool,
  extraBold: PropTypes.bool,
  italic: PropTypes.bool,
};

Text.defaultProps = {
  children: null,
  style: undefined,
  uppercase: false,
  center: false,
  bold: false,
  medium: false,
  extraBold: false,
  italic: false,
};

const styles = StyleSheet.create({
  text: {
    color: colors.textPrimary,
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
