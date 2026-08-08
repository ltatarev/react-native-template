import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DESIGN_SYSTEM_ROUTE, GalleryScreen } from 'modules/design-system';
import { HomeScreen, MODULE_NAME as HOME_ROUTE } from 'modules/home';
import { StackNavigatorService } from 'modules/navigation';
import {
  ONBOARDING_ROUTE,
  selectOnboardingCompleted,
  WelcomeScreen,
} from 'modules/onboarding';
import { useAppSelector } from 'modules/redux';
import { SETTINGS_ROUTE, SettingsScreen } from 'modules/settings';

const Stack = createNativeStackNavigator();

/**
 * The root navigator.
 *
 * First-run is a route rather than a branch around the navigator: keeping it in
 * the same stack means the transition out of onboarding is an ordinary
 * navigation, and deep links resolve the same way in both states.
 *
 * `initialRouteName` is all the gate needs — flipping `completed` while the app
 * is open does not re-mount the navigator, and the flow navigates on from
 * itself when it finishes.
 */
export function Navigator() {
  const onboardingCompleted = useAppSelector(selectOnboardingCompleted);

  return (
    <Stack.Navigator
      initialRouteName={onboardingCompleted ? HOME_ROUTE : ONBOARDING_ROUTE}
      screenOptions={StackNavigatorService.hideHeader}>
      <Stack.Screen component={WelcomeScreen} name={ONBOARDING_ROUTE} />
      <Stack.Screen component={HomeScreen} name={HOME_ROUTE} />
      <Stack.Screen
        component={SettingsScreen}
        name={SETTINGS_ROUTE}
        options={StackNavigatorService.defaultScreenOptions}
      />
      {/* Development surface only — see `GalleryScreen`. */}
      {__DEV__ ? (
        <Stack.Screen
          component={GalleryScreen}
          name={DESIGN_SYSTEM_ROUTE}
          options={StackNavigatorService.defaultScreenOptions}
        />
      ) : null}
    </Stack.Navigator>
  );
}
