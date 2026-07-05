import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from '../View';
import { Toast } from './Toast';
import type { ToastMessage } from './Toast.types';

type ToastViewportProps = {
  toasts: ToastMessage[];
};

export function ToastViewport({ toasts }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.viewport}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  viewport: {
    bottom: theme.gutter.lg,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: theme.zIndex.toast,
  },
}));
