import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { authApi } from './authService';
import type { User } from '~/shared/@types/user';

interface IAuthState {
  accessToken?: string
  userInfo: User | null
  isLoggingOut: boolean
  forgotPasswordEmail: string
}

const initialState: IAuthState = {
  accessToken: Cookies.get('access_token'),
  userInfo: null,
  isLoggingOut: false,
  forgotPasswordEmail: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    saveForgotPasswordEmail: (state, action: PayloadAction<string>) => {
      state.forgotPasswordEmail = action.payload;
    },
    resetForgotPasswordEmail: state => {
      state.forgotPasswordEmail = '';
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.userLogout.matchPending, state => {
        state.isLoggingOut = true;
      })
      .addMatcher(authApi.endpoints.userLogout.matchFulfilled, state => {
        state.accessToken = undefined;
        state.userInfo = null;
        state.isLoggingOut = false;
      })
      .addMatcher(authApi.endpoints.userLogout.matchRejected, state => {
        state.isLoggingOut = false;
      });
  }
});

export const {
  setCurrentUserInfo,
  setAccessToken,
  saveForgotPasswordEmail,
  resetForgotPasswordEmail
} = authSlice.actions;
export default authSlice.reducer;
