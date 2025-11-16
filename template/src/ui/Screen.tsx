import React, { ReactNode } from 'react';
import {
  ImageBackground, ScrollView, StyleSheet, View,
} from 'react-native';
import { gutter, useTheme } from 'theme';
import { PlatformServices } from 'utils/services';
import { KeyboardAwareScreen } from './KeyboardAwareScreen';

export interface ScreenProps {
  children: ReactNode;
  backgroundSource?: number | null;
  backgroundStyle?: object;
  containerStyle?: object;
  keyboardAware?: boolean;
  renderFooter?: (() => ReactNode) | null;
  scrollable?: boolean;
}

export function Screen({
  children,
  backgroundSource = null,
  backgroundStyle = {},
  containerStyle = {},
  keyboardAware = false,
  renderFooter = null,
  scrollable = false,
}: ScreenProps) {
  const theme = useTheme();

  const hasFooter = !!renderFooter && typeof renderFooter === 'function';

  const resolvedBackgroundStyle = [styles.imageBackground, backgroundStyle];

  const resolvedMainContainerStyle = [
    styles.mainContainer,
    { backgroundColor: theme['background-color-3'] },
  ];

  const resolvedFooterStyle = [
    styles.footer,
    { backgroundColor: theme['background-color-3'] },
  ];

  const resolvedContainerStyle = [
    styles.container,
    scrollable && styles.scrollableContainer,
    containerStyle,
  ];

  const WrapperComponent = scrollable ? ScrollView : View;

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
        <View style={resolvedFooterStyle}>
          {hasFooter && renderFooter && renderFooter()}
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: PlatformServices.getStatusBarHeight(),
    paddingHorizontal: gutter.small,
  },
  footer: {
    paddingBottom: gutter.small,
  },
  imageBackground: {
    height: PlatformServices.height,
    width: PlatformServices.width,
  },
  mainContainer: {
    flex: 1,
  },
  scrollableContainer: {
    marginTop: 0,
  },
});
