import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from 'modules/home';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export function composeMiddlewares() {
  const coreMiddleware = [];

  if (process.env.NODE_ENV !== 'production') {
    coreMiddleware.push(logger);
  }

  // Add other module middleware
  const moduleMiddleware = [];

  return [...coreMiddleware, ...moduleMiddleware];
}

export function configureAppStore() {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(composeMiddlewares())
      .concat(pokemonApi.middleware),
  });
}
