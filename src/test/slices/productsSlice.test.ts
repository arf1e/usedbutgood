import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../apis/fakestore';
import productsReducer from '../../slices/productsSlice';
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
    expect(store.getState().products.totalPages).toBe(2);
    expect(store.getState().products.products).not.toHaveLength(0);
  });

  afterAll(() => {
    mockServer.close();
  });
});
