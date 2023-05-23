import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Color } from '~/shared/@types/category';
import { DecoratedHeading } from '~/shared/components/heading';
import { MyRadioGroup } from '~/shared/components/radio-group';
import { renderColorBox } from '~/shared/utils/renderColorBox';

import type { RadioItems } from '~/shared/components/radio-group';
import { shopUrlParams } from '~/shared/@types/ShopURLParams';

const ProductColorFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ColorBox = styled.div<{ boxColor: string }>`
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${props => props.boxColor};
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
`;

const colorFilterItems: RadioItems[] = Object.values(Color).map(type => ({
  id: type,
  value: type,
  label: <ColorBox boxColor={renderColorBox(type)} />
}));

const ProductColorFilter: React.FC = () => {
  const emotionTheme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchParams.set(shopUrlParams.COLOR, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <ProductColorFilterContainer>
      <DecoratedHeading>Color</DecoratedHeading>
      <MyRadioGroup
        name="color-filter"
        direction="horizontal"
        type="box"
        data={colorFilterItems}
        checkedRadio={
          (searchParams.get(shopUrlParams.COLOR) as Color) ?? colorFilterItems[0].value
        }
        selectedStyle={{
          border: `0.2rem solid ${emotionTheme.colors.secondaryRed}`
        }}
        hoverStyle={{ opacity: 0.6 }}
        onChange={onChange}
      />
    </ProductColorFilterContainer>
  );
};

export default ProductColorFilter;
