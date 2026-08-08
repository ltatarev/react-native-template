import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DESIGN_SYSTEM_ROUTE } from 'modules/design-system';
import { useAppDispatch, useAppSelector } from 'modules/redux';
import { SETTINGS_ROUTE } from 'modules/settings';
import { Button, Row, Screen, Text } from 'theme/ui';
import { HapticFeedbackService } from 'utils/haptic-feedback';
import { showToast } from 'utils/toast';
import { homeActions, selectHomeInteractionCount } from '../redux';

/**
 * A screen types only the routes it navigates to, rather than importing the root
 * stack's param list — that would be a reverse dependency on `modules/main`, and
 * would make every screen's types churn whenever a route is added anywhere.
 */
type HomeNavigation = NativeStackNavigationProp<{
  [DESIGN_SYSTEM_ROUTE]: undefined;
  [SETTINGS_ROUTE]: undefined;
}>;

/**
 * A neutral reference feature: one slice, one action, one toast.
 *
 * Kept deliberately contentless — it is here to show the wiring (typed hooks,
 * i18n, haptics, feedback, shared primitives) and to be deleted or rewritten as
 * soon as the app has a real first screen.
 */
export function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeNavigation>();
  const interactionCount = useAppSelector(selectHomeInteractionCount);
  const { t } = useTranslation();

  function handlePrimaryAction() {
    dispatch(homeActions.recordInteraction());
    HapticFeedbackService.triggerSelection();
    showToast({
      message: t('home.toastMessage'),
      tone: 'success',
    });
  }

  return (
    <Screen containerStyle={style.container}>
      <Text bold center family="serif" size="xxl">
        {t('home.welcome')}
      </Text>
      <Text center color="text2">
        {t('home.description')}
      </Text>
      <Text center numeric color="textMuted" size="sm">
        {t('home.interactionCount', { count: interactionCount })}
      </Text>
      <Button
        accessibilityHint={t('home.primaryActionHint')}
        label={t('home.primaryAction')}
        size="lg"
        style={style.action}
        onPress={handlePrimaryAction}
      />
      <Row gap="sm" justify="center" style={style.links}>
        <Button
          label={t('settings.title')}
          variant="ghost"
          onPress={() => navigation.navigate(SETTINGS_ROUTE)}
        />
        {__DEV__ ? (
          <Button
            label={t('designSystem.title')}
            variant="ghost"
            onPress={() => navigation.navigate(DESIGN_SYSTEM_ROUTE)}
          />
        ) : null}
      </Row>
    </Screen>
  );
}

const style = StyleSheet.create(theme => ({
  action: {
    marginTop: theme.gutter.md,
  },
  container: {
    gap: theme.gutter.xs,
    justifyContent: 'center',
    paddingHorizontal: theme.gutter.lg,
  },
  links: {
    marginTop: theme.gutter.sm,
  },
}));
