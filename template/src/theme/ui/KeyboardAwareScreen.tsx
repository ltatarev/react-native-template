import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from './KeyboardAwareScrollView';
import { View } from './View';

type KeyboardAwareScreenProps = {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  renderFooter?: () => ReactNode;
};

/**
 * The keyboard-aware body of a `Screen`. Not used directly — reach it through
 * `<Screen keyboardAware />`.
 *
 * The footer rides the keyboard rather than being covered by it: a form's
 * primary action has to stay reachable while a field is focused, which is the
 * whole reason it is pinned in the first place.
 */
export function KeyboardAwareScreen({
  children,
  containerStyle,
  renderFooter,
}: KeyboardAwareScreenProps) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={containerStyle}>
        {children}
      </KeyboardAwareScrollView>
      {renderFooter ? (
        <KeyboardStickyView style={styles.footer}>
          {renderFooter()}
        </KeyboardStickyView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
  },
  footer: {
    paddingBottom: rt.insets.bottom + theme.gutter.sm,
  },
}));
