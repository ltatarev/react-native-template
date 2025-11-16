import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Middleware, Store } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from 'modules/home';
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
  [pokemonApi.reducerPath]: pokemonApi.reducer,
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
    devTools: process.env.NODE_ENV !== 'production',
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(composeMiddlewares())
      .concat(pokemonApi.middleware),
  });
}
