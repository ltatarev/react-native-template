import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from 'modules/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'theme/ui';
import { useSplashScreen } from 'utils/hooks';
import { ToastHost } from 'utils/toast';
import 'theme/unistyles';
import { Navigator } from '../navigator';

export function App() {
  useSplashScreen();

  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <StatusBar />
              <Navigator />
              <ToastHost />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
