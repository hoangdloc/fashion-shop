import 'swiper/css';

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import MyButton from '../button';
import { LeftArrowIcon, RightArrowIcon } from '../icon';

interface MyCarouselProps {
  total: number
  renderItem: React.ReactNode
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

const MyCarousel: React.FC<MyCarouselProps> = props => {
  const { total, renderItem } = props;
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
        spaceBetween={50}
        grabCursor
      >
        {new Array(total).fill(0).map((_, index) => (
          <SwiperSlide key={index}>{renderItem}</SwiperSlide>
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

export default MyCarousel;
