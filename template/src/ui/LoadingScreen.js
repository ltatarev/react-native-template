import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'theme';
import { ActivityIndicator } from './ActivityIndicator';
import { Screen } from './Screen';

export function LoadingScreen({ loading, ...otherProps }) {
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
      <Screen {...otherProps} />
      {loading && (
        <View style={resolvedOverlayStyle}>
          <ActivityIndicator color={resolvedActivityIndicatorColor} />
        </View>
      )}
    </View>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
