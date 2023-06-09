import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';

import QuantityBox from '~/shared/components/quantity-box';
import CartProductItem from './CartProductItem';

import { useCart } from '~/contexts/cart-context';
import type { CartItem } from '~/shared/@types/cart';
import { Icon } from '~/shared/components/icon';
import { localePrice, renderPrice } from '~/shared/utils/renderPrice';
import { plusProduct, substractProduct } from '~/store/cart/cartSlice';

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
  const dispatch = useDispatch();
  const { cart, setCart } = useCart();
  const { price, salePercent, status, images, name, category, slug } =
    cartItem.clothes;
  const { actualPrice } = renderPrice(price, salePercent, status);
  const subtotal = localePrice((+actualPrice * cartItem.quantity).toFixed(2));

  const handlePlus = (): void => {
    enableAnimations(false);
    dispatch(plusProduct(cartItem));
  };

  const handleSubstract = (): void => {
    enableAnimations(false);
    dispatch(substractProduct(cartItem));
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
          plusIcon={
            <Icon
              name="plus"
              width="12"
              height="12"
            />
          }
          substractIcon={
            <Icon
              name="substract"
              width="12"
              height="2"
            />
          }
          initialValue={cartItem.quantity}
          quantityClassName="quantity"
          containerClassName="quantity-box"
          btnClassName="quantity-btn"
          handlePlus={handlePlus}
          handleSubtract={handleSubstract}
        />
      </td>
      <td className="subtotal">{subtotal} $</td>
      <td className="delete-btn">
        <button onClick={handleDeleteProduct}>
          <Icon
            name="trash"
            width="18"
            height="20"
          />
        </button>
      </td>
    </TableRow>
  );
};

export default CartProductTableRow;
