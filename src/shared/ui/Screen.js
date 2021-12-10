import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { colors, gutter, iPhoneXPadding } from 'shared/theme';
import { PlatformUtils } from 'shared/utils';

const KEYBOARD_AVOIDING_BEHAVIOUR = PlatformUtils.isAndroid()
  ? null
  : 'padding';
const KEYBOARD_OFFSET = PlatformUtils.isIPhoneX() ? 5 : 67;

export function Screen(props) {
  const {
    scrollable,
    keyboardAware,
    containerStyle,
    wrapperStyle,
    children,
    FooterComponent,
  } = props;

  function renderContent() {
    const WrapperComponent = scrollable ? ScrollView : View;
    const style = [styles.wrapper, wrapperStyle];

    return (
      <WrapperComponent showsVerticalScrollIndicator={false} style={style}>
        {children}
      </WrapperComponent>
    );
  }

  if (!keyboardAware) {
    const WrapperComponent = scrollable ? ScrollView : View;

    return (
      <WrapperComponent style={[styles.container, containerStyle]}>
        {children}
      </WrapperComponent>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={KEYBOARD_OFFSET}
      behavior={KEYBOARD_AVOIDING_BEHAVIOUR}
      style={[styles.container, containerStyle]}
    >
      {renderContent()}
      {FooterComponent}
    </KeyboardAvoidingView>
  );
}

Screen.propTypes = {
  scrollable: PropTypes.bool,
  keyboardAware: PropTypes.bool,
  children: PropTypes.node.isRequired,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  FooterComponent: PropTypes.node,
};

Screen.defaultProps = {
  scrollable: false,
  keyboardAware: false,
  containerStyle: undefined,
  wrapperStyle: undefined,
  FooterComponent: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingTop: 30,
    ...PlatformUtils.ifIPhoneX({
      paddingBottom: iPhoneXPadding,
      paddingTop: iPhoneXPadding + 65,
    }),
    paddingHorizontal: gutter.small,
  },
  wrapper: {
    flex: 1,
    paddingBottom: iPhoneXPadding,
  },
});
