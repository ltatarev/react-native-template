import type { ReactNode } from 'react';
import React from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { KeyboardAwareScreen } from './KeyboardAwareScreen';
import { View } from './View';

/** One scroll event per frame at 60Hz — enough for anything reading position. */
const SCROLL_THROTTLE_MS = 16;

export type ScreenProps = {
  children: ReactNode;
  /**
   * Extra room at the end of the scroll content, so the last row clears
   * whatever floats over it — a tab bar, a FAB, a docked action. Only applies
   * when `scrollable`.
   */
  bottomClearance?: number;
  containerStyle?: StyleProp<ViewStyle>;
  /** Pads the content down past the notch. On by default. */
  includeTopInset?: boolean;
  /**
   * Lifts the content above the keyboard. Use on any screen with a field; it
   * replaces the plain scroll view with `KeyboardAwareScreen`.
   */
  keyboardAware?: boolean;
  /**
   * Nest a `KeyboardProvider` inside this screen. Native-stack
   * `pageSheet`/`formSheet` presentations render in a separate view hierarchy
   * that the app-root provider cannot measure, so their keyboard-aware content
   * never learns the keyboard height. Set this on any screen presented as a
   * sheet.
   */
  keyboardProvider?: boolean;
  /** Pinned below the content — a primary action, a summary bar. */
  renderFooter?: () => ReactNode;
  scrollable?: boolean;
  /** Scroll position, for content that loads as it comes into view. */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

/**
 * Every route-level component's outer shell.
 *
 * It owns the page background, the safe-area insets, whether the content
 * scrolls, and how the keyboard is handled — so a screen states what it needs
 * as props instead of assembling that stack again. Insets come from Unistyles
 * runtime rather than a `SafeAreaView`, so they follow rotation and the
 * screen's own padding composes with them.
 */
export function Screen({
  children,
  bottomClearance = 0,
  containerStyle,
  includeTopInset = true,
  keyboardAware = false,
  keyboardProvider = false,
  renderFooter,
  scrollable = false,
  onScroll,
}: ScreenProps) {
  styles.useVariants({ includeTopInset });

  function renderContent() {
    if (keyboardAware) {
      return (
        <KeyboardAwareScreen
          containerStyle={[styles.container, containerStyle]}
          renderFooter={renderFooter}>
          {children}
        </KeyboardAwareScreen>
      );
    }

    return (
      <>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: bottomClearance }}
            keyboardDismissMode="on-drag"
            /* Only worth the bridge traffic when someone is listening. */
            scrollEventThrottle={onScroll ? SCROLL_THROTTLE_MS : undefined}
            showsVerticalScrollIndicator={false}
            style={[styles.container, containerStyle]}
            onScroll={onScroll}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, containerStyle]}>{children}</View>
        )}
        {renderFooter ? (
          <View style={styles.footer}>{renderFooter()}</View>
        ) : null}
      </>
    );
  }

  const content = keyboardProvider ? (
    <KeyboardProvider>{renderContent()}</KeyboardProvider>
  ) : (
    renderContent()
  );

  return <View style={styles.page}>{content}</View>;
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    variants: {
      includeTopInset: {
        true: { paddingTop: rt.insets.top },
      },
    },
  },
  footer: {
    paddingBottom: rt.insets.bottom + theme.gutter.sm,
  },
  page: {
    backgroundColor: theme.colors.page,
    flex: 1,
  },
}));
