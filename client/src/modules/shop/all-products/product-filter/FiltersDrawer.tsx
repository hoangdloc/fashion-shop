import styled from '@emotion/styled';
import React from 'react';
import ProductTypeFilter from './ProductTypeFilter';
import ProductPriceFilter from './ProductPriceFilter';
import ProductColorFilter from './ProductColorFilter';
import ProductSizeFilter from './ProductSizeFilter';
import SearchBar from '../product-results/SearchBar';
import SortingSelect from '../product-results/SortingSelect';

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FiltersDrawer: React.FC = () => {
  return (
    <DrawerBody>
      <Wrapper>
        <SearchBar />
        <SortingSelect />
      </Wrapper>
      <ProductTypeFilter />
      <ProductPriceFilter />
      <ProductColorFilter />
      <ProductSizeFilter />
    </DrawerBody>
  );
};

export default FiltersDrawer;
