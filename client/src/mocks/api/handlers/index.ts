import { rest } from 'msw';
import { dummyClothes } from './data';

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/clothes`,
    async (req, res, ctx) => {
      return await res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          results: dummyClothes.length,
          data: {
            clothings: dummyClothes
          }
        })
      );
    }
  ),
  rest.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
    async (req, res, ctx) => {
      const { email, password } = req.params;

      const mockUser = {
        email: 'test@gmail.com',
        password: '12345678'
      };

      if (email === mockUser.email && password === mockUser.password) {
        return await res(
          ctx.status(200),
          ctx.json({
            status: 'success',
            data: {
              token: 'you_are_authenticated'
            }
          })
        );
      }

      return req.passthrough();
    }
  ),
  rest.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/signup`,
    async (req, res, ctx) => {
      return await res(
        ctx.status(201),
        ctx.json({
          status: 'success',
          data: {
            token: 'you_are_authenticated'
          }
        })
      );
    }
  )
];
