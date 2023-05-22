import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCartItemsSelector } from '~/store/cart/cartSlice';

import type { Cart } from '~/shared/@types/cart';

interface ICartContext {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const cartItems = useSelector(getCartItemsSelector);
  const [cart, setCart] = useState<Cart>(cartItems);

  useLayoutEffect(() => {
    setCart(cartItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cartItems)]);

  const values = { cart, setCart };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

function useCart (): ICartContext {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
