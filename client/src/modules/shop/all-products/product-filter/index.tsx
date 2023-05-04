import styled from '@emotion/styled';
import React from 'react';
import ProductCategory from './ProductCategory';

const SideToolbarContainer = styled.aside``;

const SideToolbar: React.FC = () => {
  return (
    <SideToolbarContainer>
      <ProductCategory />
    </SideToolbarContainer>
  );
};

export default SideToolbar;
