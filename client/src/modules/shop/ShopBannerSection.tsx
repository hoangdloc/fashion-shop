import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { AppRoute, ShopRoute } from '~/config/route';

import bannerWomen from '~/assets/images/banner-women.png';
import bannerMen from '~/assets/images/banner-men.png';
import bannerUnisex from '~/assets/images/banner-unisex.png';

enum ShopLocation {
  WOMEN = `${AppRoute.SHOP}/${ShopRoute.WOMEN}`,
  MEN = `${AppRoute.SHOP}/${ShopRoute.MEN}`,
  UNISEX = `${AppRoute.SHOP}/${ShopRoute.UNISEX}`
}

const ShopBannerSectionStyles = styled.section<{ imageUrl: string }>`
  width: 100%;
  height: 28.8rem;
  padding: 2.4rem 16rem;
  background-image: linear-gradient(#2b2f320d, #2b2f320d),
    url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ShopBannerSection: React.FC = () => {
  const { pathname } = useLocation();

  const imageUrl = (): string => {
    switch (pathname) {
      case ShopLocation.WOMEN:
        return bannerWomen;

      case ShopLocation.UNISEX:
        return bannerUnisex;

      default:
        return bannerMen;
    }
  };

  return <ShopBannerSectionStyles imageUrl={imageUrl()} />;
};

export default ShopBannerSection;
