import styled from '@emotion/styled';
import React from 'react';
import OrderInformation from './order-information';

const Container = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
  padding: 2.4rem 16rem 6.2rem 16rem;
`;

const CheckoutContentSection: React.FC = () => {
  return (
    <Container>
      <div>
        <div>Form</div>
        <div>Method</div>
      </div>
      <OrderInformation />
    </Container>
  );
};

export default CheckoutContentSection;
