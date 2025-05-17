import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import { authApi } from '../api/authApi';
import { productsApi } from '../api/productsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
     [authApi.reducerPath]: authApi.reducer,
     [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware // <-- agrega el middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;