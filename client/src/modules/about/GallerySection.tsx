import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import gallery1 from '~/assets/images/gallery-1.png';
import gallery2 from '~/assets/images/gallery-2.png';
import gallery3 from '~/assets/images/gallery-3.png';
import gallery4 from '~/assets/images/gallery-4.png';
import gallery5 from '~/assets/images/gallery-5.png';
import gallery6 from '~/assets/images/gallery-6.png';

const GallerySectionStyles = styled('section')`
  padding: 8rem 16rem 12rem 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 3rem 2.4rem;
    gap: 3rem;
  }
  & .story-title {
    font-weight: 700;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    text-transform: uppercase;
    font-size: 3.2rem;
    line-height: 4.3rem;
    letter-spacing: 0.2rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2rem;
    }
  }
  & .story-content {
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2.24rem;
    color: ${props => props.theme.colors.textSubtitle};
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
    }
  }
`;

const GalleryStory = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 74.2rem;
  gap: 1.2rem;
  .ant-typography {
    margin: 0;
    text-align: center;
  }
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
  }
`;

const GalleryImgContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 15.556vw);
  gap: 1.6rem;
`;

const GalleryImgFigure = styled.figure`
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  background-color: #000;
  &.gallery-item {
    &-1 {
      grid-row: 1 / span 3;
      grid-column: 1;
    }
    &-2 {
      grid-row: 1 / span 2;
      grid-column: 2;
    }
    &-3 {
      grid-row: 1;
      grid-column: 3;
    }
    &-4 {
      grid-row: 4;
      grid-column: 1;
    }
    &-5 {
      grid-row: 3 / -1;
      grid-column: 2;
    }
    &-6 {
      grid-row: 2 / -1;
      grid-column: 3;
    }
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
`;

const imgItems = [
  {
    src: gallery1,
    alt: 'Gallery image 1'
  },
  {
    src: gallery2,
    alt: 'Gallery image 2'
  },
  {
    src: gallery3,
    alt: 'Gallery image 3'
  },
  {
    src: gallery4,
    alt: 'Gallery image 4'
  },
  {
    src: gallery5,
    alt: 'Gallery image 5'
  },
  {
    src: gallery6,
    alt: 'Gallery image 6'
  }
];

const GallerySection: React.FC = () => {
  return (
    <GallerySectionStyles>
      <GalleryStory>
        <Typography.Title
          level={3}
          className="story-title"
        >
          Affordable luxury
        </Typography.Title>
        <Typography.Text className="story-content">
          We are here to serve you and make sure you find the Perfect Look. Our
          passion for fashion is the reason why we are here. We absolutely love
          what we do, and our goal is to help our customers by providing them
          with unique outfit and accessories that make them stand-out from the
          crowd.
        </Typography.Text>
      </GalleryStory>
      <GalleryImgContainer>
        {imgItems.map((item, index) => (
          <GalleryImgFigure
            className={`gallery-item-${index + 1}`}
            key={index}
          >
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
            />
          </GalleryImgFigure>
        ))}
      </GalleryImgContainer>
    </GallerySectionStyles>
  );
};

export default GallerySection;
