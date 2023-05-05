import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

import ImageBox from '../../../shared/components/image-box';
import type { RootState } from '../../../store/store';
import { Skeleton } from 'antd';

const ImageCollectionContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ImageBoxListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  & .img-box {
    position: relative;
    border: 0.15rem solid transparent;
    &:hover {
      cursor: pointer;
      border: 0.15rem solid ${props => props.theme.colors.secondaryRed};
    }
    &:hover::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.active {
      border: 0.15rem solid ${props => props.theme.colors.secondaryRed};
    }
  }
`;

const CurrentImageBox = styled.figure`
  width: 36.3rem;
  height: 55rem;
  & .small-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageCollection: React.FC = () => {
  const currentClothes = useSelector(
    (state: RootState) => state.clothes.currentClothes
  );
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    currentClothes?.images[0]
  );

  useLayoutEffect(() => {
    if (currentClothes != null) {
      setCurrentImage(currentClothes.images[0]);
    }
  }, [currentClothes]);

  return (
    <ImageCollectionContainer>
      <ImageBoxListContainer>
        {currentClothes != null
          ? currentClothes.images.map((image, index) => (
            <ImageBox
              key={v4()}
              src={image}
              alt={`${currentClothes.name} photo ${index + 1}`}
              className={classNames('img-box', {
                active: image === currentImage
              })}
              onClick={() => {
                setCurrentImage(image);
              }}
            />
          ))
          : new Array(4).fill(0).map((_, index) => (
            <Skeleton.Image
              key={index}
              style={{ width: '8rem', height: '8rem' }}
              active
            />
          ))}
      </ImageBoxListContainer>
      <CurrentImageBox>
        {currentClothes != null
          ? (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: currentClothes.name,
                  isFluidWidth: false,
                  width: 363,
                  height: 550,
                  src: currentImage ?? currentClothes.images[0]
                },
                largeImage: {
                  src: currentImage ?? currentClothes.images[0],
                  width: 1200,
                  height: 1600
                },
                className: 'magnify',
                imageClassName: 'small-image'
              }}
            />)
          : (
            <Skeleton.Image
              style={{ width: '36.3rem', height: '55rem' }}
              active
            />)}
      </CurrentImageBox>
    </ImageCollectionContainer>
  );
};

export default ImageCollection;
