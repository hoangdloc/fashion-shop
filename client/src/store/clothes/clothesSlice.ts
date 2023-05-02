import { createSlice } from '@reduxjs/toolkit';

import type { Clothes } from '../../shared/@types/clothes';
import { clothesApi } from './clothesService';

interface ClothesState {
  clothings: Clothes[]
  currentClothes: Clothes | null
}

const initialState: ClothesState = {
  clothings: [],
  currentClothes: null
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setCurrentClothes: (state, action) => {
      state.currentClothes = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      clothesApi.endpoints.fetchClothing.matchFulfilled,
      (state, action) => {
        state.clothings = action.payload;
      }
    );
    builder.addMatcher(
      clothesApi.endpoints.getCurrentClothes.matchFulfilled,
      (state, action) => {
        state.currentClothes = action.payload;
      }
    );
  }
});

export const { setCurrentClothes } = clothesSlice.actions;
export default clothesSlice.reducer;
