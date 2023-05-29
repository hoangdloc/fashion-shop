import styled from '@emotion/styled';
import React from 'react';

import { ClothesDetailsProvider } from '~/contexts/clothes-details-context';
import ClothesInformation from './clothes-information';
import ImageCollection from './image-collection';
import { useMedia } from '~/shared/hooks/useMedia';
import ImageCollectionCarousel from './image-collection/ImageCollectionCarousel';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  @media ${props => props.theme.devices.mobile} {
    padding: 3.2rem 0 4rem 0;
    flex-direction: column;
  }
`;

const ClothesDetailSection: React.FC = () => {
  const isDesktop = useMedia<boolean>(
    ['(min-width: 37.5em)', '(min-width: 0)'],
    [true, false],
    true
  );

  return (
    <ClothesDetailsProvider>
      <ClothesDetailSectionContainer>
        {isDesktop && <ImageCollection />}
        {!isDesktop && <ImageCollectionCarousel />}
        <ClothesInformation />
      </ClothesDetailSectionContainer>
    </ClothesDetailsProvider>
  );
};

export default ClothesDetailSection;
