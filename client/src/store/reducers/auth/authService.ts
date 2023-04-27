import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { axiosBaseQuery } from '../../../config/axios';
import { JWTDecoded } from '../../../shared/@types/jwtDecoded';
import {
  UserLogin,
  UserResponse,
  UserSignup
} from '../../../shared/@types/user';
import {
  convertTimestampToDays
} from '../../../shared/utils/convertTimestampToDays';
import { setAccessToken, setCurrentUserInfo } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    userLogin: build.mutation<UserResponse, UserLogin>({
      query: body => ({
        url: '/users/login',
        method: 'post',
        data: body
      }),
      onQueryStarted: async (arg, api) => {
        const payload = (await api.queryFulfilled).data.data;
        const decodedJwt: JWTDecoded = jwtDecode(payload.token);
        const expireDays = convertTimestampToDays(decodedJwt.exp);
        const userInfo = decodedJwt.user;
        Cookies.set('access_token', payload.token, {
          expires: expireDays,
          secure: true
        });
        api.dispatch(setAccessToken(payload.token));
        api.dispatch(setCurrentUserInfo(userInfo));
        toast.success(
          `Welcome back! ${userInfo.firstName} ${userInfo.lastName} 😃`
        );
      }
    }),
    userSignup: build.mutation<UserResponse, UserSignup>({
      query: body => ({
        url: '/users/signup',
        method: 'post',
        data: body
      }),
      onQueryStarted: async (arg, api) => {
        const payload = (await api.queryFulfilled).data.data;
        const decodedJwt: JWTDecoded = jwtDecode(payload.token);
        const expireDays = convertTimestampToDays(decodedJwt.exp);
        const userInfo = decodedJwt.user;
        Cookies.set('access_token', payload.token, {
          expires: expireDays,
          secure: true
        });
        api.dispatch(setAccessToken(payload.token));
        api.dispatch(setCurrentUserInfo(userInfo));
        toast.success(
          `Welcome ${userInfo.firstName} ${userInfo.lastName} to our store 🎉`
        );
      }
    })
  })
});

export const { useUserLoginMutation, useUserSignupMutation } = authApi;
