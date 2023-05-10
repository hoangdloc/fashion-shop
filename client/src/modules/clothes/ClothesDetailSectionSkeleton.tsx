import styled from '@emotion/styled';
import React from 'react';
import ImageCollectionSkeleton from './image-collection/ImageCollectionSkeleton';
import ClothesInformationSkeleton from './clothes-information/ClothesInformationSkeleton';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 4rem;
`;

const ClothesDetailSectionSkeleton: React.FC = () => {
  return (
    <ClothesDetailSectionContainer>
      <ImageCollectionSkeleton />
      <ClothesInformationSkeleton />
    </ClothesDetailSectionContainer>
  );
};

export default ClothesDetailSectionSkeleton;
