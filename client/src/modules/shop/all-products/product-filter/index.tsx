import styled from '@emotion/styled';
import React from 'react';
import ProductTypeFilter from './ProductTypeFilter';
import ProductPriceFilter from './ProductPriceFilter';
import ProductColorFilter from './ProductColorFilter';
import ProductSizeFilter from './ProductSizeFilter';

const SideToolbarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;
  @media ${props => props.theme.devices.mobile} {
    display: none;
  }
`;

const SideToolbar: React.FC = () => {
  return (
    <SideToolbarContainer>
      <ProductTypeFilter />
      <ProductPriceFilter />
      <ProductColorFilter />
      <ProductSizeFilter />
    </SideToolbarContainer>
  );
};

export default SideToolbar;
