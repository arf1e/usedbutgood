import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/product';

export const initialState: ProductType[] = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
