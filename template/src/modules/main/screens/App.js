import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSplashScreen } from 'utils/hooks';

export function App() {
  useSplashScreen();

  return (
    <NavigationContainer>
      <View>
        <Text>Welcome to your new template app!</Text>
      </View>
    </NavigationContainer>
  );
}
