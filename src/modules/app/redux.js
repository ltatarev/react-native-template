import AsyncStorage from '@react-native-community/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { MODULE_NAME as CORE_MODULE, coreReducer } from 'modules/core';
import {
  MODULE_NAME as ONBOARDING,
  onboardingReducer,
} from 'modules/onboarding';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  [ONBOARDING]: onboardingReducer,
  [CORE_MODULE]: coreReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export function composeMiddlewares() {
  const coreMiddleware = [thunk];

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
    middleware: composeMiddlewares(),
  });
}
