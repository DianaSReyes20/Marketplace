import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store'; // Adjust the path to where your RootState is defined
import type { Product } from '../types/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSellerProducts: builder.query<Product[], void>({
      query: () => 'products/seller',
    }),
    searchProducts: builder.query<Product[], { name?: string; sku?: string; minPrice?: number; maxPrice?: number }>({
      query: (params) => ({
        url: 'products/search',
        params,
      }),
    }),
    addProduct: builder.mutation<Product, Omit<Product, 'id'>>({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { 
  useGetSellerProductsQuery, 
  useSearchProductsQuery,
  useAddProductMutation 
} = productsApi;