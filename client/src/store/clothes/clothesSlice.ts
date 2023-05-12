import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { clothesApi } from './clothesService';
import { Sorting } from '~/shared/@types/sorting';

import { Color, Type } from '~/shared/@types/category';
import { Size } from '~/shared/@types/size';
import type { Clothes } from '~/shared/@types/clothes';
import type { PriceRange } from '~/shared/@types/priceRange';

interface ClothesState {
  clothings?: Clothes[]
  currentClothes?: Clothes
  sorting: Sorting
  filterByType: Type
  filterByPrice: PriceRange
  filterByColor: Color
  filterBySize: Size
  searching: string
}

const initialState: ClothesState = {
  clothings: undefined,
  currentClothes: undefined,
  sorting: Sorting.DEFAULT,
  filterByType: Type.CLOTHING,
  filterByPrice: {
    from: 0,
    to: 500
  },
  filterByColor: Color.WHITE,
  filterBySize: Size.S,
  searching: ''
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setCurrentClothes: (state, action: PayloadAction<Clothes>) => {
      state.currentClothes = action.payload;
    },
    toggleSorting: (state, action: PayloadAction<Sorting>) => {
      state.sorting = action.payload;
    },
    toggleFilterByType: (state, action: PayloadAction<Type>) => {
      state.filterByType = action.payload;
    },
    setFilterByPrice: (state, action: PayloadAction<PriceRange>) => {
      state.filterByPrice = action.payload;
    },
    toggleFilterByColor: (state, action: PayloadAction<Color>) => {
      state.filterByColor = action.payload;
    },
    toggleFilterBySize: (state, action: PayloadAction<Size>) => {
      state.filterBySize = action.payload;
    },
    searchingClothes: (state, action: PayloadAction<string>) => {
      state.searching = action.payload;
    },
    resetAllFilter: state => {
      state.sorting = Sorting.DEFAULT;
      state.filterByType = Type.CLOTHING;
      state.filterByPrice = {
        from: 0,
        to: 500
      };
      state.filterByColor = Color.WHITE;
      state.filterBySize = Size.S;
      state.searching = '';
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

export const {
  setCurrentClothes,
  toggleSorting,
  toggleFilterByType,
  setFilterByPrice,
  toggleFilterByColor,
  toggleFilterBySize,
  searchingClothes,
  resetAllFilter
} = clothesSlice.actions;
export default clothesSlice.reducer;
