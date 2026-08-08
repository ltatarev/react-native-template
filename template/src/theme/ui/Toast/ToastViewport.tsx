import React from 'react';
import Animated, {
  FadeInUp,
  FadeOutDown,
  LinearTransition,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { View } from '../View';
import { Toast } from './Toast';
import type { ToastMessage } from './Toast.types';

type ToastViewportProps = {
  toasts: ToastMessage[];
  onActionPress?: (toast: ToastMessage) => void;
};

/** Rise in, sink out. Reanimated layout animations honor Reduce Motion. */
const ENTER = FadeInUp.springify().damping(26).stiffness(300);
const EXIT = FadeOutDown.duration(160);
const SHIFT = LinearTransition.springify().damping(28).stiffness(300);

/**
 * Where toasts are drawn. Mounted once by `utils/toast`'s host, above the
 * navigator — a message is the app's, not a screen's.
 *
 * `box-none` on the stack and `none` on a toast with no action: a message that
 * cannot be acted on must never eat a tap meant for what is behind it.
 */
export function ToastViewport({ onActionPress, toasts }: ToastViewportProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.viewport}>
      {toasts.map(toast => (
        <Animated.View
          key={toast.id}
          entering={ENTER}
          exiting={EXIT}
          layout={SHIFT}
          pointerEvents={toast.action ? 'auto' : 'none'}>
          <Toast toast={toast} onActionPress={onActionPress} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  viewport: {
    bottom: rt.insets.bottom + theme.gutter.lg,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: theme.zIndex.toast,
  },
}));
