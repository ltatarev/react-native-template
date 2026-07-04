import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from 'modules/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useSplashScreen } from 'utils/hooks';
import { StatusBar } from '../../../ui';
import { Navigator } from '../navigator';

export function App() {
  useSplashScreen();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar />
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
