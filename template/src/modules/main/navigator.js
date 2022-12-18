import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeNavigator } from 'modules/home';
import { StackNavigatorService } from 'modules/navigation';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={StackNavigatorService.hideHeader}
    >
      <Stack.Screen component={HomeNavigator} name="Home" />
    </Stack.Navigator>
  );
}
