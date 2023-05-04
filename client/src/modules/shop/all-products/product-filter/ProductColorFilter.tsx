import styled from '@emotion/styled';
import React from 'react';
import { DecoratedHeading } from '../../../../shared/components/heading';
import MyRadioGroup, { type RadioItems } from '../../../../shared/components/radio-group';

import { Color } from '../../../../shared/@types/category';
import { renderColorBox } from '../../../../shared/utils/renderColorBox';
import { useTheme } from '@emotion/react';

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

  return (
    <ProductColorFilterContainer>
      <DecoratedHeading>Color</DecoratedHeading>
      <MyRadioGroup
        name="color-filter"
        direction='horizontal'
        type='box'
        data={colorFilterItems}
        selectedStyle={{ border: `0.2rem solid ${emotionTheme.colors.secondaryRed}` }}
        hoverStyle={{ opacity: 0.6 }}
        onChange={e => {
          console.log(e.target.value);
        }}
      />
    </ProductColorFilterContainer>
  );
};

export default ProductColorFilter;
