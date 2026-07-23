import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from 'modules/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme/providers';
import { StatusBar } from 'theme/ui';
import { useSplashScreen } from 'utils/hooks';
import { ToastHost } from 'utils/toast';
import { Navigator } from '../navigator';

export function App() {
  useSplashScreen();

  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <NavigationContainer>
                <StatusBar />
                <Navigator />
                <ToastHost />
              </NavigationContainer>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
