import styled from '@emotion/styled';
import React from 'react';
import SortingSelect from './SortingSelect';
import ProductGrid from './ProductGrid';

const ProductResultsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3rem;
  width: 100%;
`;

const ProductResults: React.FC = () => {
  return (
    <ProductResultsContainer>
      <SortingSelect />
      <ProductGrid />
    </ProductResultsContainer>
  );
};

export default ProductResults;