import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigatorService } from 'modules/navigation';
import { HomeScreen } from './screens';

const Stack = createStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={StackNavigatorService.hideHeader}>
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
    </Stack.Navigator>
  );
}
