import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'theme';
import { Row } from './Row';
import { Text } from './Text';

type TextInputProps = {
  title?: string | null;
  error?: boolean;
  errorMessage?: string | null;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
  autoFocus?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  [key: string]: unknown;
};

export function TextInput({
  title = null,
  error = false,
  errorMessage = null,
  style = undefined,
  disabled = false,
  autoFocus = false,
  inputContainerStyle = undefined,
  onFocus = undefined,
  ...otherProps
}: TextInputProps) {
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  errorLabel: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
  },
  errorLabelContainer: {
    height: 20,
    paddingTop: 5,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    paddingBottom: 7,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  title: {
    fontSize: 13,
    letterSpacing: 1,
    paddingBottom: 7,
  },
});
