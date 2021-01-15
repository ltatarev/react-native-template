import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavigator } from 'modules/home';
import { StackNavigatorService } from 'modules/navigation';
import { OnboardingNavigator } from 'modules/onboarding';

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={StackNavigatorService.hideHeader}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
