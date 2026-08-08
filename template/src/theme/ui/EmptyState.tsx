import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { Text } from './Text';
import { View } from './View';

export type EmptyStateProps = {
  /** The one thing to do about it. A screenful of nothing should offer a way out. */
  action?: Pick<ButtonProps, 'label' | 'onPress'>;
  body?: string;
  icon: IconName;
  style?: StyleProp<ViewStyle>;
  title: string;
};

/** Reanimated layout animations honor Reduce Motion on their own. */
const ENTRANCE = FadeInDown.springify().damping(28).stiffness(220);

/**
 * What a list, a search, or a screen shows when it has nothing.
 *
 * A shared primitive rather than per-screen markup, because "nothing here yet"
 * is the state a reader is most likely to meet first and least likely to be
 * designed for twice.
 */
export function EmptyState({
  action,
  body,
  icon,
  style,
  title,
}: EmptyStateProps) {
  return (
    <Animated.View entering={ENTRANCE} style={[styles.container, style]}>
      <View style={styles.iconWell}>
        <Icon color="accent" name={icon} size={28} />
      </View>
      <Text bold center accessibilityRole="header" size="lg">
        {title}
      </Text>
      {body ? (
        <Text center color="text2">
          {body}
        </Text>
      ) : null}
      {action ? (
        <Button
          label={action.label}
          style={styles.action}
          variant="secondary"
          onPress={action.onPress}
        />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create(theme => ({
  action: {
    marginTop: theme.gutter.xs,
  },
  container: {
    alignItems: 'center',
    gap: theme.gutter.sm,
    padding: theme.gutter.xl,
  },
  iconWell: {
    alignItems: 'center',
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.chip,
    height: 64,
    justifyContent: 'center',
    marginBottom: theme.gutter.xs,
    width: 64,
  },
}));
