import type { Middleware } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MODULE_NAME as HOME } from 'modules/home/const';
import { homeReducer } from 'modules/home/redux/slice';
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
import { reduxStorage } from 'utils/storage';

export const rootReducer = combineReducers({
  [HOME]: homeReducer,
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
  middleware: (getDefaultMiddleware) => {
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
