import styled from '@emotion/styled';
import React from 'react';

import QuantityBox from '~/shared/components/quantity-box';
import CartProductItem from './CartProductItem';

import type { CartItem } from '~/shared/@types/cart';
import { PlusIcon, SubstractIcon, TrashIcon } from '~/shared/components/icon';
import { renderPrice } from '~/shared/utils/renderPrice';
import { useCart } from '~/contexts/cart-context';

interface CartProductTableRowProps {
  cartItem: CartItem
  enableAnimations: (enable: boolean) => void
}

const TableRow = styled.tr`
  position: relative;
  .subtotal {
    text-align: right;
    font-size: 1.6rem;
    font-weight: 700;
    color: #808284;
  }
  td {
    font-weight: 400;
    padding: 2.4rem 0;
    font-size: 1.4rem;
    vertical-align: middle;
    & .quantity-box {
      background-color: ${props => props.theme.colors.bgGray};
      & > .quantity {
        padding: 0.8rem 1.2rem;
      }
      & > .quantity-btn {
        transition: transform 0.1s ease-in-out;
        &:active {
          transform: scale(1.2);
        }
      }
    }
  }
  & > .delete-btn {
    position: absolute;
    left: -4.4rem;
    transform: translateX(-100%);
    color: #eaeaeb;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.secondaryRed};
    }
    &:active {
      transform: translateX(-100%) scale(1.2);
    }
  }
`;

const CartProductTableRow: React.FC<CartProductTableRowProps> = ({
  cartItem,
  enableAnimations
}) => {
  const { cart, setCart } = useCart();
  const { price, salePercent, status, images, name, category, slug } =
    cartItem.clothes;
  const { actualPrice } = renderPrice(price, salePercent, status);

  const handlePlus = (): void => {
    enableAnimations(false);
    setCart(
      cart.map(item => {
        if (item.clothes.id === cartItem.clothes.id) {
          return { ...item, quantity: cartItem.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleSubstract = (): void => {
    enableAnimations(false);
    if (cartItem.quantity > 1) {
      setCart(
        cart.map(item => {
          if (item.clothes.id === cartItem.clothes.id) {
            return { ...item, quantity: cartItem.quantity - 1 };
          }
          return item;
        })
      );
    }
  };

  const handleDeleteProduct = (): void => {
    enableAnimations(true);
    setCart(cart.filter(item => item.id !== cartItem.id));
  };

  return (
    <TableRow>
      <td className="product">
        <CartProductItem
          title={name}
          imageSrc={images[0]}
          price={price}
          salePercent={salePercent}
          status={status}
          gender={category[0]}
          slug={slug}
          pickedSize={cartItem.size}
          pickedColor={cartItem.color}
        />
      </td>
      <td className="quantity">
        <QuantityBox
          plusIcon={<PlusIcon size="small" />}
          substractIcon={<SubstractIcon size="small" />}
          initialValue={cartItem.quantity}
          quantityClassName="quantity"
          containerClassName="quantity-box"
          btnClassName="quantity-btn"
          handlePlus={handlePlus}
          handleSubtract={handleSubstract}
        />
      </td>
      <td className="subtotal">
        {(+actualPrice * cartItem.quantity).toFixed(2)} $
      </td>
      <td className="delete-btn">
        <button onClick={handleDeleteProduct}>
          <TrashIcon />
        </button>
      </td>
    </TableRow>
  );
};

export default CartProductTableRow;
