import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../config/api';
import { mapFiltersToQueryParams } from '../utils/filtering';
import {
  CategoryType,
  CreateProductInterface,
  ProductApiFiltersInterface,
  ProductType,
} from '../types/product';
import {
  JWTPairType,
  LoginInterface,
  SignUpInteface,
  UserType,
} from '../types/user';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductType[],
      Partial<ProductApiFiltersInterface>
    >({
      query: (filters) => ({
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
    getProductById: builder.query<ProductType, number>({
      query: (id: number) => ({
        url: `products/${id}`,
      }),
    }),
    createProduct: builder.mutation<ProductType, CreateProductInterface>({
      query: (productData: CreateProductInterface) => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
    }),
    updateProduct: builder.mutation<
      ProductType,
      Partial<CreateProductInterface> & Pick<ProductType, 'id'>
    >({
      query: ({ id, ...productData }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation<boolean, number>({
      query: (id: number) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
    logIn: builder.mutation<JWTPairType, LoginInterface>({
      query: (loginData: LoginInterface) => ({
        url: 'auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    getProfile: builder.query<UserType, JWTPairType>({
      query: (jwt: JWTPairType) => ({
        url: 'auth/profile',
        headers: {
          Authorization: `Bearer ${jwt.access_token}`,
        },
      }),
    }),
    signUp: builder.mutation<JWTPairType, SignUpInteface>({
      async queryFn(signUpData: SignUpInteface, _api, _options, fetchWithBQ) {
        const response = await fetchWithBQ({
          url: 'users',
          method: 'POST',
          body: signUpData,
        });
        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }
        const jwt = (await fetchWithBQ({
          url: 'auth/login',
          method: 'POST',
          body: { email: signUpData.email, password: signUpData.password },
        })) as QueryReturnValue<JWTPairType, any, any>;
        if (jwt.error) {
          return { error: jwt.error as FetchBaseQueryError };
        }
        return jwt;
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useLogInMutation,
  useGetProfileQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useSignUpMutation,
} = productsApi;
