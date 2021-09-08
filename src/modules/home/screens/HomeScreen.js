import React from 'react';
import { Screen, Text } from 'shared/ui';
import {
  StackNavigatorService,
  useNavigationOptions,
} from 'modules/navigation';

export function HomeScreen() {
  useNavigationOptions(StackNavigatorService.hideHeader);

  return (
    <Screen>
      <Text>Home</Text>
    </Screen>
  );
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};
