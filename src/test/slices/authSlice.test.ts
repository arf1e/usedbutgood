import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../apis/fakestore';
import authReducer, {
  AuthState,
  logOut,
  selectAdminRights,
  selectJwt,
  selectUser,
} from '../../slices/authSlice';
import { JWTPairType } from '../../types/user';
import mockServer from '../mocks/server';
import {
  failingUser,
  jwtFixture,
  newUserFixture,
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

  it('should set jwt after successfull signing up', async () => {
    await store.dispatch(productsApi.endpoints.signUp.initiate(newUserFixture));
    expect(store.getState().auth.jwt).toMatchObject(jwtFixture);
  });

  afterAll(() => {
    mockServer.close();
  });
});

describe('logout', () => {
  it('should clear the jwt and user on logout', () => {
    const state: AuthState = {
      jwt: jwtFixture,
      user: userFixture,
    };
    const result = authReducer(state, logOut());
    expect(result.jwt).toBeNull();
    expect(result.user).toBeNull();
  });
});

describe('selectors', () => {
  const state: AuthState = { jwt: jwtFixture, user: userFixture };

  describe('selectJwt', () => {
    it('should return the jwt', () => {
      const result = selectJwt(state);
      expect(result).toMatchObject(jwtFixture);
    });
  });

  describe('selectUser', () => {
    it('should return user role if user exists', () => {
      const result = selectUser(state);
      expect(result).toMatchObject(userFixture);
    });
  });

  describe('selectAdminRights', () => {
    it('should return false if user does not exist', () => {
      const result = selectAdminRights({ jwt: null, user: null });
      expect(result).toBe(false);
    });

    it('should return false if user is a customer', () => {
      const result = selectAdminRights(state);
      expect(result).toBe(false);
    });

    it('should return true if user is an admin', () => {
      const adminState: AuthState = {
        jwt: jwtFixture,
        user: { ...userFixture, role: 'admin' },
      };
      const result = selectAdminRights(adminState);
      expect(result).toBe(true);
    });
  });
});
