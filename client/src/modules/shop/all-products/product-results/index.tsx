import styled from '@emotion/styled';
import React from 'react';
import SortingSelect from './SortingSelect';
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';

const ProductResultsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3rem;
  width: 100%;
`;

const TopToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const ProductResults: React.FC = () => {
  return (
    <ProductResultsContainer>
      <TopToolbar>
        <SearchBar />
        <SortingSelect />
      </TopToolbar>
      <ProductGrid />
    </ProductResultsContainer>
  );
};

export default ProductResults;
