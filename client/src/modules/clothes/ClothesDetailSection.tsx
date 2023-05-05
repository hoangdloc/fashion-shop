import styled from '@emotion/styled';
import React from 'react';
import ImageCollection from './image-collection';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
`;

const ClothesDetailSection: React.FC = () => {
  return (
    <ClothesDetailSectionContainer>
      <ImageCollection />
      <div>Details</div>
    </ClothesDetailSectionContainer>
  );
};

export default ClothesDetailSection;
