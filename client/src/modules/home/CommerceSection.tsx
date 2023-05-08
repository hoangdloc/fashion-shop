import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import commerce1 from '~/assets/images/commerce1.png';
import commerce2 from '~/assets/images/commerce2.png';

import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';

const CommerceSectionStyles = styled('section')(props => ({
  padding: '8rem 16rem 4rem 16rem',
  display: 'grid',
  gridTemplateColumns: '44rem 55.2rem',
  justifyContent: 'space-between',
  gap: '12rem',
  '.commerce-text-box': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    '& > .ant-typography': {
      margin: 0
    },
    '& > .ant-btn': {
      border: `0.2rem solid ${props.theme.colors.primaryBlack}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: props.theme.colors.bgWhite,
        color: props.theme.colors.primaryBlack,
        border: `0.2rem solid ${props.theme.colors.primaryBlack}`
      }
    }
  },
  '.commerce-img-box': {
    position: 'relative',
    width: '100%',
    height: '100%',
    '.img-box': {
      backgroundColor: props.theme.colors.primaryBlack,
      img: {
        width: '100%',
        objectFit: 'cover'
      },
      '& > .commerce-img-1': {
        opacity: 0.9
      },
      '& > .commerce-img-2': {
        opacity: 0.85
      }
    },
    '.float': {
      position: 'absolute',
      top: '4rem',
      left: '-9.5rem',
      zIndex: 1
    }
  }
}));

const CommerceSection: React.FC = () => {
  const navigate = useNavigate();
  const emotionTheme = useTheme();

  return (
    <CommerceSectionStyles>
      <div className="commerce-text-box">
        <Typography.Title
          style={{
            fontWeight: 300,
            fontSize: '2rem',
            lineHeight: '2.5rem',
            opacity: 0.8,
            textTransform: 'uppercase',
            marginBottom: '2.4rem'
          }}
          level={3}
        >
          Fashion&lsquo;s portfolio
        </Typography.Title>
        <Typography.Title
          style={{
            fontFamily: emotionTheme.fontFamily.PlayfairDisplay,
            fontSize: '2.8rem',
            textTransform: 'uppercase',
            marginBottom: '2.4rem',
            lineHeight: '3.7rem',
            letterSpacing: '0.08rem'
          }}
          level={4}
        >
          Lookbook for men
        </Typography.Title>
        <Typography.Text
          style={{
            fontSize: '1.6rem',
            fontWeight: 300,
            lineHeight: '140%',
            marginBottom: '6rem',
            width: '36.3rem',
            color: emotionTheme.colors.textSubtitle
          }}
        >
          Fashion is a both of womenswear and menswear store dedicated to
          creating considered everyday pieces of the highest quality.
        </Typography.Text>
        <MyButton
          style={{
            padding: '1.5rem 5.4rem',
            textTransform: 'uppercase',
            height: '5.2rem'
          }}
          type="primary"
          size="large"
          onClick={() => {
            navigate(AppRoute.SHOP);
          }}
        >
          View our product
        </MyButton>
      </div>
      <div className="commerce-img-box">
        <div className="img-box float">
          <img
            className="commerce-img-1"
            src={commerce1}
            alt="A man watching his phone"
          />
        </div>
        <div className="img-box">
          <img
            className="commerce-img-2"
            src={commerce2}
            alt="A man wearing vest"
          />
        </div>
      </div>
    </CommerceSectionStyles>
  );
};

export default CommerceSection;
