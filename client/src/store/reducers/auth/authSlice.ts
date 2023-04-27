import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User } from '../../../shared/@types/user';

interface IAuthState {
  accessToken?: string
  userInfo: User | null
}

const initialState: IAuthState = {
  accessToken: Cookies.get('access_token'),
  userInfo: null
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
  }
});

export const { setCurrentUserInfo, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
