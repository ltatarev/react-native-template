import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Text, Touchable, View } from 'theme/ui';

type SegmentOption<Value extends string> = {
  label: string;
  value: Value;
};

export type SettingsSegmentProps<Value extends string> = {
  options: SegmentOption<Value>[];
  value: Value;
  onSelect: (value: Value) => void;
};

/**
 * A segmented control: a track of equal options with the chosen one raised out
 * of it. Generic over the value, so a caller keeps its own union type end to end.
 */
export function SettingsSegment<Value extends string>({
  options,
  value,
  onSelect,
}: SettingsSegmentProps<Value>) {
  return (
    <View style={styles.track}>
      {options.map(option => {
        const selected = option.value === value;

        return (
          <Touchable
            key={option.value}
            accessibilityLabel={option.label}
            accessibilityState={{ selected }}
            style={[styles.item, selected && styles.itemSelected]}
            onPress={() => onSelect(option.value)}>
            <Text
              center
              bold={selected}
              color={selected ? 'text' : 'text2'}
              size="sm">
              {option.label}
            </Text>
          </Touchable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  item: {
    borderRadius: theme.radii.sm,
    flex: 1,
    paddingVertical: theme.gutter.xs,
  },
  itemSelected: {
    backgroundColor: theme.colors.card,
  },
  track: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radii.ctrl,
    flexDirection: 'row',
    gap: theme.gutter.xs,
    padding: 3,
  },
}));
