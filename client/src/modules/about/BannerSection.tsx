import styled from '@emotion/styled';
import React from 'react';

const BannerSectionStyles = styled('section')`
  width: 100vw;
  height: 36rem;
  background-image: url('/img/about-us-banner.png');
  background-repeat: no-repeat;
  background-size: cover;
  @media ${props => props.theme.devices.mobile} {
    height: 24rem;
  }
`;

const BannerSection: React.FC = () => {
  return <BannerSectionStyles />;
};

export default BannerSection;
