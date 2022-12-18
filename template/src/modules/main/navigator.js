import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeNavigator } from 'modules/home';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen component={HomeNavigator} name="Home" />
    </Stack.Navigator>
  );
}
