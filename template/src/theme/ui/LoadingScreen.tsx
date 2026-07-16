import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from 'theme';
import { Screen, ScreenProps } from './Screen';

interface LoadingScreenProps extends ScreenProps {
  loading: boolean;
}

export function LoadingScreen({ loading, ...otherProps }: LoadingScreenProps) {
  const theme = useTheme();

  const resolvedOverlayStyle = useMemo(
    () => [
      styles.overlay,
      { backgroundColor: theme['color-basic-transparent-200'] },
    ],
    [theme],
  );

  const resolvedActivityIndicatorColor = useMemo(
    () => theme['color-basic-500'],
    [theme],
  );

  return (
    <View style={styles.container}>
      <Screen {...otherProps}>
        {/* LoadingScreen does not render children by default */}
      </Screen>
      {loading && (
        <View style={resolvedOverlayStyle}>
          <ActivityIndicator
            color={resolvedActivityIndicatorColor}
            size="large"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0,
  },
  overlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
