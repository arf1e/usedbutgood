import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../apis/fakestore';
import authReducer, { logOut } from '../../slices/authSlice';
import { JWTPairType } from '../../types/user';
import mockServer from '../mocks/server';
import {
  failingUser,
  jwtFixture,
  passingUser,
  userFixture,
} from '../__fixtures__/auth';

describe('RTK-Query side effects', () => {
  const store = configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
    store.dispatch(logOut());
  });

  it('should set JWT params after successfull login', async () => {
    const initialState = store.getState();
    expect(initialState.auth.jwt).toBeNull();
    await store.dispatch(productsApi.endpoints.logIn.initiate(passingUser));
    expect(store.getState().auth.jwt).toMatchObject(jwtFixture);
  });

  it('should not affect the state after failed login', async () => {
    const initialState = store.getState();
    expect(initialState.auth.jwt).toBeNull();
    await store.dispatch(productsApi.endpoints.logIn.initiate(failingUser));
    expect(store.getState().auth.jwt).toBeNull();
  });

  it('should set user object after querying user with jwt', async () => {
    await store.dispatch(productsApi.endpoints.logIn.initiate(passingUser));
    const jwt = store.getState().auth.jwt as JWTPairType;
    await store.dispatch(productsApi.endpoints.getProfile.initiate(jwt));
    expect(store.getState().auth.user).toMatchObject(userFixture);
  });

  afterAll(() => {
    mockServer.close();
  });
});
