import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ConfigProvider, Typography } from 'antd';
import React from 'react';

import MyBadge from '../badge';
import MyButton from '../button';
import { ShoppingBagIcon } from '../icon';

export interface ClothesCardProps {
  imgSrc: string
  to: string
  title: string
  price: number
  salePercent: number
}

const ClothesCardStyles = styled('div')(props => ({
  '.img-box': {
    width: '26.8rem',
    height: '40.4rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '.overlay': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    },
    '&:hover > .overlay': {
      backgroundColor: 'black',
      opacity: 0.4
    },
    '&:hover > img': {
      transform: 'scale(1.2)'
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s'
    }
  }
}));

const ClothesCard: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <ClothesCardStyles>
      <div className="img-box">
        <MyBadge
          style={{
            position: 'absolute',
            top: '1.2rem',
            left: '1.2rem',
            zIndex: 2
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="Product"
          draggable={false}
        />
        <div className="overlay"></div>
        <ConfigProvider
          theme={{ token: { colorPrimary: emotionTheme.colors.textWhite } }}
        >
          <MyButton
            style={{
              position: 'absolute',
              right: '1.6rem',
              bottom: '1.6rem',
              width: '4rem',
              height: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              color: emotionTheme.colors.primaryBlack
            }}
            icon={<ShoppingBagIcon />}
            shape="circle"
          />
        </ConfigProvider>
      </div>
      <div className="info-box">
        <Typography.Title
          style={{
            marginBottom: '0.4rem',
            marginTop: '2rem',
            lineHeight: '2.4rem',
            letterSpacing: 1.05,
            fontFamily: "'Playfair Display', san-serif",
            fontSize: '1.8rem',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
          level={5}
        >
          Back to the future
        </Typography.Title>
        <Typography.Text
          style={{
            fontSize: '1.6rem',
            color: emotionTheme.colors.secondaryRed
          }}
        >
          $ 375.00
        </Typography.Text>
      </div>
    </ClothesCardStyles>
  );
};

export default ClothesCard;
