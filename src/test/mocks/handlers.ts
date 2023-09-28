import { rest } from 'msw';
import { API_URL } from '../../config/api';
import productsFixture from '../__fixtures__/products';

export const handlers = [
  rest.get(`${API_URL}/products`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsFixture));
  }),
];
