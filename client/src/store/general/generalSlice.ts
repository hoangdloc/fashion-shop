import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../auth/authService';

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
    toggleShowPopupAgain: (state, action) => {
      state.showSubcribePopupAgain = action.payload;
    },
    setShowContactPopup: (state, action) => {
      state.showContactPopup = action.payload;
    },
    setShowOrderingPopup: (state, action) => {
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
