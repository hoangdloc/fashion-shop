import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { AppRoute } from '~/config/route';
import { MyLinkButton } from '~/shared/components/button';
import { useMedia } from '~/shared/hooks/useMedia';

const ShortIntroduceSectionStyles = styled.section`
  height: 46rem;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url('./img/intro.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: end;
  @media ${props => props.theme.devices.mobile} {
    height: 34rem;
    justify-content: start;
    padding: 0 2.4rem;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('./img/intro.png');
  }
`;

const IntroBox = styled.div`
  height: 100%;
  width: 50%;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  );
  padding: 0 3.6rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  color: ${props => props.theme.colors.textWhite};
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    background-image: none;
    padding: 0;
  }
  .ant-typography {
    color: ${props => props.theme.colors.textWhite};
    &.title {
      font-family: ${props => props.theme.fontFamily.Rufina};
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.02rem;
      font-size: 3.2rem;
      @media ${props => props.theme.devices.mobile} {
        font-size: 2rem;
        margin-bottom: 0.4rem;
      }
    }
    &.description {
      font-weight: 300;
      font-size: 1.6rem;
      opacity: 0.8;
      line-height: 2.24rem;
      width: 51.6rem;
      margin-bottom: 6.2rem;
      @media ${props => props.theme.devices.mobile} {
        font-size: 1.4rem;
        width: 100%;
        margin-bottom: 4rem;
      }
    }
  }
  .read-more-btn {
    padding: 1.5rem 4rem;
  }
`;

const ShortIntroduceSection: React.FC = () => {
  const descriptionLength = useMedia<'long' | 'short'>(
    ['(min-width: 37.5rem)', '(min-width: 0)'],
    ['long', 'short'],
    'long'
  );

  return (
    <ShortIntroduceSectionStyles>
      <IntroBox>
        <Typography.Title className="title">Our mission</Typography.Title>
        <Typography.Text className="description">
          {descriptionLength === 'long' && (
            <>
              Fashion is a contemporary clothing store known for its
              trend-driven styles with affordable prices. Drawing inspiration
              from the latest trends, from street style to runway, Fashion
              clothing store offers an array of styles that is fit for the
              fashion loving people. From workwear to street style, night out,
              Fashion store can keep you going from day-to-night. Shop the
              latest collection from Fashion clothing line, ranging in dresses
              to tops, backpacks, rompers, pants, outerwear, watches and shoes.
            </>
          )}
          {descriptionLength === 'short' && (
            <>
              Fashion is a contemporary clothing store known for its
              trend-driven styles with affordable prices. Drawing inspiration
              from the latest trends, from street style to runway, Fashion
              clothing store offers an array of styles that is fit for the
              fashion loving people.
            </>
          )}
        </Typography.Text>
        <MyLinkButton
          className="read-more-btn"
          to={AppRoute.ABOUT}
        >
          Read more
        </MyLinkButton>
      </IntroBox>
    </ShortIntroduceSectionStyles>
  );
};

export default ShortIntroduceSection;
