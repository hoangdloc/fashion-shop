import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DecoratedHeading } from '~/shared/components/heading';

import { MyRadioGroup } from '~/shared/components/radio-group';

import { Size } from '~/shared/@types/size';
import type { RadioItems } from '~/shared/components/radio-group';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';

const ProductSizeFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SizeBox = styled.div`
  background-color: #f4f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
`;

const sizeFilterItems: RadioItems[] = Object.values(Size).map(type => ({
  id: type,
  value: type,
  label: <SizeBox>{type}</SizeBox>
}));

const ProductSizeFilter: React.FC = () => {
  const emotionTheme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchParams.set(shopUrlParams.SIZE, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <ProductSizeFilterContainer>
      <DecoratedHeading>Size</DecoratedHeading>
      <MyRadioGroup
        name="size-filter"
        direction="horizontal"
        type="box"
        data={sizeFilterItems}
        checkedRadio={
          (searchParams.get(shopUrlParams.SIZE) as Size) ?? sizeFilterItems[0].value
        }
        selectedStyle={{
          backgroundColor: emotionTheme.colors.secondaryRed,
          color: emotionTheme.colors.textWhite
        }}
        hoverStyle={{
          backgroundColor: emotionTheme.colors.secondaryRed,
          color: emotionTheme.colors.textWhite,
          opacity: 0.6
        }}
        onChange={onChange}
      />
    </ProductSizeFilterContainer>
  );
};

export default ProductSizeFilter;
