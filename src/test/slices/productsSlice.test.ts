import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import { productsApi } from '../../apis/fakestore';
import productsReducer, {
  clearFilters,
  decrementPage,
  incrementPage,
  initialState,
  PRODUCTS_PER_PAGE,
  selectProducts,
  setFilters,
  setPage,
  setProducts,
  setSort,
} from '../../slices/productsSlice';
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

describe('pagination', () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  beforeEach(() => {
    store.dispatch(setProducts(products));
  });

  it('should increment page', () => {
    const initialPage = store.getState().products.page;
    expect(initialPage).toBe(1);
    store.dispatch(incrementPage());
    expect(store.getState().products.page).toBe(2);
  });

  it('should not increment the page after the last one', () => {
    const totalPages = store.getState().products.totalPages;
    store.dispatch(setPage(totalPages));
    expect(store.getState().products.page).toBe(totalPages);
    store.dispatch(incrementPage());
    expect(store.getState().products.page).toBe(totalPages);
  });

  it('should decrement page', () => {
    const totalPages = store.getState().products.totalPages;
    store.dispatch(setPage(totalPages));
    store.dispatch(decrementPage());
    expect(store.getState().products.page).toBe(totalPages - 1);
  });

  it('should not decrement the page on the first one', () => {
    expect(store.getState().products.page).toBe(1);
    store.dispatch(decrementPage());
    expect(store.getState().products.page).toBe(1);
  });
});

describe('sorting', () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  beforeEach(() => {
    store.dispatch(setProducts(products));
  });

  it('should sort products by price ascending', () => {
    const initialProducts = selectProducts(store.getState().products);
    const minPrice = _.minBy(products, 'price')?.price as number;
    expect(initialProducts[0].price).not.toBe(minPrice);
    store.dispatch(setSort('priceAsc'));
    const sortedProducts = selectProducts(store.getState().products);
    expect(sortedProducts[0].price).toBe(minPrice);
  });

  it('should sort products by price descending', () => {
    const initialProducts = selectProducts(store.getState().products);
    const maxPrice = _.maxBy(products, 'price')?.price as number;
    expect(initialProducts[0].price).not.toBe(maxPrice);
    store.dispatch(setSort('priceDesc'));
    const sortedProducts = selectProducts(store.getState().products);
    expect(sortedProducts[0].price).toBe(maxPrice);
  });
});

describe('filtering', () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
  });

  beforeEach(() => {
    store.dispatch(setProducts(products));
  });

  it('should save filters', () => {
    const filters = { title: 'test', categoryId: '4' };
    expect(store.getState().products.filters).not.toMatchObject(filters);
    store.dispatch(setFilters(filters));
    expect(store.getState().products.filters).toMatchObject(filters);
  });

  it('should clear filters', () => {
    const filters = { title: 'test', categoryId: '4' };
    store.dispatch(setFilters(filters));
    store.dispatch(clearFilters());
    expect(store.getState().products.filters).toMatchObject(
      initialState.filters
    );
  });
});
