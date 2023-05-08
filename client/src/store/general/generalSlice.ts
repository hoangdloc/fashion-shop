import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authApi } from '~/store/auth/authService';

interface GeneralState {
  showSubcribePopupAgain: boolean
  showContactPopup: boolean
  showOrderingPopup: boolean
}

const initialState: GeneralState = {
  showSubcribePopupAgain: true,
  showContactPopup: false,
  showOrderingPopup: false
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleShowPopupAgain: (state, action: PayloadAction<boolean>) => {
      state.showSubcribePopupAgain = action.payload;
    },
    setShowContactPopup: (state, action: PayloadAction<boolean>) => {
      state.showContactPopup = action.payload;
    },
    setShowOrderingPopup: (state, action: PayloadAction<boolean>) => {
      state.showOrderingPopup = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.userLogout.matchFulfilled, state => {
      state.showSubcribePopupAgain = true;
    });
  }
});

export const {
  toggleShowPopupAgain,
  setShowContactPopup,
  setShowOrderingPopup
} = generalSlice.actions;
export default generalSlice.reducer;
