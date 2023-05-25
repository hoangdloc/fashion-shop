import styled from '@emotion/styled';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { DecoratedHeading } from '~/shared/components/heading';
import { MyRadioGroup } from '~/shared/components/radio-group';

import { Type } from '~/shared/@types/category';
import type { RadioItems } from '~/shared/components/radio-group';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchParams.set(shopUrlParams.TYPE, e.target.value);
    searchParams.delete(shopUrlParams.PAGE);
    searchParams.delete(shopUrlParams.KEYWORD);
    setSearchParams(searchParams);
  };

  return (
    <ProductCategoryFilterContainer>
      <DecoratedHeading level="h3">Products Category</DecoratedHeading>
      <MyRadioGroup
        checkedRadio={
          (searchParams.get(shopUrlParams.TYPE) as Type) ?? categoryFilterItems[0].value
        }
        name="category-filter"
        data={categoryFilterItems}
        onChange={onChange}
        underline
      />
    </ProductCategoryFilterContainer>
  );
};

export default ProductTypeFilter;
