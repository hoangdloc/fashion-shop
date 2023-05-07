import styled from '@emotion/styled';
import React from 'react';
import QuantityBox from '../../shared/components/quantity-box';

const CartProductTableSection = styled.section`
  padding: 2.4rem 16rem 6rem 16rem;
  width: 100%;
`;

const CartTableContainer = styled.div`
  min-width: 100%;
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
      .product {
        text-align: left;
        width: 68%;
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
        width: 12%;
      }
      th, td {
        font-weight: 400;
      }
      th {
        padding-bottom: 1.6rem;
        font-size: 1.6rem;
      }
      td {
        padding: 2.4rem 0;
        font-size: 1.4rem;
      }
    }
    border-bottom: 0.1rem solid ${props => props.theme.colors.horizontalColor};
  }
`;

const CartProductTable: React.FC = () => {
  return (
    <CartProductTableSection>
      <CartTableContainer>
        <Table>
          <thead>
            <tr>
              <th className="product">Product</th>
              <th className="quantity">Quantity</th>
              <th className="subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product">Product 1</td>
              <td className="quantity"><QuantityBox /></td>
              <td className="subtotal">$ 999</td>
            </tr>
          </tbody>
        </Table>
      </CartTableContainer>
    </CartProductTableSection>
  );
};

export default CartProductTable;
