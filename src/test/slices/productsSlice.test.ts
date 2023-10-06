import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../apis/fakestore';
import productsReducer, { PRODUCTS_PER_PAGE } from '../../slices/productsSlice';
import products from '../__fixtures__/products';
import mockServer from '../mocks/server';

describe('RTK-Query side effects', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  const store = configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

  it('should set products and total pages from the API response', async () => {
    const initialState = store.getState();
    expect(initialState.products.products).toHaveLength(0);
    expect(initialState.products.totalPages).toBe(1);
    await store.dispatch(
      productsApi.endpoints.getAllProducts.initiate(
        initialState.products.filters
      )
    );
    const expectedPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    expect(store.getState().products.totalPages).toBe(expectedPages);
    expect(store.getState().products.products).not.toHaveLength(0);
  });

  afterAll(() => {
    mockServer.close();
  });
});
