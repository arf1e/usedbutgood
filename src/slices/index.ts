import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import localforage from 'localforage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { productsApi } from '../apis/fakestore';
import cartReducer, { CartState } from './cartSlice';
import productsReducer from './productsSlice';
import authReducer, { AuthState } from './authSlice';

const cartPersistConfig = {
  key: 'cart',
  storage: localforage,
};

const authPersistConfig = {
  key: 'auth',
  storage: localforage,
};

export const initiateStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      cart: persistReducer<CartState, AnyAction>(
        cartPersistConfig,
        cartReducer
      ),
      products: productsReducer,
      auth: persistReducer<AuthState, AnyAction>(
        authPersistConfig,
        authReducer
      ),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(productsApi.middleware),
  });

const store = initiateStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);
