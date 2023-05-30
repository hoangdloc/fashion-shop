import styled from '@emotion/styled';
import React from 'react';

import { CheckoutProvider } from '~/contexts/checkout-context';
import OrderInformation from './order-information';
import PaymentInformation from './payment-information';
import PersonalInformation from './personal-information';

const Container = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
  padding: 2.4rem 16rem 6.2rem 16rem;
  width: 100%;
  main {
    width: 100%;
    flex: 0 1 74.1rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  @media ${props => props.theme.devices.mobile} {
    flex-direction: column;
    padding: 2.4rem 2.4rem 6rem 2.4rem;
  }
`;

const CheckoutContentSection: React.FC = () => {
  return (
    <CheckoutProvider>
      <Container>
        <main>
          <PersonalInformation />
          <PaymentInformation />
        </main>
        <OrderInformation />
      </Container>
    </CheckoutProvider>
  );
};

export default CheckoutContentSection;
