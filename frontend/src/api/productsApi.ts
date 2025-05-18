import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store'; // Adjust the path to where your RootState is defined
import type { Product } from '../types/products';

// Creación de API de productos
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    // Usar environment variable para la URL base o por defecto localhost 3000
    baseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSellerProducts: builder.query<Product[], number>({
      query: (sellerId) => `products/seller/${sellerId}`,
    }),
    searchProducts: builder.query<Product[], { name?: string; sku?: string; minPrice?: number; maxPrice?: number }>({
      query: (params) => ({
        url: 'products/search',
        params,
      }),
    }),
    addProduct: builder.mutation<Product, Omit<Product, 'id'>>({
      query: (body) => ({
        url: 'products/create',
        method: 'POST',
        body,
      }),
    }),
    getAllProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
  }),
});

export const { 
  useGetSellerProductsQuery,
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useAddProductMutation,
} = productsApi;