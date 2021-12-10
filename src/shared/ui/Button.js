import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';
import { ActivityIndicator } from './ActivityIndicator';
import { Icon } from './Icon';
import { Text } from './Text';

export function Button(props) {
  const {
    title,
    secondary,
    buttonStyle,
    textStyle,
    children,
    disabled,
    loading,
    onPress,
    iconName,
    iconColor,
    iconSize,
    activityIndicatorStyle,
    activityIndicatorColor,
  } = props;

  const resolvedButtonStyle = [
    styles.button,
    disabled && styles.disabledButton,
    secondary && styles.secondary,
    buttonStyle,
  ];

  const resolvedTextStyle = [
    styles.text,
    disabled && styles.disabledPrimaryButtonText,
    secondary && styles.secondaryTitle,
    textStyle,
  ];

  const resolvedTitle = loading ? '' : title;

  const resolvedTextContainerStyle = [styles.textContainer, textStyle];

  function handlePress() {
    if (onPress && !loading) {
      return onPress();
    }

    return null;
  }

  function renderActivityIndicator() {
    if (!loading) {
      return null;
    }

    const resolvedActivityIndicatorColor =
      activityIndicatorColor || colors.buttonPrimary;

    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator
          type="small"
          style={activityIndicatorStyle}
          color={resolvedActivityIndicatorColor}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={resolvedButtonStyle}
      onPressOut={handlePress}
      disabled={disabled}
    >
      {renderActivityIndicator()}
      {!loading && (
        <View style={resolvedTextContainerStyle}>
          {iconName && (
            <View style={{ marginRight: 10 }}>
              <Icon name={iconName} color={iconColor} size={iconSize} />
            </View>
          )}
          <Text style={resolvedTextStyle}>{resolvedTitle}</Text>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.node,
  activityIndicatorColor: PropTypes.string,
  activityIndicatorStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  secondary: PropTypes.bool,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};

Button.defaultProps = {
  title: '',
  children: null,
  activityIndicatorColor: '',
  activityIndicatorStyle: undefined,
  disabled: false,
  loading: false,
  buttonStyle: undefined,
  textStyle: undefined,
  secondary: false,
  iconName: undefined,
  iconColor: colors.buttonTextPrimary,
  iconSize: 25,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.buttonPrimary,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledPrimaryButtonText: {
    opacity: 0.5,
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
    borderWidth: 1,
    borderColor: colors.buttonPrimary,
  },
  secondaryTitle: {
    color: colors.buttonTextSecondary,
  },
  textContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  text: {
    color: colors.buttonTextPrimary,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicator: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});
