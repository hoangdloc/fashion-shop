import styled from '@emotion/styled';
import React from 'react';

import { useMedia } from '~/shared/hooks/useMedia';
import ClothesInformationSkeleton from './clothes-information/ClothesInformationSkeleton';
import ImageCollectionCarouselSkeleton from './image-collection/ImageCollectionCarouselSkeleton';
import ImageCollectionSkeleton from './image-collection/ImageCollectionSkeleton';

const ClothesDetailSectionContainer = styled.section`
  width: 100%;
  padding: 4rem 16rem 5rem 16rem;
  display: flex;
  gap: 4rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 3.2rem 2.4rem 4rem 2.4rem;
    flex-direction: column;
  }
`;

const ClothesDetailSectionSkeleton: React.FC = () => {
  const isDesktop = useMedia<boolean>(
    ['(min-width: 37.5em)', '(min-width: 0)'],
    [true, false],
    true
  );

  return (
    <ClothesDetailSectionContainer>
      {isDesktop && <ImageCollectionSkeleton />}
      {!isDesktop && <ImageCollectionCarouselSkeleton />}
      <ClothesInformationSkeleton />
    </ClothesDetailSectionContainer>
  );
};

export default ClothesDetailSectionSkeleton;
