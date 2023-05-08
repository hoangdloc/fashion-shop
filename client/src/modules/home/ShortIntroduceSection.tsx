import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Typography } from 'antd';
import React from 'react';

import { AppRoute } from '../../config/route';
import { MyLinkButton } from '../../shared/components/button';

const ShortIntroduceSectionStyles = styled('section')(props => ({
  height: '46rem',
  backgroundImage:
    "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('./img/intro.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  '.intro-box': {
    height: '100%',
    width: '50%',
    backgroundImage:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
    padding: '0 3.6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    color: props.theme.colors.textWhite,
    '.ant-typography': {
      color: props.theme.colors.textWhite
    }
  }
}));

const ShortIntroduceSection: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <ShortIntroduceSectionStyles>
      <div className="intro-box">
        <Typography.Title
          style={{
            fontFamily: emotionTheme.fontFamily.Rufina,
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '10%',
            fontSize: '3.2rem'
          }}
        >
          Our mission
        </Typography.Title>
        <Typography.Text
          style={{
            fontWeight: 300,
            fontSize: '1.6rem',
            opacity: 0.8,
            lineHeight: '2.24rem',
            width: '51.6rem',
            marginBottom: '6.2rem'
          }}
        >
          Fashion is a contemporary clothing store known for its trend-driven
          styles with affordable prices. Drawing inspiration from the latest
          trends, from street style to runway, Fashion clothing store offers an
          array of styles that is fit for the fashion loving people. From
          workwear to street style, night out, Fashion store can keep you going
          from day-to-night. Shop the latest collection from Fashion clothing
          line, ranging in dresses to tops, backpacks, rompers, pants,
          outerwear, watches and shoes.
        </Typography.Text>
        <MyLinkButton
          to={AppRoute.ABOUT}
          style={{
            padding: '1.5rem 4rem'
          }}
        >
          Read more
        </MyLinkButton>
      </div>
    </ShortIntroduceSectionStyles>
  );
};

export default ShortIntroduceSection;
