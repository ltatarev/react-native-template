import type { ReactNode } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, useWindowDimensions } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  KeyboardProvider,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';
import { motion } from '../scales';
import { useModalPresence } from './motion';
import { Touchable } from './Touchable';
import { View } from './View';

/** A fling faster than this dismisses regardless of how far it travelled. */
const DISMISS_VELOCITY = 800;
/** Fraction of its own height a sheet must be dragged down to dismiss. */
const DISMISS_FRACTION = 1 / 3;
/** How far the scrim fades as the sheet is dragged clear. */
const BACKDROP_DRAG_FADE = 0.7;
/** Ceiling for a content-sized sheet, as a fraction of the window. */
const MAX_HEIGHT_FRACTION = 0.9;

export type SheetProps = {
  children: ReactNode;
  /**
   * Height as a fraction of the window (0–1]. Omit for a content-sized sheet,
   * capped at `MAX_HEIGHT_FRACTION`.
   */
  heightFraction?: number;
  visible: boolean;
  onDismiss: () => void;
};

/**
 * A bottom sheet: spring slide-up over a fading scrim, drag to dismiss.
 *
 * For a whole flow, prefer a native-stack `pageSheet`/`formSheet` presentation —
 * it gets the platform's own sheet, back gesture, and detents. This primitive is
 * for a sheet raised from inside a screen, over content that stays live.
 *
 * A nested `KeyboardProvider` lives inside the `Modal`: RN modals render in a
 * separate window the app-root provider cannot measure, so a sheet with a field
 * needs its own. The panel is then lifted above the keyboard on the UI thread.
 */
export function Sheet({
  children,
  heightFraction,
  visible,
  onDismiss,
}: SheetProps) {
  const { mounted, progress } = useModalPresence(visible);

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
      <KeyboardProvider>
        <SheetPanel
          heightFraction={heightFraction}
          progress={progress}
          onDismiss={onDismiss}>
          {children}
        </SheetPanel>
      </KeyboardProvider>
    </Modal>
  );
}

type SheetPanelProps = {
  children: ReactNode;
  heightFraction?: number;
  progress: SharedValue<number>;
  onDismiss: () => void;
};

function SheetPanel({
  children,
  heightFraction,
  progress,
  onDismiss,
}: SheetPanelProps) {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  // 0 when closed, negative while the keyboard is up. Added to the panel's
  // translateY it lifts the sheet, and everything in it, clear of the keyboard.
  const keyboard = useReanimatedKeyboardAnimation();
  const dragY = useSharedValue(0);
  const panelHeight = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      dragY.value = Math.max(0, event.translationY);
    })
    .onEnd(event => {
      const height = panelHeight.value || windowHeight;

      if (
        event.translationY > height * DISMISS_FRACTION ||
        event.velocityY > DISMISS_VELOCITY
      ) {
        scheduleOnRN(onDismiss);

        return;
      }

      dragY.value = withSpring(0, motion.springs.panel);
    });

  const backdropStyle = useAnimatedStyle(() => {
    const height = panelHeight.value || windowHeight;

    return {
      opacity:
        progress.value *
        (1 - Math.min(dragY.value / height, 1) * BACKDROP_DRAG_FADE),
    };
  });

  const panelStyle = useAnimatedStyle(() => {
    const offscreen = panelHeight.value || windowHeight;

    return {
      transform: [
        {
          translateY:
            (1 - progress.value) * offscreen +
            dragY.value +
            keyboard.height.value,
        },
      ],
    };
  });

  const sizeStyle = heightFraction
    ? { height: Math.round(windowHeight * Math.min(heightFraction, 1)) }
    : { maxHeight: Math.round(windowHeight * MAX_HEIGHT_FRACTION) };

  return (
    <GestureHandlerRootView style={styles.root}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Touchable
          accessibilityLabel={t('ui.sheet.dismiss')}
          style={styles.backdropPress}
          onPress={onDismiss}
        />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.panel, sizeStyle, panelStyle]}
          onLayout={event => {
            panelHeight.value = event.nativeEvent.layout.height;
          }}>
          <View style={styles.grabber} />
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
  },
  backdropPress: {
    flex: 1,
  },
  grabber: {
    alignSelf: 'center',
    backgroundColor: theme.colors.hairline,
    borderRadius: theme.radii.chip,
    height: theme.size.grabber.height,
    marginBottom: theme.gutter.md,
    width: theme.size.grabber.width,
  },
  panel: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.radii.frame,
    borderTopRightRadius: theme.radii.frame,
    paddingBottom: rt.insets.bottom + theme.gutter.lg,
    paddingHorizontal: theme.gutter.md,
    paddingTop: theme.gutter.sm,
  },
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
}));
