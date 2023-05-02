import 'swiper/css';

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import type { Clothes } from '../../@types/clothes';
import MyButton from '../button';
import { ClothesCard, ClothesSkeletonCard } from '../clothes-card';
import { LeftArrowIcon, RightArrowIcon } from '../icon';

interface MyCarouselProps {
  data?: Clothes[]
  loading: boolean
}

const MyCarouselStyles = styled('div')(props => ({
  width: '100%',
  position: 'relative',
  '.slide-btn': {
    color: props.theme.colors.primaryBlack,
    opacity: 0.4,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-100%)'
  },
  '.prev-slide': {
    left: '-4.362rem'
  },
  '.next-slide': {
    right: '-4.362rem'
  }
}));

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
        icon={<LeftArrowIcon />}
        onClick={() => {
          swiperInstance.slidePrev();
        }}
      />
      <Swiper
        onSwiper={swiper => {
          setSwiperInstance(swiper);
        }}
        slidesPerView={4}
        grabCursor
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
        icon={<RightArrowIcon />}
        onClick={() => {
          swiperInstance.slideNext();
        }}
      />
    </MyCarouselStyles>
  );
};

export default CarouselCards;
