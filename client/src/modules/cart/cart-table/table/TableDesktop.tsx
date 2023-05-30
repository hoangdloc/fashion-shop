import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Typography } from 'antd';
import React, { useImperativeHandle } from 'react';
import { v4 } from 'uuid';

import { useCart } from '~/contexts/cart-context';
import { localePrice } from '~/shared/utils/renderPrice';
import CartProductTableRow from '../CartProductTableRow';

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

const TableDesktop = React.forwardRef((_, ref) => {
  const { cart, cartTotal } = useCart();
  const [parent, enableAnimations] = useAutoAnimate();

  useImperativeHandle(ref, () => {
    return {
      disableAnimation: () => {
        enableAnimations(false);
      }
    };
  }, [enableAnimations]);

  return (
    <Table>
      <thead>
        <tr>
          <th className="product">Product</th>
          <th className="quantity">Quantity</th>
          <th className="subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody ref={parent}>
        {cart.map(item => (
          <CartProductTableRow
            key={v4()}
            cartItem={item}
            enableAnimations={enableAnimations}
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
              {localePrice(cartTotal.toFixed(2))} $
            </Typography.Text>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
});

TableDesktop.displayName = 'TableDesktop';

export default TableDesktop;
