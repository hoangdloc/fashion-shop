import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ConfigProvider, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/config/route';
import { renderBadge } from '~/shared/utils/renderBadge';
import { renderPrice } from '~/shared/utils/renderPrice';
import {
  setClothesPopup,
  setCurrentClothes
} from '~/store/clothes/clothesSlice';
import MyBadge from '../badge';
import { MyButton } from '../button';
import { Icon } from '../icon';
import ClothesSkeletonCard from './ClothesSkeletonCard';

import type { Gender } from '~/shared/@types/category';
import type { Clothes } from '~/shared/@types/clothes';

export interface ClothesCardProps {
  clothes?: Clothes
}

const ClothesCardStyles = styled.div`
  .img-box {
    display: block;
    width: 100%;
    height: 40.4rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover > .overlay {
      background-color: black;
      opacity: 0.4;
    }
    &:hover > img {
      transform: scale(1.2);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
      user-select: none;
    }
    .add-to-cart-btn {
      position: absolute;
      right: 1.6rem;
      bottom: 1.6rem;
      width: 4rem;
      height: 4rem;
      z-index: 2;
      color: ${props => props.theme.colors.primaryBlack};
    }
    @media ${props => props.theme.devices.mobile} {
      height: 36.3rem;
    }
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const InfoBox = styled.div`
  .product-name {
    margin-bottom: 0.4rem;
    margin-top: 2rem;
    line-height: 2.4rem;
    letter-spacing: 1.05;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
    }
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  & > .ant-typography {
    font-size: 1.6rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
    }
  }
`;

const ClothesCard: React.FC<ClothesCardProps> = props => {
  const { clothes } = props;
  const emotionTheme = useTheme();
  const dispatch = useDispatch();

  if (clothes == null) {
    return <ClothesSkeletonCard />;
  }

  const { images, name, salePercent, price, category, slug, status } = clothes;
  const gender: Gender = category[0];
  const linkToProduct = [AppRoute.SHOP, gender.toLowerCase(), slug].join('/');
  const badge = renderBadge(status);
  const { isSale, originalPrice, actualPrice } = renderPrice(
    price,
    salePercent,
    status
  );

  const handleSetCurrentClothes = (): void => {
    dispatch(setCurrentClothes(clothes));
  };

  const onAddToCartBtnClick = (
    event:
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    dispatch(setCurrentClothes(clothes));
    dispatch(setClothesPopup(true));
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
        <Overlay className="overlay" />
        <ConfigProvider
          theme={{ token: { colorPrimary: emotionTheme.colors.textWhite } }}
        >
          <MyButton
            className="add-to-cart-btn"
            icon={
              <Icon
                name="bag"
                width="20"
                height="20"
              />
            }
            shape="circle"
            onClick={onAddToCartBtnClick}
          />
        </ConfigProvider>
      </Link>
      <InfoBox>
        <Link to={linkToProduct}>
          <Typography.Title
            className="product-name"
            level={5}
          >
            {name}
          </Typography.Title>
        </Link>
        <ProductPrice>
          <Typography.Text
            style={{
              color: isSale
                ? emotionTheme.colors.textGrayLight
                : emotionTheme.colors.secondaryRed
            }}
            delete={isSale}
          >
            $ {originalPrice}
          </Typography.Text>
          {isSale && (
            <Typography.Text
              style={{ color: emotionTheme.colors.secondaryRed }}
            >
              $ {actualPrice}
            </Typography.Text>
          )}
        </ProductPrice>
      </InfoBox>
    </ClothesCardStyles>
  );
};

export default ClothesCard;
