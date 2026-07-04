import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Middleware, Store } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PersistConfig } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig: PersistConfig<ReturnType<typeof combinedReducers>> = {
  key: 'root',
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  template: (state = {}) => state,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export function composeMiddlewares(): Middleware[] {
  const coreMiddleware: Middleware[] = [];

  // Add other module middleware
  const moduleMiddleware: Middleware[] = [];

  return [...coreMiddleware, ...moduleMiddleware];
}

export function configureAppStore(): Store {
  return configureStore({
    reducer: persistedReducer,
    devTools: __DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(composeMiddlewares()),
  });
}
