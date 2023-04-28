import { createSlice } from '@reduxjs/toolkit';

import { Clothes } from '../../shared/@types/clothes';
import { clothesApi } from './clothesService';

interface ClothesState {
  clothings: Clothes[]
}

const initialState: ClothesState = {
  clothings: []
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      clothesApi.endpoints.fetchClothing.matchFulfilled,
      (state, action) => {
        state.clothings = action.payload;
      }
    );
  }
});

// export const {} = clothesSlice.actions;
export default clothesSlice.reducer;
