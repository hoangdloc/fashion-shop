import styled from '@emotion/styled';
import React from 'react';
import ImageCollection from './image-collection';
import ClothesInformation from './clothes-information';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
`;

const ClothesDetailSection: React.FC = () => {
  return (
    <ClothesDetailSectionContainer>
      <ImageCollection />
      <ClothesInformation />
    </ClothesDetailSectionContainer>
  );
};

export default ClothesDetailSection;
