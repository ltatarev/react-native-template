import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Row } from './Row';
import { Text } from './Text';
import { View } from './View';

export type SectionHeaderProps = {
  /** A trailing control: "See all", a sort menu, a count. */
  action?: ReactNode;
  /** Quiet uppercase label above the title. */
  eyebrow?: string;
  style?: StyleProp<ViewStyle>;
  /** One quiet line under the title. */
  subtitle?: string;
  title: string;
};

/**
 * The heading above a group of content. Renders the title as a real heading, so
 * a screen reader can jump between sections.
 */
export function SectionHeader({
  action,
  eyebrow,
  style,
  subtitle,
  title,
}: SectionHeaderProps) {
  return (
    <Row align="end" justify="between" style={[styles.header, style]}>
      <View style={styles.text}>
        {eyebrow ? (
          <Text uppercase color="textMuted" size="xs">
            {eyebrow}
          </Text>
        ) : null}
        <Text bold accessibilityRole="header" size="xl">
          {title}
        </Text>
        {subtitle ? (
          <Text color="text2" size="sm">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </Row>
  );
}

const styles = StyleSheet.create(theme => ({
  header: {
    paddingVertical: theme.gutter.sm,
  },
  text: {
    flexShrink: 1,
    gap: 2,
  },
}));
