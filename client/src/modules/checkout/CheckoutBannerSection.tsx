import styled from '@emotion/styled';
import React from 'react';

const CheckoutBannerSectionContainer = styled.section`
  width: 100%;
  height: 24rem;
  padding: 2.4rem 16rem;
`;

const CheckoutBannerImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#2b2f320d, #2b2f320d),
    url('/img/checkout-banner.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

const CheckoutBannerSection: React.FC = () => {
  return (
    <CheckoutBannerSectionContainer>
      <CheckoutBannerImg />
    </CheckoutBannerSectionContainer>
  );
};

export default CheckoutBannerSection;
