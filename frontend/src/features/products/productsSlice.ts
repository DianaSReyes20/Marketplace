import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types/products';
import { productsApi } from '../../api/productsApi';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchSellerProducts = createAsyncThunk(
  'products/fetchSellerProducts',
  async (_, { getState, dispatch }) => {
    const response = await productsApi.endpoints.getSellerProducts.initiate()(dispatch, getState, undefined);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload ?? [];
      });
  },
});

export default productsSlice.reducer;