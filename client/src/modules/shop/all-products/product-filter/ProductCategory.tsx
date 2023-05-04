import React from 'react';
import { DecoratedHeading } from '../../../../shared/components/heading';
import styled from '@emotion/styled';
import type { RadioItems } from '../../../../shared/components/radio-group';
import { Type } from '../../../../shared/@types/category';
import MyRadioGroup from '../../../../shared/components/radio-group';

const ProductCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const categoryFilterItems: RadioItems[] = Object.values(Type).map(type => ({
  id: type,
  value: type,
  label: type
}));

const ProductCategory: React.FC = () => {
  return (
    <ProductCategoryContainer>
      <DecoratedHeading level="h3">Products Category</DecoratedHeading>
      <MyRadioGroup
        name="category-filter"
        data={categoryFilterItems}
        onChange={e => {
          console.log(e.target.value);
        }}
      />
    </ProductCategoryContainer>
  );
};

export default ProductCategory;
