import { rest } from 'msw';
import { API_URL } from '../../config/api';
import { LoginInterface } from '../../types/user';
import { jwtFixture, passingUser, userFixture } from '../__fixtures__/auth';
import productsFixture from '../__fixtures__/products';

export const handlers = [
  rest.get(`${API_URL}/products`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsFixture));
  }),
  rest.post(`${API_URL}/auth/login`, async (req, res, ctx) => {
    const { email } = await req.json<LoginInterface>();
    if (email === passingUser.email) {
      return res(ctx.status(200), ctx.json(jwtFixture));
    }

    return res(ctx.status(401), ctx.json({ message: 'Login failed' }));
  }),
  rest.get(`${API_URL}/auth/profile`, async (req, res, ctx) => {
    const authorizationHeader = req.headers.get('Authorization');
    if (authorizationHeader === `Bearer ${jwtFixture.access_token}`) {
      return res(ctx.status(200), ctx.json(userFixture));
    }
  }),
];
