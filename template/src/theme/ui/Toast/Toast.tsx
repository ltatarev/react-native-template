import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../Text';
import { Touchable } from '../Touchable';
import { View } from '../View';
import type { ToastMessage } from './Toast.types';

type ToastProps = {
  toast: ToastMessage;
  onActionPress?: (toast: ToastMessage) => void;
};

export function Toast({ onActionPress, toast }: ToastProps) {
  styles.useVariants({ tone: toast.tone });

  return (
    <View style={styles.toast}>
      <Text bold color="onDark" size="sm" style={styles.message}>
        {toast.message}
      </Text>
      {toast.action ? (
        <Touchable
          hitSlop={8}
          onPress={() => {
            toast.action?.onPress();
            onActionPress?.(toast);
          }}>
          <Text bold color="onDark" size="sm" style={styles.actionLabel}>
            {toast.action.label}
          </Text>
        </Touchable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  actionLabel: {
    textDecorationLine: 'underline',
  },
  message: {
    flexShrink: 1,
  },
  toast: {
    alignItems: 'center',
    borderRadius: theme.radii.sm,
    flexDirection: 'row',
    gap: theme.gutter.md,
    justifyContent: 'space-between',
    marginHorizontal: theme.gutter.md,
    marginTop: theme.gutter.sm,
    paddingHorizontal: theme.gutter.md,
    paddingVertical: theme.gutter.sm,
    ...theme.shadow.sm,
    variants: {
      tone: {
        danger: { backgroundColor: theme.colors.danger },
        info: { backgroundColor: theme.colors.info },
        success: { backgroundColor: theme.colors.success },
        warning: { backgroundColor: theme.colors.warning },
      },
    },
  },
}));
