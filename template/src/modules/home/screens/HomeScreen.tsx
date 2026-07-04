import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { Button, Screen, Text } from 'theme/ui';
import { showToast } from 'utils/toast';

export function HomeScreen() {
  const { t } = useTranslation();

  function handleShowToast() {
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
      <Button
        accessibilityHint={t('home.showToastHint')}
        label={t('home.showToast')}
        style={style.button}
        onPress={handleShowToast}
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
}));
