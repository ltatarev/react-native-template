import React, { useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import type { IconName, PillTone } from 'theme/ui';
import {
  Button,
  Card,
  ConfirmDialog,
  Divider,
  EmptyState,
  Icon,
  ICON_PATHS,
  IconButton,
  Pill,
  ProgressBar,
  Row,
  Screen,
  SectionHeader,
  Sheet,
  Skeleton,
  Switch,
  Text,
  TextInput,
  View,
} from 'theme/ui';
import { showToast } from 'utils/toast';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const PILL_TONES: PillTone[] = [
  'neutral',
  'accent',
  'success',
  'warning',
  'danger',
  'info',
];
const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];

/**
 * Every primitive in `theme/ui`, on one screen, in the live theme.
 *
 * This is a development surface, not a product one: it is where a new primitive
 * gets looked at in both themes and at every size before a feature depends on
 * it, and where a palette change gets checked in one pass instead of by touring
 * the app. Reach it from wherever is convenient — a debug row in settings, a
 * long-press — and leave it out of release navigation.
 */
export function GalleryScreen() {
  const [switchOn, setSwitchOn] = useState(true);
  const [field, setField] = useState('');
  const [sheetVisible, setSheetVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <Screen scrollable containerStyle={style.container}>
      <SectionHeader eyebrow="theme/ui" title="Type" />
      <Card>
        {SIZES.map(size => (
          <Text key={size} size={size}>
            {size} — the quick brown fox
          </Text>
        ))}
        <Divider style={style.divider} />
        <Text family="serif" size="xl">
          Serif display voice
        </Text>
        <Text bold>Bold body</Text>
        <Text color="text2">Secondary copy</Text>
        <Text uppercase color="textMuted" size="xs">
          Eyebrow label
        </Text>
        <Text numeric>1,234.56 tabular</Text>
      </Card>

      <SectionHeader title="Buttons" />
      <Card>
        <Row wrap gap="sm">
          <Button label="Primary" onPress={() => undefined} />
          <Button label="Secondary" variant="secondary" onPress={() => undefined} />
          <Button label="Ghost" variant="ghost" onPress={() => undefined} />
          <Button
            label="Destructive"
            variant="destructive"
            onPress={() => undefined}
          />
        </Row>
        <Row wrap gap="sm" style={style.stack}>
          <Button label="Small" size="sm" onPress={() => undefined} />
          <Button icon="plus" label="With icon" onPress={() => undefined} />
          <Button loading label="Loading" onPress={() => undefined} />
          <Button disabled label="Disabled" onPress={() => undefined} />
        </Row>
        <Row gap="sm" style={style.stack}>
          <IconButton
            accessibilityLabel="Plain icon button"
            icon="search"
            onPress={() => undefined}
          />
          <IconButton
            accessibilityLabel="Filled icon button"
            icon="heart"
            variant="filled"
            onPress={() => undefined}
          />
          <IconButton
            accessibilityLabel="Outlined icon button"
            icon="share"
            variant="outlined"
            onPress={() => undefined}
          />
        </Row>
      </Card>

      <SectionHeader title="Icons" />
      <Card>
        <Row wrap gap="md">
          {ICON_NAMES.map(name => (
            <Icon key={name} name={name} size={22} />
          ))}
        </Row>
      </Card>

      <SectionHeader title="Status" />
      <Card>
        <Row wrap gap="xs">
          {PILL_TONES.map(tone => (
            <Pill key={tone} label={tone} tone={tone} />
          ))}
        </Row>
        <View style={style.stack}>
          <ProgressBar max={100} value={35} />
        </View>
        <Row gap="sm" style={style.stack}>
          <Skeleton height={40} radius="chip" width={40} />
          <Skeleton height={40} style={style.fill} />
        </Row>
      </Card>

      <SectionHeader title="Input" />
      <Card>
        <TextInput
          hint="A hint sits under the field."
          label="Label"
          placeholder="Placeholder"
          value={field}
          onChangeText={setField}
        />
        <View style={style.stack}>
          <TextInput
            errorMessage="Something is wrong with this."
            label="With an error"
            value={field}
            onChangeText={setField}
          />
        </View>
        <Row justify="between" style={style.stack}>
          <Text>Switch</Text>
          <Switch value={switchOn} onValueChange={setSwitchOn} />
        </Row>
      </Card>

      <SectionHeader title="Overlays" />
      <Card>
        <Row wrap gap="sm">
          <Button
            label="Toast"
            variant="secondary"
            onPress={() =>
              showToast({
                action: { label: 'Undo', onPress: () => undefined },
                message: 'Something happened.',
                tone: 'success',
              })
            }
          />
          <Button
            label="Sheet"
            variant="secondary"
            onPress={() => setSheetVisible(true)}
          />
          <Button
            label="Dialog"
            variant="secondary"
            onPress={() => setDialogVisible(true)}
          />
        </Row>
      </Card>

      <SectionHeader title="Empty state" />
      <EmptyState
        action={{ label: 'Do the thing', onPress: () => undefined }}
        body="What the reader can do about it goes here."
        icon="sparkle"
        title="Nothing here yet"
      />

      <Sheet visible={sheetVisible} onDismiss={() => setSheetVisible(false)}>
        <Text bold size="lg">
          A sheet
        </Text>
        <Text color="text2">Drag it down, or tap the scrim.</Text>
      </Sheet>

      <ConfirmDialog
        destructive
        body="Confirmations are always answerable with a cancel."
        confirmLabel="Delete"
        title="Delete this?"
        visible={dialogVisible}
        onConfirm={() => setDialogVisible(false)}
        onDismiss={() => setDialogVisible(false)}
      />
    </Screen>
  );
}

const style = StyleSheet.create(theme => ({
  container: {
    gap: theme.gutter.sm,
    paddingBottom: theme.gutter.xxl,
    paddingHorizontal: theme.gutter.md,
  },
  divider: {
    marginVertical: theme.gutter.sm,
  },
  fill: {
    flex: 1,
  },
  stack: {
    marginTop: theme.gutter.sm,
  },
}));
