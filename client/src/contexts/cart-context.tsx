import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { useSelector } from 'react-redux';

import { getCartItemsSelector } from '~/store/cart/cartSlice';

import type { Cart } from '~/shared/@types/cart';
import { renderPrice } from '~/shared/utils/renderPrice';

interface ICartContext {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  cartTotal: number
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const cartItems = useSelector(getCartItemsSelector);
  const [cart, setCart] = useState<Cart>(cartItems);
  const cartTotal = useMemo(() => {
    return cart.reduce((total, current) => {
      const { quantity, clothes } = current;
      const { actualPrice } = renderPrice(
        clothes.price,
        clothes.salePercent,
        clothes.status
      );
      return total + quantity * +actualPrice;
    }, 0);
  }, [cart]);

  useLayoutEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const values = { cart, setCart, cartTotal };

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
