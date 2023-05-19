/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { axiosBaseQuery } from '~/config/axios';
import type { JWTDecoded } from '~/shared/@types/jwtDecoded';
import type {
  UserLogin,
  UserResetPassword,
  UserResponse,
  UserSignup
} from '~/shared/@types/user';
import { convertTimestampToDays } from '~/shared/utils/convertTimestampToDays';
import { setAccessToken, setCurrentUserInfo } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    userLogin: builder.mutation<{ token: string }, UserLogin>({
      query: body => ({
        url: '/users/login',
        method: 'post',
        data: body
      }),
      transformResponse: (response: UserResponse) => ({
        token: response.data.token
      }),
      onQueryStarted: async (_, api) => {
        const payload = (await api.queryFulfilled).data.token;
        const decodedJwt: JWTDecoded = jwtDecode(payload);
        const expireDays = convertTimestampToDays(decodedJwt.exp);
        const userInfo = decodedJwt.user;
        Cookies.set('access_token', payload, {
          expires: expireDays,
          secure: true
        });
        api.dispatch(setAccessToken(payload));
        api.dispatch(setCurrentUserInfo(userInfo));
        toast.success(
          `Welcome back! ${userInfo.firstName} ${userInfo.lastName} 😃`
        );
      }
    }),
    userSignup: builder.mutation<{ token: string }, UserSignup>({
      query: body => ({
        url: '/users/signup',
        method: 'post',
        data: body
      }),
      transformResponse: (response: UserResponse) => ({
        token: response.data.token
      }),
      onQueryStarted: async (_, api) => {
        const payload = (await api.queryFulfilled).data.token;
        const decodedJwt: JWTDecoded = jwtDecode(payload);
        const expireDays = convertTimestampToDays(decodedJwt.exp);
        const userInfo = decodedJwt.user;
        Cookies.set('access_token', payload, {
          expires: expireDays,
          secure: true
        });
        api.dispatch(setAccessToken(payload));
        api.dispatch(setCurrentUserInfo(userInfo));
        toast.success(
          `Welcome ${userInfo.firstName} ${userInfo.lastName} to our store 🎉`
        );
      }
    }),
    userLogout: builder.query<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'get'
      }),
      onQueryStarted: async (_, api) => {
        await api.queryFulfilled;
        Cookies.remove('access_token');
        toast.info('Logged out successfully!');
      }
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: body => ({
        url: '/users/forgot-password',
        method: 'post',
        data: body
      })
    }),
    resetPassword: builder.mutation<void, UserResetPassword>({
      query: body => ({
        url: '/users/reset-password',
        method: 'put',
        data: body
      })
    })
  })
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useLazyUserLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
