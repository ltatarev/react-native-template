import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from 'modules/home';
import { TabBar } from 'modules/navigation';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name={HomeNavigator.routeName} component={HomeNavigator} />
    </Tab.Navigator>
  );
}
