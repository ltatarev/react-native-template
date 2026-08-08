import type { ReactNode } from 'react';
import React, { Children } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Divider, Text, View } from 'theme/ui';

export type SettingsGroupProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Quiet uppercase heading above the card. */
  title?: string;
};

/**
 * One card holding several rows, hairlines between them.
 *
 * Grouped rather than a card per row: a screen of separate floating cards reads
 * as a list of unrelated decisions, where the grouping is what says these
 * settings belong to the same thing.
 */
export function SettingsGroup({ children, style, title }: SettingsGroupProps) {
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <View style={style}>
      {title === undefined ? null : (
        <Text uppercase color="textMuted" size="xs" style={styles.title}>
          {title}
        </Text>
      )}
      <Card padding="none" style={styles.card}>
        {rows.map((row, index) => (
          // Index keys: these are hand-written rows in source order, never a
          // reordered or filtered runtime list.
           
          <View key={index}>
            {index > 0 && <Divider inset />}
            {row}
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  card: {
    overflow: 'hidden',
  },
  title: {
    marginBottom: theme.gutter.sm,
    marginTop: theme.gutter.lg,
  },
}));
