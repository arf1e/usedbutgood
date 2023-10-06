import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../apis/fakestore';
import { ProductApiFiltersInterface, ProductType } from '../types/product';
import { calculateTotalPages, getPaginatedSlice } from '../utils/pagination';

export const PRODUCTS_PER_PAGE = 12;

type ProductsState = {
  page: number;
  totalPages: number;
  filters: Partial<ProductApiFiltersInterface>;
  products: ProductType[];
};

export const initialState: ProductsState = {
  products: [],
  filters: {},
  page: 1,
  totalPages: 1,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    setFilters: (
      state,
      action: PayloadAction<Partial<ProductApiFiltersInterface>>
    ) => {
      state.filters = action.payload;
      state.page = 1;
    },

    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },

    incrementPage: (state) => {
      const shouldNotIncrement = state.page === state.totalPages;
      if (shouldNotIncrement) return;
      state.page++;
    },

    decrementPage: (state) => {
      const shouldNotDecrement = state.page === 1;
      if (shouldNotDecrement) return;
      state.page--;
    },

    setPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      const shouldAllowPageChange = newPage >= 1 && newPage <= state.totalPages;
      if (shouldAllowPageChange) state.page = newPage;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload;
        state.totalPages = calculateTotalPages(
          state.products.length,
          PRODUCTS_PER_PAGE
        );
      }
    );
  },
});

export const {
  setTotalPages,
  setFilters,
  incrementPage,
  decrementPage,
  setPage,
} = productsSlice.actions;

export const selectProducts = (state: ProductsState) => {
  return getPaginatedSlice(state.products, state.page, PRODUCTS_PER_PAGE);
};
export const selectFilters = (state: ProductsState) => state.filters;
export const selectPaginationParams = (state: ProductsState) => {
  const { page, totalPages } = state;
  return { page, totalPages };
};

export default productsSlice.reducer;
