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

import { rtkQueryErrorLogger } from './middleware';
import { authApi } from './reducers/auth/authService';
import authSlice from './reducers/auth/authSlice';
import clothesSlice from './reducers/clothes/clothesSlice';

const rootReducer = combineReducers({
  clothes: clothesSlice,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'authApi']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(authApi.middleware, rtkQueryErrorLogger)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
