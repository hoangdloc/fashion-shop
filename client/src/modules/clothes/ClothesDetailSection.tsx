import styled from '@emotion/styled';
import React from 'react';
import { ClothesDetailsProvider } from '~/contexts/clothes-details-context';
import ClothesInformation from './clothes-information';
import ImageCollection from './image-collection';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
`;

const ClothesDetailSection: React.FC = () => {
  return (
    <ClothesDetailsProvider>
      <ClothesDetailSectionContainer>
        <ImageCollection />
        <ClothesInformation />
      </ClothesDetailSectionContainer>
    </ClothesDetailsProvider>
  );
};

export default ClothesDetailSection;
