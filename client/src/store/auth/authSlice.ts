import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { authApi } from './authService';
import type { User } from '../../shared/@types/user';

interface IAuthState {
  accessToken?: string
  userInfo: User | null
  isLoggingOut: boolean
}

const initialState: IAuthState = {
  accessToken: Cookies.get('access_token'),
  userInfo: null,
  isLoggingOut: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
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

export const { setCurrentUserInfo, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
