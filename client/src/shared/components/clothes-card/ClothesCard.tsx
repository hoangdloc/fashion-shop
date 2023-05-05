import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ConfigProvider, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../config/route';
import type { Gender } from '../../@types/category';
import type { Clothes } from '../../@types/clothes';
import { Status } from '../../@types/status';
import { renderBadge } from '../../utils/renderBadge';
import MyBadge from '../badge';
import MyButton from '../button';
import { ShoppingBagIcon } from '../icon';
import ClothesSkeletonCard from './ClothesSkeletonCard';
import { useDispatch } from 'react-redux';
import { setCurrentClothes } from '../../../store/clothes/clothesSlice';
import { calcActualPrice } from '../../utils/calcActualPrice';

export interface ClothesCardProps {
  clothes?: Clothes
}

const ClothesCardStyles = styled('div')(() => ({
  '.img-box': {
    display: 'block',
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
  },
  '.info-box': {
    '.product-name': {
      marginBottom: '0.4rem',
      marginTop: '2rem',
      lineHeight: '2.4rem',
      letterSpacing: 1.05,
      fontFamily: "'Playfair Display', san-serif",
      fontSize: '1.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    '.product-price': {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    }
  }
}));

const ClothesCard: React.FC<ClothesCardProps> = props => {
  const { clothes } = props;
  const emotionTheme = useTheme();
  const disptach = useDispatch();

  if (clothes == null) {
    return <ClothesSkeletonCard />;
  }

  const { images, name, salePercent, price, category, slug, status } = clothes;
  const gender: Gender = category[0];
  const linkToProduct = [AppRoute.SHOP, gender.toLowerCase(), slug].join('/');
  const fixedPrice = (price: number): string => {
    return price.toFixed(2);
  };
  const badge = renderBadge(status);
  const isSale = salePercent !== 0 || status === Status.SALE;

  const handleSetCurrentClothes = (): void => {
    disptach(setCurrentClothes(clothes));
  };

  return (
    <ClothesCardStyles>
      <Link
        to={linkToProduct}
        className="img-box"
        state={clothes}
        onClick={handleSetCurrentClothes}
      >
        {badge != null && (
          <MyBadge
            color={badge.color}
            label={badge.label}
            style={{
              position: 'absolute',
              top: '1.2rem',
              left: '1.2rem',
              zIndex: 2
            }}
          />
        )}
        <img
          src={images[0]}
          alt={name}
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
              zIndex: 2,
              color: emotionTheme.colors.primaryBlack
            }}
            icon={<ShoppingBagIcon />}
            shape="circle"
          />
        </ConfigProvider>
      </Link>
      <div className="info-box">
        <Link to={linkToProduct}>
          <Typography.Title
            className="product-name"
            level={5}
          >
            {name}
          </Typography.Title>
        </Link>
        <div className="product-price">
          <Typography.Text
            style={{
              fontSize: '1.6rem',
              color: isSale
                ? emotionTheme.colors.textGrayLight
                : emotionTheme.colors.secondaryRed
            }}
            delete={isSale}
          >
            $ {fixedPrice(price)}
          </Typography.Text>
          {isSale && (
            <Typography.Text
              style={{
                fontSize: '1.6rem',
                color: emotionTheme.colors.secondaryRed
              }}
            >
              $ {fixedPrice(calcActualPrice(price, salePercent))}
            </Typography.Text>
          )}
        </div>
      </div>
    </ClothesCardStyles>
  );
};

export default ClothesCard;
