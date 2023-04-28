import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authPersistConfig } from './auth/authPersistConfig';
import { authApi } from './auth/authService';
import authSlice from './auth/authSlice';
import { clothesApi } from './clothes/clothesService';
import clothesSlice from './clothes/clothesSlice';
import { rtkQueryErrorLogger } from './middleware';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authSlice),
  clothes: clothesSlice,
  [clothesApi.reducerPath]: clothesApi.reducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'authApi', 'clothes', 'clothesApi']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(authApi.middleware, clothesApi.middleware, rtkQueryErrorLogger)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
