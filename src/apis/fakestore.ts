import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../config/api';
import { mapFiltersToQueryParams } from '../utils/filtering';
import {
  CategoryType,
  ProductApiFiltersInterface,
  ProductType,
} from '../types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductType[],
      Partial<ProductApiFiltersInterface>
    >({
      query: (filters = {}) => ({
        url: 'products',
        params: {
          ...mapFiltersToQueryParams(filters),
        },
      }),
    }),
    getCategories: builder.query<CategoryType[], void>({
      query: () => ({
        url: 'categories',
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
