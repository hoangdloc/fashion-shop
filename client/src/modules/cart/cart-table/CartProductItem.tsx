import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '~/config/route';

import ImageBox from '~/shared/components/image-box';
import { renderPrice } from '~/shared/utils/renderPrice';

import type { Color, Gender } from '~/shared/@types/category';
import type { Size } from '~/shared/@types/size';
import type { Status } from '~/shared/@types/status';

interface CartProductItemProps {
  imageSrc: string
  title: string
  price: number
  salePercent: number
  status: Status
  gender: Gender
  slug: string
  pickedSize: Size
  pickedColor: Color
}

const CartProductItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  & > .product-name {
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    margin: 0;
    & > a:hover,
    a:link:hover {
      color: ${props => props.theme.colors.secondaryRed};
    }
  }
  & > .product-price {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
  }
  & > .size-color {
    font-size: 1.4rem;
    color: ${props => props.theme.colors.grayDarker};
  }
`;

const CartProductItem: React.FC<CartProductItemProps> = props => {
  const emotionTheme = useTheme();
  const { imageSrc, title, price, salePercent, status, gender, slug, pickedColor, pickedSize } = props;
  const { actualPrice, originalPrice, isSale } = renderPrice(
    price,
    salePercent,
    status
  );
  const linkToProduct = [AppRoute.SHOP, gender.toLowerCase(), slug].join('/');
  const sizeColorProdcut = [pickedColor, pickedSize].join(', ');

  return (
    <CartProductItemContainer>
      <Link to={linkToProduct}>
        <ImageBox
          src={imageSrc}
          size="7.8rem"
        />
      </Link>
      <ProductInfoContainer>
        <Typography.Title
          level={5}
          className="product-name"
        >
          <Link to={linkToProduct}>{title}</Link>
        </Typography.Title>
        <div className="product-price">
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
        </div>
        <Typography.Text className='size-color'>{sizeColorProdcut}</Typography.Text>
      </ProductInfoContainer>
    </CartProductItemContainer>
  );
};

export default CartProductItem;
