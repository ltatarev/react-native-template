import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from 'modules/redux';
import { Button, Screen, Text } from 'theme/ui';
import { HapticFeedbackService } from 'utils/haptic-feedback';
import { showToast } from 'utils/toast';
import { homeActions, selectHomeInteractionCount } from '../redux';

export function HomeScreen() {
  const dispatch = useAppDispatch();
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
      <Text bold center>
        {t('home.welcome')}
      </Text>
      <Text center style={style.description}>
        {t('home.description')}
      </Text>
      <Text center style={style.counter}>
        {t('home.interactionCount', { count: interactionCount })}
      </Text>
      <Button
        accessibilityHint={t('home.primaryActionHint')}
        label={t('home.primaryAction')}
        style={style.button}
        onPress={handlePrimaryAction}
      />
    </Screen>
  );
}

const style = StyleSheet.create((theme) => ({
  button: {
    marginTop: theme.gutter.lg,
  },
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.gutter.lg,
  },
  counter: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.gutter.sm,
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    marginTop: theme.gutter.sm,
  },
}));
