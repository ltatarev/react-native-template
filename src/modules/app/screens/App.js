import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'shared/ui';
import { useDismissingSplashScreen } from '../hooks';
import { Navigator } from '../navigator';
import { configureAppStore } from '../redux';
import { AnimatedSplashScreen } from './AnimatedSplashScreen';

export function App() {
  useDismissingSplashScreen();

  const store = configureAppStore();
  const persistor = persistStore(store);
  // persistor.purge();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar />
        <AnimatedSplashScreen>
          <Navigator />
        </AnimatedSplashScreen>
      </PersistGate>
    </Provider>
  );
}
