import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { productsApi } from '../apis/fakestore';
import {
  ProductApiFiltersInterface,
  ProductsSortingOptionType,
  ProductType,
} from '../types/product';
import { calculateTotalPages, getPaginatedSlice } from '../utils/pagination';

export const PRODUCTS_PER_PAGE = 12;

type ProductsState = {
  page: number;
  totalPages: number;
  filters: Partial<ProductApiFiltersInterface>;
  products: ProductType[];
  sort: ProductsSortingOptionType;
};

export const initialState: ProductsState = {
  products: [],
  filters: {},
  page: 1,
  totalPages: 1,
  sort: 'default',
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

    clearFilters: (state) => {
      state.filters = {};
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

    setSort: (state, action: PayloadAction<ProductsSortingOptionType>) => {
      state.sort = action.payload;
      state.page = 1;
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
  clearFilters,
  incrementPage,
  decrementPage,
  setPage,
  setSort,
} = productsSlice.actions;

export const selectProducts = (state: ProductsState) => {
  const mapper: {
    [key: string]: (products: ProductType[]) => ProductType[];
  } = {
    default: (products) => products,
    priceAsc: (products) => _.orderBy(products, 'price', 'asc'),
    priceDesc: (products) => _.orderBy(products, 'price', 'desc'),
  };
  const source = mapper[state.sort](state.products);
  return getPaginatedSlice(source, state.page, PRODUCTS_PER_PAGE);
};
export const selectFilters = (state: ProductsState) => state.filters;
export const selectPaginationParams = (state: ProductsState) => {
  const { page, totalPages } = state;
  return { page, totalPages };
};
export const selectSort = (state: ProductsState) => state.sort;

export default productsSlice.reducer;
