import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch } from 'modules/redux';
import { Button, Icon, Screen, Text, View } from 'theme/ui';
import { onboardingActions } from '../redux';

/**
 * The first-run flow, as one screen.
 *
 * A placeholder with the wiring already correct: completing it flips the flag
 * the root navigator reads, so the app never returns here. Replace the copy and
 * add steps; keep `complete()` as the last thing the flow does.
 */
export function WelcomeScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleContinue() {
    dispatch(onboardingActions.complete());
  }

  return (
    <Screen
      containerStyle={style.container}
      renderFooter={() => (
        <Button
          label={t('onboarding.continue')}
          size="lg"
          style={style.action}
          onPress={handleContinue}
        />
      )}>
      <View style={style.iconWell}>
        <Icon color="accent" name="sparkle" size={32} />
      </View>
      <Text bold center accessibilityRole="header" family="serif" size="xxl">
        {t('onboarding.title')}
      </Text>
      <Text center color="text2">
        {t('onboarding.body')}
      </Text>
    </Screen>
  );
}

const style = StyleSheet.create(theme => ({
  action: {
    marginHorizontal: theme.gutter.md,
  },
  container: {
    alignItems: 'center',
    gap: theme.gutter.md,
    justifyContent: 'center',
    paddingHorizontal: theme.gutter.lg,
  },
  iconWell: {
    alignItems: 'center',
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.chip,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
}));
