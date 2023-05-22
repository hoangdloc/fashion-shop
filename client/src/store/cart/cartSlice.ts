import {
  type PayloadAction,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import type { Cart, CartItem } from '~/shared/@types/cart';
import type { RootState } from '~/store/store';

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
        item =>
          item.clothes.id === action.payload.clothes.id &&
          item.userId === action.payload.userId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (existProduct != null) {
        existProduct.quantity += action.payload.quantity;
        state.cart = state.cart.map(item => {
          if (
            item.clothes.id === existProduct.clothes.id &&
            item.userId === existProduct.userId &&
            item.color === existProduct.color &&
            item.size === existProduct.size
          ) {
            return { ...item, quantity: existProduct.quantity };
          }
          return item;
        });
      } else state.cart.push(action.payload);
    },
    plusProduct: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map(item => {
        if (item.clothes.id === action.payload.clothes.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    substractProduct: (state, action: PayloadAction<CartItem>) => {
      if (action.payload.quantity > 1) {
        state.cart = state.cart.map(item => {
          if (item.clothes.id === action.payload.clothes.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    },
    updateProductToCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    orderingSuccess: (state, action: PayloadAction<{ userId: number }>) => {
      state.cart = state.cart.filter(
        item => item.userId !== action.payload.userId
      );
    }
  }
});

export const getCartItemsSelector = createSelector(
  (state: RootState) => state,
  state =>
    state.cart.cart.filter(item => item.userId === state.auth.userInfo?.id)
);

export const {
  addProductToCart,
  updateProductToCart,
  orderingSuccess,
  plusProduct,
  substractProduct
} = cartSlice.actions;
export default cartSlice.reducer;
