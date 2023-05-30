import styled from '@emotion/styled';
import React from 'react';

const CartBannerSectionContainer = styled.section`
  width: 100%;
  height: 24rem;
  padding: 2.4rem 16rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 0;
    height: 20rem;
  }
`;

const CartBannerImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#2b2f320d, #2b2f320d),
    url('/img/cart-banner.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

const CartBannerSection: React.FC = () => {
  return (
    <CartBannerSectionContainer>
      <CartBannerImg />
    </CartBannerSectionContainer>
  );
};

export default CartBannerSection;
