import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useSplashScreen } from 'utils/hooks';
import { StatusBar } from '../../../ui';
import { Navigator } from '../navigator';
import { configureAppStore } from '../redux';

export function App() {
  useSplashScreen();

  const store = configureAppStore();
  const persistor = persistStore(store);
  // persistor.purge();

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
