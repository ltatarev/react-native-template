import React from 'react';
import { StyleSheet } from 'react-native';
import { Screen, Text } from 'ui';

export function HomeScreen() {
  return (
    <Screen containerStyle={style.container}>
      <Text bold center>
        Welcome to your new app!
      </Text>
    </Screen>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
