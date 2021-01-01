import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigatorService } from 'modules/navigation';
import { ROUTES } from './const';
import { OnboardingScreen } from './screens';

const Stack = createStackNavigator();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={StackNavigatorService.defaultScreenOptions}
      initialRouteName={ROUTES.OnboardingScreen}
    >
      <Stack.Screen
        name={ROUTES.OnboardingScreen}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
}
