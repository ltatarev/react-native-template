import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from './Button';
import { useModalPresence } from './motion';
import { Row } from './Row';
import { Text } from './Text';
import { View } from './View';

export type ConfirmDialogProps = {
  body?: string;
  cancelLabel?: string;
  confirmLabel: string;
  /** Draws confirm as destructive. Use for anything that loses data. */
  destructive?: boolean;
  title: string;
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
};

/** The card comes in from just under full size — a settle, not a pop. */
const ENTRANCE_SCALE = 0.96;

/**
 * The one confirmation shape in the app.
 *
 * Deliberately not `Alert.alert`: this one is themed, testable, and can hold a
 * destructive treatment the platform alert only approximates. Cancel is always
 * present and always the quiet option — a dialog with one way out is a
 * roadblock, not a question.
 */
export function ConfirmDialog({
  body,
  cancelLabel,
  confirmLabel,
  destructive = false,
  title,
  visible,
  onConfirm,
  onDismiss,
}: ConfirmDialogProps) {
  const { t } = useTranslation();
  const { mounted, progress } = useModalPresence(visible);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: interpolate(progress.value, [0, 1], [ENTRANCE_SCALE, 1]) },
    ],
  }));

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible
      animationType="none"
      onRequestClose={onDismiss}>
      <Animated.View style={[styles.backdrop, backdropStyle]} />
      <View style={styles.center}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Text bold accessibilityRole="header" size="lg">
            {title}
          </Text>
          {body ? <Text color="text2">{body}</Text> : null}
          <Row gap="sm" justify="end" style={styles.actions}>
            <Button
              haptic={false}
              label={cancelLabel ?? t('ui.confirmDialog.cancel')}
              variant="ghost"
              onPress={onDismiss}
            />
            <Button
              label={confirmLabel}
              variant={destructive ? 'destructive' : 'primary'}
              onPress={onConfirm}
            />
          </Row>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create(theme => ({
  actions: {
    marginTop: theme.gutter.sm,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.card,
    gap: theme.gutter.sm,
    maxWidth: 420,
    padding: theme.gutter.lg,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.gutter.lg,
  },
}));
