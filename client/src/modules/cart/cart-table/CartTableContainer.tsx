import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import CartProductTableRow from './CartProductTableRow';
import { Empty, Typography } from 'antd';
import { v4 } from 'uuid';

import { useCart } from '../../../contexts/cart-context';
import { renderPrice } from '../../../shared/utils/renderPrice';

const CartTableContainerStyles = styled.div`
  min-width: 100%;
  min-height: 20vh;
  padding: 4rem 9.5rem;
  background-color: ${props => props.theme.colors.textWhite};
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Table = styled.table`
  min-width: 100%;
  & > thead,
  tbody,
  tfoot {
    & > tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .product {
        text-align: left;
        width: 60%;
      }
      .quantity {
        text-align: center;
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .subtotal {
        text-align: right;
        width: 20%;
      }
      th {
        font-weight: 400;
        padding-bottom: 1.6rem;
        font-size: 1.6rem;
      }
    }
    &:not(:last-child) {
      border-bottom: 0.1rem solid ${props => props.theme.colors.horizontalColor};
    }
  }
  & > tfoot {
    & > tr {
      align-items: flex-start;
      & > td {
        padding: 2.4rem 0;
        .serve {
          font-size: 1.4rem;
          color: ${props => props.theme.colors.grayDark};
        }
        .total {
          font-size: 2.4rem;
          font-weight: 700;
        }
      }
    }
  }
`;

const CartTableContainer: React.FC = () => {
  const { cart } = useCart();
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

  return (
    <CartTableContainerStyles>
      {cart.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th className="product">Product</th>
              <th className="quantity">Quantity</th>
              <th className="subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <CartProductTableRow
                key={v4()}
                cartItem={item}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Typography.Text className="serve">
                  It is our pleasure to serve you!
                </Typography.Text>
              </td>
              <td>
                <Typography.Text className="total">
                  {cartTotal.toFixed(2)} $
                </Typography.Text>
              </td>
            </tr>
          </tfoot>
        </Table>
      )}
      {cart.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </CartTableContainerStyles>
  );
};

export default CartTableContainer;
