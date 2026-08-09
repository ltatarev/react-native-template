import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'modules/navigation';
import { persistor, store } from 'modules/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme/providers';
import { flexStyle } from 'theme/styles';
import { StatusBar } from 'theme/ui';
import { useSplashScreen } from 'utils/hooks';
import { ToastHost } from 'utils/toast';
import { DevToolsHost } from '../components/DevToolsHost';
import { Navigator } from '../navigator';

/**
 * The app shell. It owns provider order and nothing else — no product logic
 * belongs here.
 *
 * The order is load-bearing, outside in:
 *
 * - `GestureHandlerRootView` — must be the outermost view, or gestures below it
 *   never reach the handlers.
 * - `SafeAreaProvider` — explicit, with `initialWindowMetrics` so the first
 *   frame already has the insets instead of laying out twice. Native-stack
 *   screens get one internally; anything presented outside a stack relies on
 *   this one.
 * - `KeyboardProvider` — above the navigator, so a pushed screen inherits it.
 *   A screen presented as a sheet needs its own (`<Screen keyboardProvider />`).
 * - `Provider` then `PersistGate` — nothing that reads state may render before
 *   rehydration, or it paints once with defaults and again with the real values.
 * - `ThemeProvider` — inside `Provider`, because the appearance choice is state.
 * - `NavigationContainer` — with the shared `navigationRef` attached, so code
 *   outside the tree can navigate.
 *
 * Hosts (`ToastHost`, and anything like it) are siblings of the navigator rather
 * than children of a screen: they belong to the app, so they survive navigation
 * and float over every route at the same height.
 */
export function App() {
  useSplashScreen();

  return (
    <GestureHandlerRootView style={flexStyle}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/*
          Renders nothing, and nothing at all in a release bundle: it is what
          lets the debugger — and an agent over `rozenite agent` — read the
          store and both MMKV instances. Outside the providers because it
          depends on none of them, and above `PersistGate` so it is connected
          before rehydration rather than after it.
        */}
        <DevToolsHost />
        <KeyboardProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider>
                <NavigationContainer ref={navigationRef}>
                  <StatusBar />
                  <Navigator />
                  <ToastHost />
                </NavigationContainer>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
