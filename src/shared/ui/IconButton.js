import React from 'react';
import { Pressable, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';
import { Icon } from './Icon';

export function IconButton(props) {
  const {
    iconName,
    iconColor,
    iconStyle,
    iconSize,
    buttonStyle,
    onPress,
    disabled,
  } = props;

  const resolvedButtonStyle = [styles.button, buttonStyle];

  return (
    <Pressable
      activeOpacity={0.8}
      style={resolvedButtonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={iconStyle}>
        <Icon name={iconName} color={iconColor} size={iconSize} />
      </View>
    </Pressable>
  );
}

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconStyle: ViewPropTypes.style,
};

IconButton.defaultProps = {
  iconName: null,
  iconSize: 25,
  iconColor: colors.black,
  iconStyle: null,
  disabled: false,
  buttonStyle: null,
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
