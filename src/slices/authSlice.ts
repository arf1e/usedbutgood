import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../apis/fakestore';
import { JWTPairType, UserType } from '../types/user';

export type AuthState = {
  user: UserType | null;
  jwt: JWTPairType | null;
};

export const initialAuthState: AuthState = {
  user: null,
  jwt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        const jwtPair = payload;
        state.jwt = jwtPair;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        const jwtPair = payload;
        state.jwt = jwtPair;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const { logOut } = authSlice.actions;

export const selectJwt = (state: { auth: AuthState }) => state.auth.jwt;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAdminRights = (state: { auth: AuthState }) => {
  const user = state.auth.user;
  if (user) {
    return user.role === 'admin';
  }
  return false;
};

export default authSlice.reducer;
