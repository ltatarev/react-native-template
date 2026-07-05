import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../Text';
import { View } from '../View';
import type { ToastMessage } from './Toast.types';

type ToastProps = {
  toast: ToastMessage;
};

export function Toast({ toast }: ToastProps) {
  return (
    <View style={[styles.toast, styles[toast.tone]]}>
      <Text bold style={styles.text}>
        {toast.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  danger: {
    backgroundColor: theme.colors.danger,
  },
  info: {
    backgroundColor: theme.colors.info,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  text: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
  },
  toast: {
    borderRadius: theme.radii.sm,
    marginHorizontal: theme.gutter.md,
    marginTop: theme.gutter.sm,
    paddingHorizontal: theme.gutter.md,
    paddingVertical: theme.gutter.sm,
    ...theme.shadow.sm,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
}));
