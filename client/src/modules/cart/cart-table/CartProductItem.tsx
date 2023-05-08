import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { renderPrice } from '~/shared/utils/renderPrice';
import ImageBox from '~/shared/components/image-box';

import type { Status } from '~/shared/@types/status';

interface CartProductItemProps {
  imageSrc: string
  title: string
  price: number
  salePercent: number
  status: Status
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
  gap: 1rem;
  & > .product-name {
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    margin: 0;
  }
  & > .product-price {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
  }
`;

const CartProductItem: React.FC<CartProductItemProps> = ({
  imageSrc,
  title,
  price,
  salePercent,
  status
}) => {
  const emotionTheme = useTheme();
  const { actualPrice, originalPrice, isSale } = renderPrice(
    price,
    salePercent,
    status
  );

  return (
    <CartProductItemContainer>
      <ImageBox
        src={imageSrc}
        size="7.8rem"
      />
      <ProductInfoContainer>
        <Typography.Title
          level={5}
          className="product-name"
        >
          {title}
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
      </ProductInfoContainer>
    </CartProductItemContainer>
  );
};

export default CartProductItem;
