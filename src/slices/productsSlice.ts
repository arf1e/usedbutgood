import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/product';

const initialState: ProductType[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
