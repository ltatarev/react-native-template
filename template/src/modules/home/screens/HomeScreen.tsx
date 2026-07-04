import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Screen, Text } from '../../../ui';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Screen containerStyle={style.container}>
      <Text bold center>
        {t('home.welcome')}
      </Text>
    </Screen>
  );
}

const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
