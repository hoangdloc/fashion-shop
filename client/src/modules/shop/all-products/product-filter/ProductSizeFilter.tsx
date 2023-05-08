import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DecoratedHeading } from '~/shared/components/heading';

import MyRadioGroup, { type RadioItems } from '~/shared/components/radio-group';
import { toggleFilterBySize } from '~/store/clothes/clothesSlice';

import { Size } from '~/shared/@types/size';
import type { RootState } from '~/store/store';

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
  const dispatch = useDispatch();
  const filterBySize = useSelector(
    (state: RootState) => state.clothes.filterBySize
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleFilterBySize(e.target.value as Size));
  };

  return (
    <ProductSizeFilterContainer>
      <DecoratedHeading>Size</DecoratedHeading>
      <MyRadioGroup
        name="size-filter"
        direction="horizontal"
        type="box"
        data={sizeFilterItems}
        defaultCheckedRadio={filterBySize}
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
