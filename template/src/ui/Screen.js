import React, { useMemo } from 'react';
import {
  ImageBackground, ScrollView, StyleSheet, View,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { gutter, useTheme } from 'theme';
import { PlatformServices } from 'utils/services';
import KeyboardAwareScreen from './KeyboardAwareScreen';

export function Screen({
  backgroundSource,
  backgroundStyle,
  children,
  containerStyle,
  keyboardAware,
  renderFooter,
  scrollable,
}) {
  const theme = useTheme();

  const hasFooter = useMemo(
    () => !!renderFooter && _.isFunction(renderFooter),
    [renderFooter],
  );

  const resolvedBackgroundStyle = useMemo(
    () => [styles.imageBackground, backgroundStyle],
    [backgroundStyle],
  );

  const resolvedMainContainerStyle = useMemo(
    () => [
      styles.mainContainer,
      { backgroundColor: theme['background-color-3'] },
    ],
    [theme],
  );

  const resolvedFooterStyle = useMemo(
    () => [styles.footer, { backgroundColor: theme['background-color-3'] }],
    [theme],
  );

  const resolvedContainerStyle = useMemo(
    () => [
      styles.container,
      scrollable && styles.scrollableContainer,
      containerStyle,
    ],
    [containerStyle, scrollable],
  );

  const WrapperComponent = useMemo(
    () => (scrollable ? ScrollView : View),
    [scrollable],
  );

  function renderContent() {
    if (keyboardAware) {
      return (
        <KeyboardAwareScreen
          containerStyle={containerStyle}
          renderFooter={renderFooter}
        >
          {children}
        </KeyboardAwareScreen>
      );
    }

    return (
      <>
        <WrapperComponent
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={resolvedContainerStyle}
        >
          {children}
        </WrapperComponent>
        <View style={resolvedFooterStyle}>{hasFooter && renderFooter()}</View>
      </>
    );
  }

  if (backgroundSource) {
    return (
      <View style={resolvedMainContainerStyle}>
        <ImageBackground
          source={backgroundSource}
          style={resolvedBackgroundStyle}
        >
          {renderContent()}
        </ImageBackground>
      </View>
    );
  }

  return <View style={resolvedMainContainerStyle}>{renderContent()}</View>;
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundSource: PropTypes.number,
  backgroundStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  keyboardAware: PropTypes.bool,
  renderFooter: PropTypes.func,
  scrollable: PropTypes.bool,
};

Screen.defaultProps = {
  backgroundSource: null,
  containerStyle: {},
  backgroundStyle: {},
  keyboardAware: false,
  renderFooter: null,
  scrollable: false,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    height: PlatformServices.height,
    width: PlatformServices.width,
  },
  container: {
    flex: 1,
    marginTop: PlatformServices.getStatusBarHeight(),
    paddingHorizontal: gutter.small,
  },
  footer: {
    paddingBottom: gutter.small,
  },
  scrollableContainer: {
    marginTop: 0,
  },
});
