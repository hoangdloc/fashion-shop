import styled from '@emotion/styled';
import React from 'react';
import SideToolbar from './product-filter';

const AllProductSectionContaniner = styled.section`
  padding: 2rem 16rem 6rem 16rem;
  display: flex;
  gap: 1.6rem;
`;

const AllProductSection: React.FC = () => {
  return <AllProductSectionContaniner>
    <SideToolbar />
    <main>Products</main>
  </AllProductSectionContaniner>;
};

export default AllProductSection;
