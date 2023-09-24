import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../config/api';
import { ProductType } from '../types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: 'products',
        params: {
          limit: 5,
          offset: 0,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
