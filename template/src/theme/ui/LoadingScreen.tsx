import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../hooks';
import { Text } from './Text';
import { View } from './View';

export type LoadingScreenProps = {
  /** Replaces the default "Loading" line — say what is being waited on. */
  message?: string;
};

/**
 * A whole screen that is still waiting: a cold start behind a migration, a gate
 * that cannot render its content yet.
 *
 * For a region rather than a screen, use `Skeleton` — a spinner says "wait",
 * a skeleton says "here is the shape of what is coming", and the second is
 * almost always the better answer inside a screen that already has chrome.
 */
export function LoadingScreen({ message }: LoadingScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const label = message ?? t('ui.loading');

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      style={styles.container}>
      <ActivityIndicator color={theme.colors.accent} size="large" />
      <Text color="text2" size="sm">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.page,
    flex: 1,
    gap: theme.gutter.md,
    justifyContent: 'center',
  },
}));
