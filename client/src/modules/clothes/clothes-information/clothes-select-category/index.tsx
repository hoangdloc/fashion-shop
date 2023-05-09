import styled from '@emotion/styled';
import React from 'react';
import ClothesColorSelect from './ClothesColorSelect';
import ClothesSizeSelect from './ClothesSizeSelect';

import type { Color } from '~/shared/@types/category';
import type { Size } from '~/shared/@types/size';

interface ClothesSelectCategoryProps {
  colors: Color[]
  sizes: Size[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.8rem;
  margin-bottom: 2.8rem;
`;

const ClothesSelectCategory: React.FC<ClothesSelectCategoryProps> = ({ colors, sizes }) => {
  return <Container>
    <ClothesColorSelect colors={colors} />
    <ClothesSizeSelect sizes={sizes} />
  </Container>;
};

export default ClothesSelectCategory;
