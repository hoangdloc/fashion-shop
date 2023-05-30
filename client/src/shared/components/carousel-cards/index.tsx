import 'swiper/css';

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { MyButton } from '~/shared/components/button';
import {
  ClothesCard,
  ClothesSkeletonCard
} from '~/shared/components/clothes-card';
import { Icon } from '~/shared/components/icon';

import type { Clothes } from '~/shared/@types/clothes';

interface MyCarouselProps {
  data?: Clothes[]
  loading: boolean
}

const MyCarouselStyles = styled.div`
  width: 100%;
  position: relative;
  .slide-btn {
    color: ${props => props.theme.colors.primaryBlack};
    opacity: 0.4;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    @media ${props => props.theme.devices.mobile} {
      display: none;
    }
  }
  .prev-slide {
    left: -4.4rem;
  }
  .next-slide {
    right: -4.4rem;
  }
`;

const CarouselCards: React.FC<MyCarouselProps> = props => {
  const { data, loading } = props;
  const swiper = useSwiper();
  const [swiperInstance, setSwiperInstance] = useState(swiper);

  return (
    <MyCarouselStyles>
      <MyButton
        type="ghost"
        shape="circle"
        className="slide-btn prev-slide"
        icon={
          <Icon
            name="leftArrow"
            width="14"
            height="24"
          />
        }
        onClick={() => {
          swiperInstance.slidePrev();
        }}
      />
      <Swiper
        onSwiper={swiper => {
          setSwiperInstance(swiper);
        }}
        grabCursor
        spaceBetween={16}
        breakpoints={{
          375: {
            slidesPerView: 1.2
          },
          768: {
            slidesPerView: 2.3
          },
          1024: {
            slidesPerView: 3.2
          },
          1440: {
            slidesPerView: 4
          }
        }}
      >
        {loading &&
          new Array(8).fill(0).map((_, index) => (
            <SwiperSlide key={index}>
              <ClothesSkeletonCard />
            </SwiperSlide>
          ))}
        {!loading &&
          data?.map(clothes => (
            <SwiperSlide key={clothes.id}>
              <ClothesCard clothes={clothes} />
            </SwiperSlide>
          ))}
      </Swiper>
      <MyButton
        type="ghost"
        shape="circle"
        className="slide-btn next-slide"
        icon={
          <Icon
            name="rightArrow"
            width="14"
            height="24"
          />
        }
        onClick={() => {
          swiperInstance.slideNext();
        }}
      />
    </MyCarouselStyles>
  );
};

export default CarouselCards;
