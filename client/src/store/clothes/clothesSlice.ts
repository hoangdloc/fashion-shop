import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { clothesApi } from './clothesService';

import type { Clothes } from '~/shared/@types/clothes';

interface ClothesState {
  results?: number
  clothings?: Clothes[]
  currentClothes?: Clothes
  clothesPopup: boolean
}

const initialState: ClothesState = {
  results: undefined,
  clothings: undefined,
  currentClothes: undefined,
  clothesPopup: false
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setCurrentClothes: (state, action: PayloadAction<Clothes>) => {
      state.currentClothes = action.payload;
    },
    setClothesPopup: (state, action: PayloadAction<boolean>) => {
      state.clothesPopup = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      clothesApi.endpoints.fetchClothing.matchFulfilled,
      (state, action) => {
        state.clothings = action.payload.data.clothings;
        state.results = action.payload.results;
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

export const { setCurrentClothes, setClothesPopup } = clothesSlice.actions;
export default clothesSlice.reducer;
