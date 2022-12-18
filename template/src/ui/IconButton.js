import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'theme';
import { Icon } from './Icon';

export function IconButton({
  iconName,
  iconColor,
  iconStyle,
  iconSize,
  buttonStyle,
  onPress,
  disabled,
}) {
  const theme = useTheme();

  const resolvedIconColor = useMemo(
    () => iconColor || theme['color-primary-500'],
    [iconColor, theme],
  );

  const resolvedButtonStyle = useMemo(
    () => [styles.button, buttonStyle],
    [buttonStyle],
  );

  return (
    <Pressable
      activeOpacity={0.8}
      disabled={disabled}
      style={resolvedButtonStyle}
      onPress={onPress}
    >
      <View style={iconStyle}>
        <Icon color={resolvedIconColor} name={iconName} size={iconSize} />
      </View>
    </Pressable>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  disabled: PropTypes.bool,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.object,
};

IconButton.defaultProps = {
  iconColor: null,
  iconSize: 25,
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
