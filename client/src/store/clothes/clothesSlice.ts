import { createSlice } from '@reduxjs/toolkit';

import type { Clothes } from '../../shared/@types/clothes';
import { clothesApi } from './clothesService';
import { Sorting } from '../../shared/@types/sorting';

interface ClothesState {
  clothings: Clothes[] | null
  currentClothes: Clothes | null
  sorting: Sorting
}

const initialState: ClothesState = {
  clothings: null,
  currentClothes: null,
  sorting: Sorting.DEFAULT
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setCurrentClothes: (state, action) => {
      state.currentClothes = action.payload;
    },
    toggleSorting: (state, action) => {
      state.sorting = action.payload;
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

export const { setCurrentClothes, toggleSorting } = clothesSlice.actions;
export default clothesSlice.reducer;
