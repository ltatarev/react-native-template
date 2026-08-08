import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from 'modules/redux';
import type { AppearanceMode } from 'theme';
import { selectAppearanceMode, themeActions } from 'theme';
import { Screen,SectionHeader } from 'theme/ui';
import { PlatformServices } from 'utils/services';
import { SettingsGroup, SettingsRow, SettingsSegment } from '../components';

/**
 * The screen every app ends up with.
 *
 * Ships with the two rows that are not product-specific — how the app looks, and
 * which build this is — so a new app has somewhere to put the third. Add groups;
 * keep each row's state in the module that owns it rather than here.
 */
export function SettingsScreen() {
  const dispatch = useAppDispatch();
  const appearanceMode = useAppSelector(selectAppearanceMode);
  const { t } = useTranslation();

  const appearanceOptions: { label: string; value: AppearanceMode }[] = [
    { label: t('settings.appearance.system'), value: 'system' },
    { label: t('settings.appearance.light'), value: 'light' },
    { label: t('settings.appearance.dark'), value: 'dark' },
  ];

  function handleAppearanceSelect(mode: AppearanceMode) {
    dispatch(themeActions.setAppearanceMode(mode));
  }

  return (
    <Screen scrollable containerStyle={style.container}>
      <SectionHeader title={t('settings.title')} />
      <SettingsGroup title={t('settings.appearance.group')}>
        <SettingsRow
          controlBelow
          control={
            <SettingsSegment
              options={appearanceOptions}
              value={appearanceMode}
              onSelect={handleAppearanceSelect}
            />
          }
          label={t('settings.appearance.label')}
          note={t('settings.appearance.note')}
        />
      </SettingsGroup>
      <SettingsGroup title={t('settings.about.group')}>
        <SettingsRow
          label={t('settings.about.version')}
          note={PlatformServices.getAppVersion()}
        />
      </SettingsGroup>
    </Screen>
  );
}

const style = StyleSheet.create(theme => ({
  container: {
    paddingBottom: theme.gutter.xl,
    paddingHorizontal: theme.gutter.md,
  },
}));
