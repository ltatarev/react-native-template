import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'theme';
import { Row } from './Row';
import { Text } from './Text';

export function TextInput({
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
}) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(autoFocus || false);

  const inputStyle = [
    styles.input,
    {
      color: theme['color-basic-1000'],
      borderColor: theme['color-basic-1000'],
    },
    disabled && { color: theme['color-basic-300'] },
    isFocused && {
      borderWidth: 1,
      borderColor: theme['color-primary-500'],
    },
    error && {
      borderWidth: 1,
      borderColor: theme['color-danger-500'],
    },
    style,
  ];

  const containerStyle = [styles.container, inputContainerStyle];

  const selectionColor = error
    ? theme['color-danger-500']
    : theme['color-primary-500'];

  const titleStyle = [
    styles.title,
    isFocused && { color: theme['color-primary-500'] },
  ];

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
        enablesReturnKeyAutomatically
        allowFontScaling={false}
        autoFocus={autoFocus}
        disabled={disabled}
        editable={!disabled}
        keyboardAppearance="light"
        returnKeyType="next"
        selectionColor={selectionColor}
        style={inputStyle}
        underlineColorAndroid="rgba(0,0,0,0)"
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...otherProps}
      />
      <Row style={styles.errorLabelContainer}>
        {error && (
          <Text
            style={[styles.errorLabel, { color: theme['color-danger-500'] }]}
          >
            {errorMessage}
          </Text>
        )}
      </Row>
    </View>
  );
}

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  borderBottom: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  inputContainerStyle: PropTypes.object,
  light: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  onFocus: PropTypes.func,
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
    fontSize: 18,
    paddingBottom: 7,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 13,
    letterSpacing: 1,
    paddingBottom: 7,
  },
  errorLabel: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
  },
  errorLabelContainer: {
    paddingTop: 5,
    height: 20,
  },
});
