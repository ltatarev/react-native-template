import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'theme';
import { Icon } from './Icon';

interface IconButtonProps {
  iconName: string;
  iconColor?: string | null;
  iconStyle?: StyleProp<ViewStyle> | null;
  iconSize?: number;
  buttonStyle?: StyleProp<ViewStyle> | null;
  onPress: () => void;
  disabled?: boolean;
}

function IconButton({
  buttonStyle = null,
  disabled = false,
  iconColor = null,
  iconName,
  iconSize = 25,
  iconStyle = null,
  onPress,
}: IconButtonProps) {
  const theme = useTheme();
  const resolvedIconColor = iconColor || theme['color-primary-500'];
  const resolvedButtonStyle = [styles.button, buttonStyle];

  return (
    <Pressable
      accessibilityHint={`Press the ${iconName} button`}
      accessibilityLabel={iconName}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
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

export { IconButton };

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
