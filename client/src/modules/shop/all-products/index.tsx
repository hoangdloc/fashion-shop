import styled from '@emotion/styled';
import React from 'react';
import SideToolbar from './product-filter';
import ProductResults from './product-results';

const AllProductSectionContaniner = styled.section`
  padding: 4.4rem 16rem 6rem 16rem;
  display: flex;
  gap: 1.6rem;
`;

const AllProductSection: React.FC = () => {
  return <AllProductSectionContaniner>
    <SideToolbar />
    <ProductResults />
  </AllProductSectionContaniner>;
};

export default AllProductSection;
