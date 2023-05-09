/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { updateProductToCart } from './cart/cartSlice';

import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import type { RootState } from './store';
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      toast.error(action.payload.data.message ?? 'Something went wrong 😢');
    }

    return next(action);
  };

export const cartMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const userId = store.getState().auth.userInfo?.id;
    const cart = store.getState().cart.cart;
    if (updateProductToCart.match(action)) {
      const newCart = cart
        .filter(item => item.userId !== userId)
        .concat(action.payload);
      return next({ ...action, payload: newCart });
    }

    return next(action);
  };
