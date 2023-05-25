import styled from '@emotion/styled';
import { Carousel, Typography } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react';

import hero1 from '~/assets/images/hero1.png';
import hero2 from '~/assets/images/hero2.jpg';
import hero3 from '~/assets/images/hero3.jpg';
import hero4 from '~/assets/images/hero4.jpg';
import { AppRoute, ShopRoute } from '~/config/route';
import { MyButton, MyLinkButton } from '~/shared/components/button';
import { LeftArrowIcon, RightArrowIcon } from '~/shared/components/icon';

const HeroSectionStyles = styled.div`
  width: 100%;
  min-height: 82rem;
  position: relative;
  .slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(256, 256, 256, 0.3);
    color: rgba(256, 256, 256, 0.6);
    border: none;
    width: 4.8rem;
    height: 4.8rem;
    &__left {
      left: 4rem;
    }
    &__right {
      right: 4rem;
    }
  }
  .slide-item {
    position: relative;
    height: 82rem;
    width: 100%;
    background-color: black;
    .ant-typography {
      margin: 0;
      color: ${props => props.theme.colors.textWhite};
      line-height: 140%;
    }
    .hero-img {
      opacity: 0.6;
      width: 100%;
      object-fit: cover;
    }
    .hero-box {
      position: absolute;
      top: 28rem;
      left: 50%;
      transform: translateX(-50%);
      color: ${props => props.theme.colors.textWhite};
      z-index: 10;
      width: 93rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      .hero-title {
        font-size: 5.2rem;
        font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
        font-weight: 700;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
        margin-bottom: 0.8rem;
      }
      .hero-subtitle {
        font-family: ${props => props.theme.fontFamily.DmSans};
        font-size: 1.8rem;
        margin-bottom: 4rem;
      }
    }
  }
  @media ${props => props.theme.devices.mobile} {
    min-height: 62rem;
    .slide-btn {
      display: none;
    }
    .slide-item {
      height: 62rem;
      .hero-img {
        height: 100%;
      }
      .hero-box {
        align-items: flex-start;
        top: 20.2rem;
        width: 100%;
        padding: 0 2.4rem;
        .hero-title {
          font-size: 2.8rem;
          margin-bottom: 0.4rem;
          text-align: start;
        }
        .hero-subtitle {
          font-weight: 300;
          font-size: 1.4rem;
          text-align: start;
        }
      }
    }
    .slick-dots.slick-dots-bottom {
      justify-content: start;
      margin-left: 2.4rem;
      margin-bottom: 8.2rem;
    }
  }
`;

const heroContentItems = [
  {
    imagePath: hero1,
    altText: "Banner for new men's collection",
    title: 'New Collection For Men',
    description:
      "From high to low, classic or modern, we have covered. Check out the hottest men's outfits of 2022. Find your own style and let us help you make it happen.",
    link: AppRoute.SHOP
  },
  {
    imagePath: hero2,
    altText: "Banner for new women's collection",
    title: 'New Collection For Women',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis eum deserunt expedita maiores quasi incidunt necessitatibus molestiae libero tenetur aut reiciendis rem id pariatur ea voluptas error ipsa, iusto quia!',
    link: `${AppRoute.SHOP}/${ShopRoute.WOMEN}`
  },
  {
    imagePath: hero3,
    altText: "Banner for new unisex's collection",
    title: 'New Collection For Unisex',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iure totam, distinctio quam voluptatem, quibusdam dolore, facilis dolores assumenda voluptate ullam numquam iusto quos magni maiores? Quis repellat repudiandae porro.',
    link: `${AppRoute.SHOP}/${ShopRoute.UNISEX}`
  },
  {
    imagePath: hero4,
    altText: "Banner for new glasses's collection",
    title: 'New Collection For Glasses',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quaerat aliquid repellat mollitia dolor voluptatibus, eaque, quibusdam adipisci fugiat aut iste dolorem eum nostrum, nesciunt in omnis nisi facere repudiandae?',
    link: `${AppRoute.SHOP}/${ShopRoute.MEN}`
  }
];

const HeroSection: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrevSlide = (): void => {
    if (carouselRef.current != null) carouselRef.current.prev();
  };

  const handleNextSlide = (): void => {
    if (carouselRef.current != null) carouselRef.current.next();
  };

  return (
    <HeroSectionStyles>
      <MyButton
        className="slide-btn slide-btn__left"
        icon={<LeftArrowIcon />}
        onClick={handlePrevSlide}
      />
      <Carousel
        ref={carouselRef}
        autoplay
      >
        {heroContentItems.map((item, index) => (
          <div
            key={index}
            className="slide-item"
          >
            <img
              className="hero-img"
              src={item.imagePath}
              alt={item.altText}
              draggable={false}
            />
            <div className="hero-box">
              <Typography.Title
                className="hero-title"
                level={2}
              >
                {item.title}
              </Typography.Title>
              <Typography.Text className="hero-subtitle">
                {item.description}
              </Typography.Text>
              <MyLinkButton
                style={{ padding: '1.5rem 3.5rem' }}
                to={item.link}
              >
                View our shop
              </MyLinkButton>
            </div>
          </div>
        ))}
      </Carousel>
      <MyButton
        className="slide-btn slide-btn__right"
        icon={<RightArrowIcon />}
        onClick={handleNextSlide}
      />
    </HeroSectionStyles>
  );
};

export default HeroSection;
