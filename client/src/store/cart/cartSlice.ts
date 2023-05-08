import {
  type PayloadAction,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import type { Cart, CartItem } from '../../shared/@types/cart';
import type { RootState } from '../store';

interface CartState {
  cart: Cart
}

const initialState: CartState = {
  cart: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const existProduct = state.cart.find(
        item => item.clothes.id === action.payload.clothes.id
      );
      if (existProduct != null) {
        existProduct.quantity += action.payload.quantity;
        state.cart = state.cart.map(item => {
          if (item.clothes.id === existProduct.clothes.id) {
            return { ...item, quantity: existProduct.quantity };
          }
          return item;
        });
      } else state.cart.push(action.payload);
    }
  }
});

export const getCartItemsSelector = createSelector(
  (state: RootState) => state,
  state =>
    state.cart.cart.filter(item => item.userId === state.auth.userInfo?.id)
);

export const { addProductToCart } = cartSlice.actions;
export default cartSlice.reducer;
