import styled from '@emotion/styled';
import React from 'react';
import { Type } from '../../../../shared/@types/category';
import { DecoratedHeading } from '../../../../shared/components/heading';
import type { RadioItems } from '../../../../shared/components/radio-group';
import MyRadioGroup from '../../../../shared/components/radio-group';

const ProductCategoryFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const categoryFilterItems: RadioItems[] = Object.values(Type).map(type => ({
  id: type,
  value: type,
  label: type
}));

const ProductCategoryFilter: React.FC = () => {
  return (
    <ProductCategoryFilterContainer>
      <DecoratedHeading level="h3">Products Category</DecoratedHeading>
      <MyRadioGroup
        name="category-filter"
        data={categoryFilterItems}
        onChange={e => {
          console.log(e.target.value);
        }}
        underline
      />
    </ProductCategoryFilterContainer>
  );
};

export default ProductCategoryFilter;
