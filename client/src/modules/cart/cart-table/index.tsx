import styled from '@emotion/styled';
import React from 'react';

import CartTableContainer from './CartTableContainer';

const CartProductTableSection = styled.section`
  padding: 2.4rem 16rem 6rem 16rem;
  width: 100%;
`;

const CartProductTable: React.FC = () => {
  return (
    <CartProductTableSection>
      <CartTableContainer />
    </CartProductTableSection>
  );
};

export default CartProductTable;
