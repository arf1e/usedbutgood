import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CartProductType } from '../types/cart';
import { ProductType } from '../types/product';

export type CartState = {
  items: CartProductType[];
};

export const initialState: CartState = { items: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductType>) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
        return;
      }

      state.items.push(action.payload);
    },
    clearCart: (_state, _action: PayloadAction<void>) => {
      return initialState;
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      _.remove(
        state.items,
        (cartProduct) => cartProduct.product.id === action.payload.id
      );
    },
    incrementQuantity: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
  },
});

export const selectTotalQuantity = (state: CartState) => {
  return _.sumBy(state.items, (item) => item.quantity);
};

export const selectTotalPrice = (state: CartState) => {
  return _.sumBy(state.items, (item) => item.product.price * item.quantity);
};

export const {
  addToCart,
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
