import styled from '@emotion/styled';
import React from 'react';
import ProductCategoryFilter from './ProductCategoryFilter';
import ProductPriceFilter from './ProductPriceFilter';
import ProductColorFilter from './ProductColorFilter';
import ProductSizeFilter from './ProductSizeFilter';

const SideToolbarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;
`;

const SideToolbar: React.FC = () => {
  return (
    <SideToolbarContainer>
      <ProductCategoryFilter />
      <ProductPriceFilter />
      <ProductColorFilter />
      <ProductSizeFilter />
    </SideToolbarContainer>
  );
};

export default SideToolbar;
