import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigatorService, TabBar, TAB_ROUTES } from 'modules/navigation';
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

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name={HomeNavigator.routeName} component={HomeNavigator} />
    </Tab.Navigator>
  );
}
