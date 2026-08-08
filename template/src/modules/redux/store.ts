import type { Middleware } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MODULE_NAME as FEATURE_FLAG } from 'modules/feature-flag/const';
import { featureFlagReducer } from 'modules/feature-flag/redux/slice';
import { MODULE_NAME as HOME } from 'modules/home/const';
import { homeReducer } from 'modules/home/redux/slice';
import { MODULE_NAME as ONBOARDING } from 'modules/onboarding/const';
import { onboardingReducer } from 'modules/onboarding/redux/slice';
import type { PersistConfig } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { MODULE_NAME as THEME } from 'theme/redux/const';
import { themeReducer } from 'theme/redux/slice';
import { reduxStorage } from 'utils/storage';

/**
 * The root reducer.
 *
 * This is the one file allowed to import a module's internals — a slice is not
 * part of a module's public surface, and the alternative is every module
 * re-exporting its reducer for a single consumer. ESLint's boundary rule is
 * switched off here for exactly that reason.
 */
export const rootReducer = combineReducers({
  [FEATURE_FLAG]: featureFlagReducer,
  [HOME]: homeReducer,
  [ONBOARDING]: onboardingReducer,
  [THEME]: themeReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function composeMiddlewares(): Middleware[] {
  const coreMiddleware: Middleware[] = [];

  // Add other module middleware
  const moduleMiddleware: Middleware[] = [];

  return [...coreMiddleware, ...moduleMiddleware];
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return defaultMiddleware.concat(composeMiddlewares());
  },
});

export const persistor = persistStore(store);
