import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TAB_ROUTES } from 'modules/main';
import { StackNavigatorService } from 'modules/navigation';
import { ROUTES } from './const';
import { HomeScreen } from './screens';

const Stack = createStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={StackNavigatorService.defaultScreenOptions}>
      <Stack.Screen name={ROUTES.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
}

HomeNavigator.routeName = TAB_ROUTES.Home;
