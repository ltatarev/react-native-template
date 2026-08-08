import type { ReactNode } from 'react';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import type { TextColor } from 'theme/ui';
import { Icon, Text, Touchable, View } from 'theme/ui';

export type SettingsRowProps = {
  /** Trailing control — a `Switch`, a status label, a segmented control. */
  control?: ReactNode;
  /** Renders the control under the label instead of beside it. */
  controlBelow?: boolean;
  /**
   * Spoken hint, for a row whose outcome is not obvious from its label.
   * Defaults to `note`.
   */
  hint?: string;
  label: string;
  labelColor?: TextColor;
  note?: string;
  /** Adds a chevron and makes the whole row pressable. */
  onPress?: () => void;
};

/** One row inside a `SettingsGroup`: a label, an optional note, one control. */
export function SettingsRow({
  control,
  controlBelow = false,
  hint,
  label,
  labelColor = 'text',
  note,
  onPress,
}: SettingsRowProps) {
  const labelBlock = (
    <View style={styles.text}>
      <Text color={labelColor}>{label}</Text>
      {note === undefined ? null : (
        <Text color="text2" size="xs">
          {note}
        </Text>
      )}
    </View>
  );

  if (controlBelow) {
    return (
      <View style={styles.stacked}>
        {labelBlock}
        <View style={styles.stackedControl}>{control}</View>
      </View>
    );
  }

  const body = (
    <>
      {labelBlock}
      {control}
      {onPress === undefined ? null : (
        <Icon color="textMuted" name="chevronRight" />
      )}
    </>
  );

  if (onPress === undefined) {
    return <View style={styles.row}>{body}</View>;
  }

  return (
    <Touchable
      accessibilityHint={hint ?? note}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      onPress={onPress}>
      {body}
    </Touchable>
  );
}

const styles = StyleSheet.create(theme => ({
  pressed: {
    opacity: 0.9,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.gutter.md,
    minHeight: 56,
    paddingHorizontal: theme.gutter.md,
    paddingVertical: theme.gutter.sm,
  },
  stacked: {
    paddingHorizontal: theme.gutter.md,
    paddingVertical: theme.gutter.sm,
  },
  stackedControl: {
    marginTop: theme.gutter.sm,
  },
  text: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
}));
