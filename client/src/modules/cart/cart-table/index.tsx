import styled from '@emotion/styled';
import React from 'react';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Empty } from 'antd';

import { getCartItemsSelector } from '../../../store/cart/cartSlice';
import CartProductTableRow from './CartProductTableRow';

const CartProductTableSection = styled.section`
  padding: 2.4rem 16rem 6rem 16rem;
  width: 100%;
`;

const CartTableContainer = styled.div`
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
  tbody {
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
    border-bottom: 0.1rem solid ${props => props.theme.colors.horizontalColor};
  }
`;

const CartProductTable: React.FC = () => {
  const cartItems = useSelector(getCartItemsSelector);

  return (
    <CartProductTableSection>
      <CartTableContainer>
        {cartItems.length > 0
          ? (
            <Table>
              <thead>
                <tr>
                  <th className="product">Product</th>
                  <th className="quantity">Quantity</th>
                  <th className="subtotal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <CartProductTableRow
                    key={v4()}
                    cartItem={item}
                  />
                ))}
              </tbody>
            </Table>)
          : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}
      </CartTableContainer>
    </CartProductTableSection>
  );
};

export default CartProductTable;
