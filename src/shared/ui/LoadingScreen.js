import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'shared/theme';
import { ActivityIndicator } from './ActivityIndicator';
import { Screen } from './Screen';

export function LoadingScreen({ loading, ...otherProps }) {
  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Screen {...otherProps} />
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={colors.buttonPrimary} />
        </View>
      )}
    </View>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  overlayColor: PropTypes.string,
};

LoadingScreen.defaultProps = {
  overlayColor: 'light',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
