import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MODULE_NAME as HOME_ROUTE } from 'modules/home';
import { StackNavigatorService } from 'modules/navigation';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName={HOME_ROUTE}
      screenOptions={StackNavigatorService.hideHeader}
    >
      <Stack.Screen component={HomeScreen} name={HOME_ROUTE} />
    </Stack.Navigator>
  );
}
