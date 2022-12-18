import React, { useMemo } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { gutter, useTheme } from 'theme';
import { PlatformServices } from 'utils/services';

const KEYBOARD_AVOIDING_BEHAVIOUR = PlatformServices.isAndroid()
  ? null
  : 'padding';
const KEYBOARD_DISMISS_MODE = PlatformServices.isIOS()
  ? 'interactive'
  : 'on-drag';

export function KeyboardAwareScreen({
  children,
  containerStyle,
  renderFooter,
}) {
  const theme = useTheme();

  const hasFooter = useMemo(
    () => !!renderFooter && _.isFunction(renderFooter),
    [renderFooter],
  );

  const resolvedFooterStyle = useMemo(
    () => [styles.footer, { backgroundColor: theme['background-color-3'] }],
    [theme],
  );

  const resolvedMainContainerStyle = useMemo(
    () => [
      styles.mainContainer,
      { backgroundColor: theme['background-color-3'] },
    ],
    [theme],
  );

  const resolvedContainerStyle = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle],
  );

  const headerHeight = useHeaderHeight();

  // Android will handle sticky footer natively,
  // while on iOS it's best to leave it inside KeyboardAvoidingView
  // to prevent footer being behind the keyboard
  if (PlatformUtils.isIOS()) {
    return (
      <SafeAreaView edges={['left']} style={resolvedMainContainerStyle}>
        <KeyboardAvoidingView
          behavior={KEYBOARD_AVOIDING_BEHAVIOUR}
          keyboardVerticalOffset={headerHeight}
          style={resolvedContainerStyle}
        >
          <ScrollView
            keyboardDismissMode={KEYBOARD_DISMISS_MODE}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          <View style={resolvedFooterStyle}>{hasFooter && renderFooter()}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={resolvedContainerStyle}
    >
      <ScrollView
        keyboardDismissMode={KEYBOARD_DISMISS_MODE}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <View style={styles.footer}>{hasFooter && renderFooter()}</View>
    </KeyboardAvoidingView>
  );
}

KeyboardAwareScreen.propTypes = {
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.object,
  renderFooter: PropTypes.func,
};

KeyboardAwareScreen.defaultProps = {
  containerStyle: {},
  renderFooter: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: gutter.small,
  },
  footer: {
    paddingBottom: gutter.small,
  },
});
