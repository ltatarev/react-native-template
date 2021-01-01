import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import { colors } from 'shared/theme';
import { Row } from './Row';
import { Text } from './Text';

export function TextInput(props) {
  const {
    title,
    error,
    errorMessage,
    style,
    disabled,
    autoFocus,
    light,
    inputContainerStyle,
    onFocus,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(autoFocus || false);

  const inputStyle = [
    styles.input,
    disabled && styles.disabled,
    isFocused && styles.focused,
    error && styles.errorBorder,
    style,
  ];

  const containerStyle = [styles.container, inputContainerStyle];

  const selectionColor = error ? colors.textError : colors.buttonPrimary;

  const titleStyle = [styles.title, isFocused && styles.focusedTitle];

  function handleFocus() {
    if (onFocus) {
      onFocus();
    }

    return setIsFocused(true);
  }

  function handleBlur() {
    return setIsFocused(false);
  }

  return (
    <View style={containerStyle}>
      {title && (
        <Text bold uppercase style={titleStyle}>
          {title}
        </Text>
      )}
      <RNTextInput
        allowFontScaling={false}
        editable={!disabled}
        autoFocus={autoFocus}
        style={inputStyle}
        selectionColor={selectionColor}
        underlineColorAndroid="rgba(0,0,0,0)"
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardAppearance="light"
        returnKeyType="next"
        disabled={disabled}
        enablesReturnKeyAutomatically
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
      <Row style={styles.errorLabelContainer}>
        {error && <Text style={styles.errorLabel}>{errorMessage}</Text>}
      </Row>
    </View>
  );
}

TextInput.propTypes = {
  title: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: RNTextInput.propTypes.style,
  borderBottom: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputContainerStyle: ViewPropTypes.style,
  onFocus: PropTypes.func,
  light: PropTypes.bool,
};

TextInput.defaultProps = {
  title: null,
  error: false,
  errorMessage: null,
  style: undefined,
  borderBottom: false,
  autoFocus: false,
  inputContainerStyle: undefined,
  onFocus: null,
  light: false,
  disabled: false,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  input: {
    color: colors.textPrimary,
    fontSize: 18,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary,
  },
  title: {
    fontSize: 13,
    letterSpacing: 1,
    paddingBottom: 7,
  },
  focused: {
    borderBottomWidth: 1,
    borderBottomColor: colors.buttonPrimary,
  },
  focusedTitle: {
    color: colors.buttonPrimary,
  },
  errorBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.error,
  },
  disabled: {
    color: colors.subtitle,
  },
  errorLabel: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
    color: colors.error,
  },
  errorLabelContainer: {
    paddingTop: 5,
    height: 20,
  },
});
