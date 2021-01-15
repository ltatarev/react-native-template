import React from 'react';
import {
  StackNavigatorService,
  useNavigationOptions,
} from 'modules/navigation';
import { Screen, Text } from 'shared/ui';

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
