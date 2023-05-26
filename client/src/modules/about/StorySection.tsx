import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';

const StorySectionStyles = styled('section')`
  padding: 6rem 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 3rem 2.4rem;
    gap: 4rem;
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

const FirstExpandationStyles = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 74.2rem;
  gap: 1.2rem;
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    gap: 0;
  }
  .ant-typography {
    margin: 0;
    text-align: center;
  }
`;

const StoryContainerStyles = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 11.1rem;
  row-gap: 8rem;
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    grid-template-columns: none;
    grid-template-areas:
      'mission_image'
      'mission-content'
      'contact_image'
      'contact-content';
    row-gap: 3rem;
  }
`;

const StoryImgBox = styled('div')<{ bgImgSrc: string }>`
  width: 45.7rem;
  height: 48rem;
  background-image: url(${props => props.bgImgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    height: 32rem;
    &:first-of-type {
      grid-area: mission_image;
    }
    &:last-of-type {
      grid-area: contact_image;
    }
  }
`;

const StoryContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 55.2rem;
  gap: 1.2rem;
  .ant-typography {
    margin: 0;
    width: 100%;
  }
  & > .contact-btn {
    padding: 1.5rem 3.7rem;
    text-transform: uppercase;
    height: 5.2rem;
    margin-top: 4rem;
    @media ${props => props.theme.devices.mobile} {
      margin: 3rem auto;
    }
  }
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    text-align: center;
    &:first-of-type {
      grid-area: mission_content;
    }
    &:last-of-type {
      grid-area: contact_content;
    }
  }
`;

const StorySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StorySectionStyles>
      <FirstExpandationStyles>
        <Typography.Title
          level={3}
          className="story-title"
        >
          Our first expandation
        </Typography.Title>
        <Typography.Text className="story-content">
          2018 imprints the beginning of our first worldwide endeavor. Venturing
          into the US advertise, FASHION has arrived in a standout amongst
          L.A&lsquo;s most looked for after retail areas, Platform. Exhibiting
          our most cherished British brands and banding together with any
          semblance of Psychic Sisters, an energizing new section is standing
          by.
        </Typography.Text>
      </FirstExpandationStyles>
      <StoryContainerStyles>
        <StoryImgBox bgImgSrc="/img/about-us-story-1.png" />
        <StoryContentBox>
          <Typography.Title
            level={3}
            className="story-title"
          >
            Sportlight with founder
          </Typography.Title>
          <Typography.Text className="story-content">
            Several years back, Alfonso Segura, the CEO/Founder of the industry
            thought-leading blog found what was nothing more than a habit of
            collecting information on industry trends into building out a blog
            with a large readership.
          </Typography.Text>
          <Typography.Text className="story-content">
            While the journey to get there has never been an easy one, when
            reflecting on the road itself, Segura finds it far from random, as
            the consequence of his professional path in retail has always been
            reflected as far back as his studies in sociology. With a great
            interest in the science of understanding people, and retail is an
            industry that deals with people on a consumer level, Segura jumped
            into the fashion world head-on, and has since worked in the industry
            for over 10 years.
          </Typography.Text>
        </StoryContentBox>
        <StoryContentBox>
          <Typography.Title
            level={3}
            className="story-title"
          >
            Our mission
          </Typography.Title>
          <Typography.Text className="story-content">
            Fashion is a contemporary clothing store known for its trend-driven
            styles with affordable prices. Drawing inspiration from the latest
            trends, from street style to runway, Fashion clothing store offers
            an array of styles that is fit for the fashion loving people. From
            workwear to street style, night out, Fashion store can keep you
            going from day-to-night. Shop the latest collection from Fashion
            clothing line, ranging in dresses to tops, backpacks, rompers,
            pants, outerwear, watches and shoes.
          </Typography.Text>
          <Typography.Text className="story-content">
            We are here to serve you and make sure you find the Perfect Look for
            every occasion. Our Mission is to make a difference through our
            branding by staying ahead of the fashion trends, defining style and
            giving customers what they want.
          </Typography.Text>
          <MyButton
            className='contact-btn'
            type="primary"
            onClick={() => {
              navigate(AppRoute.CONTACT);
            }}
          >
            Contact us
          </MyButton>
        </StoryContentBox>
        <StoryImgBox bgImgSrc="/img/about-us-story-2.png" />
      </StoryContainerStyles>
    </StorySectionStyles>
  );
};

export default StorySection;
