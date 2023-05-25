import 'swiper/css';

import styled from '@emotion/styled';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import hausLogo from '~/assets/svg/haus-logo.svg';
import loremipsum2Logo from '~/assets/svg/logoipsum-logo-2.svg';
import loremipsumLogo from '~/assets/svg/logoipsum-logo.svg';
import startupVenturelogo from '~/assets/svg/startup-venture-logo.svg';
import { useMedia } from '~/shared/hooks/useMedia';

const PartnerRibbonStyles = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  img {
    display: block;
    padding: 3.8rem 7.5rem;
  }
  @media ${props => props.theme.devices.mobile} {
    height: 13.2rem;
    padding: 2.4rem;
    .swiper-wrapper {
      align-items: center;
    }
    img {
      padding: 0;
    }
  }
`;

const imgItems = [
  {
    src: loremipsumLogo,
    alt: 'Lorem Ipsum'
  },
  {
    src: hausLogo,
    alt: 'Haus'
  },
  {
    src: loremipsum2Logo,
    alt: 'Lorem Ipsum2'
  },
  {
    src: startupVenturelogo,
    alt: 'Startup Venture'
  }
];

const PartnerRibbon: React.FC = () => {
  const isCarousel = useMedia<boolean>(
    ['(min-width: 37.5rem)', '(min-width: 0)'],
    [false, true],
    false
  );

  return (
    <PartnerRibbonStyles>
      {!isCarousel &&
        imgItems.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            draggable={false}
          />
        ))}
      {isCarousel && (
        <Swiper
          grabCursor
          slidesPerView={2}
        >
          {imgItems.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </PartnerRibbonStyles>
  );
};

export default PartnerRibbon;
