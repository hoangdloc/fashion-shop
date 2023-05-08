import styled from '@emotion/styled';
import { Carousel, Typography } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react';

import { LeftArrowIcon, RightArrowIcon } from '../../shared/components/icon';

const TestimonialsSectionStyles = styled('section')`
  width: 100vw;
  height: 42.3rem;
  padding: 8rem 0 5.6rem 0;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/img/testimonials.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .ant-typography {
    color: ${props => props.theme.colors.textWhite};
    &.testimonial-intro {
      margin-bottom: 1.4rem;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 0.196rem;
    }
    &.testimonial-title {
      margin: 0;
      font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
      font-size: 3.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 2.8rem;
      font-weight: 700;
      line-height: 4.3rem;
    }
  }
`;

const CarouselContainer = styled('div')`
  position: relative;
  .slide-btn {
    position: absolute;
    top: 15%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: transparent;
    color: #999898;
    border: none;
    width: 4.8rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #fff;
    }
    &__left {
      left: -16rem;
    }
    &__right {
      right: -16rem;
    }
  }
`;

const TestimonialItemStyles = styled('div')`
  display: flex !important;
  flex-direction: column !important;
  gap: 1.2rem;
  .ant-typography {
    font-size: 1.6rem;
    &.description {
      color: rgba(256, 256, 256, 0.8);
      font-weight: 300;
      line-height: 2.24rem;
    }
    &.customer-name {
      font-weight: 400;
      position: relative;
      &::before {
        content: '';
        display: block;
        height: 0.15rem;
        width: 2.4rem;
        background-color: ${props => props.theme.colors.textWhite};
        position: absolute;
        top: 50%;
        left: 37%;
        transform: translateY(-50%);
      }
    }
  }
`;

const testimonialItems = [
  {
    content:
      "Fashion makes shopping for clothes a great experience. I love everything I've purchased both in-store and online from them, and there's only been one occasion where I've returned something (not the correct size), and this was dealt with quickly and efficiently. I love the range of clothes, and they make me feel wonderful when I wear them. Huge thanks to Fashion for helping me step out of my daggy ways and making me feel more comfortable in my own skin.",
    customer: 'London, Susan R.'
  },
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus molestias dolore odio! Nemo voluptates repellat modi corrupti corporis veritatis dolorum asperiores. Odio perferendis error repellat dolorum optio! Voluptatem unde, laboriosam sint accusantium molestiae quaerat quis, repellendus consectetur soluta consequuntur est iure a incidunt ab deleniti quasi, accusamus aliquam qui omnis?',
    customer: 'Hanoi, Loc Hoang'
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorem sint assumenda illum excepturi molestias rem totam, aperiam soluta quam pariatur vitae inventore quo accusamus deleniti deserunt accusantium rerum, enim necessitatibus. Labore modi consequuntur vero perspiciatis. Sequi repellendus qui hic numquam eaque beatae ab? Necessitatibus est odit consequatur magni similique.',
    customer: 'Tokyo, Kabuki W.'
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non deserunt eligendi repellendus laborum? Omnis, dolores. Provident, deserunt minima? Nihil doloribus omnis, labore aspernatur, velit architecto dicta adipisci suscipit voluptate quo provident placeat perferendis cumque esse blanditiis fuga. Aut tempora odio iure repellat quo, magni unde sit commodi, fugiat, distinctio nostrum.',
    customer: 'Munich, Joshua K.'
  }
];

const TestimonialsSection: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrevSlide = (): void => {
    if (carouselRef.current != null) carouselRef.current.prev();
  };

  const handleNextSlide = (): void => {
    if (carouselRef.current != null) carouselRef.current.next();
  };

  return (
    <TestimonialsSectionStyles>
      <Typography.Text className="testimonial-intro">
        Testimonials
      </Typography.Text>
      <Typography.Title
        level={2}
        className="testimonial-title"
      >
        What our customers say
      </Typography.Title>
      <CarouselContainer>
        <button
          className="slide-btn slide-btn__left"
          onClick={handlePrevSlide}
        >
          <LeftArrowIcon />
        </button>
        <Carousel
          ref={carouselRef}
          style={{ minHeight: '20.8rem', width: '74.2rem' }}
          autoplay
        >
          {testimonialItems.map((item, index) => (
            <TestimonialItemStyles key={index}>
              <Typography.Text className="description">
                “{item.content}”
              </Typography.Text>
              <Typography.Text className="customer-name">
                {item.customer}
              </Typography.Text>
            </TestimonialItemStyles>
          ))}
        </Carousel>
        <button
          className="slide-btn slide-btn__right"
          onClick={handleNextSlide}
        >
          <RightArrowIcon />
        </button>
      </CarouselContainer>
    </TestimonialsSectionStyles>
  );
};

export default TestimonialsSection;
