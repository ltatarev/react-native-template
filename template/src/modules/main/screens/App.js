import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useSplashScreen } from 'utils/hooks';
import { Navigator } from '../navigator';
import { configureAppStore } from '../redux';

export function App() {
  useSplashScreen();

  const store = configureAppStore();
  const persistor = persistStore(store);
  // persistor.purge();

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
