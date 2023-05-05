import styled from '@emotion/styled';
import React from 'react';
import { DecoratedHeading } from '../../../../shared/components/heading';
import MyRadioGroup from '../../../../shared/components/radio-group';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterByType } from '../../../../store/clothes/clothesSlice';

import { Type } from '../../../../shared/@types/category';
import type { RadioItems } from '../../../../shared/components/radio-group';
import type { RootState } from '../../../../store/store';

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

const ProductTypeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterByType = useSelector(
    (state: RootState) => state.clothes.filterByType
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleFilterByType(e.target.value as Type));
  };

  return (
    <ProductCategoryFilterContainer>
      <DecoratedHeading level="h3">Products Category</DecoratedHeading>
      <MyRadioGroup
        defaultCheckedRadio={filterByType}
        name="category-filter"
        data={categoryFilterItems}
        onChange={onChange}
        underline
      />
    </ProductCategoryFilterContainer>
  );
};

export default ProductTypeFilter;
