import { createSlice } from '@reduxjs/toolkit';

interface ClothesState {
  test: string
}

const initialState: ClothesState = {
  test: ''
};

export const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
    }
  }
});

export const { setTest } = clothesSlice.actions;
export default clothesSlice.reducer;
