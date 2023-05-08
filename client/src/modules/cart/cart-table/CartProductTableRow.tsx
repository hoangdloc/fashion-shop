import styled from '@emotion/styled';
import React, { useState } from 'react';

import QuantityBox from '../../../shared/components/quantity-box';
import CartProductItem from './CartProductItem';

import type { CartItem } from '../../../shared/@types/cart';
import { PlusIcon, SubstractIcon } from '../../../shared/components/icon';
import { renderPrice } from '../../../shared/utils/renderPrice';

interface CartProductTableRowProps {
  cartItem: CartItem
}

const TableRow = styled.tr`
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
`;

const CartProductTableRow: React.FC<CartProductTableRowProps> = ({
  cartItem
}) => {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const { price, salePercent, status, images, name } = cartItem.clothes;
  const { actualPrice } = renderPrice(price, salePercent, status);

  const handlePlus = (): void => {
    setQuantity(prev => prev + 1);
  };
  const handleSubstract = (): void => {
    if (quantity > 1) setQuantity(prev => prev - 1);
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
        />
      </td>
      <td className="quantity">
        <QuantityBox
          plusIcon={<PlusIcon size="small" />}
          substractIcon={<SubstractIcon size="small" />}
          initialValue={quantity}
          quantityClassName="quantity"
          containerClassName="quantity-box"
          btnClassName="quantity-btn"
          handlePlus={handlePlus}
          handleSubtract={handleSubstract}
        />
      </td>
      <td className="subtotal">{(+actualPrice * quantity).toFixed(2)} $</td>
    </TableRow>
  );
};

export default CartProductTableRow;
