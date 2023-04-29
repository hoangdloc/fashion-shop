import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../auth/authService';

interface GeneralState {
  showPopupAgain: boolean
}

const initialState: GeneralState = {
  showPopupAgain: true
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleShowPopupAgain: (state, action) => {
      state.showPopupAgain = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.userLogout.matchFulfilled,
      state => {
        state.showPopupAgain = true;
      }
    );
  }
});

export const { toggleShowPopupAgain } = generalSlice.actions;
export default generalSlice.reducer;
