import styled from '@emotion/styled';
import { Carousel } from 'antd';
import { type CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react';
import { v4 } from 'uuid';

import { useClothesDetails } from '~/contexts/clothes-details-context';
import { LeftArrowIcon, RightArrowIcon } from '~/shared/components/icon';
import ImageCollectionCarouselSkeleton from './ImageCollectionCarouselSkeleton';

const Container = styled.div`
  position: relative;
  & > .slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    opacity: 0.6;
    background-color: ${props => props.theme.colors.bgGray};
    color: ${props => props.theme.colors.primaryBlack};
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.textWhite};
      background-color: ${props => props.theme.colors.secondaryRed};
      opacity: 1;
    }
    &:active {
      scale: 1.1;
    }
    &__prev {
      left: 1.2rem;
    }
    &__next {
      right: 1.2rem;
    }
  }
`;

const ImageItem = styled.div`
  height: 55rem;
  width: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageCollectionCarousel: React.FC = () => {
  const { currentClothes } = useClothesDetails();
  const carouselRef = useRef<CarouselRef>(null);

  const handleNextSlide = (): void => {
    carouselRef.current?.next();
  };

  const handlePrevSlide = (): void => {
    carouselRef.current?.prev();
  };

  if (currentClothes == null) return <ImageCollectionCarouselSkeleton />;

  return (
    <Container>
      <Carousel ref={carouselRef}>
        {currentClothes.images.map((image, index) => (
          <ImageItem key={v4()}>
            <img
              src={image}
              alt={`${currentClothes.name} photo ${index + 1}`}
              draggable={false}
            />
          </ImageItem>
        ))}
      </Carousel>
      <button
        onClick={handlePrevSlide}
        className="slide-btn slide-btn__prev"
      >
        <LeftArrowIcon />
      </button>
      <button
        onClick={handleNextSlide}
        className="slide-btn slide-btn__next"
      >
        <RightArrowIcon />
      </button>
    </Container>
  );
};

export default ImageCollectionCarousel;
