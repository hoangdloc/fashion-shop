import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import ImageBox from '~/shared/components/image-box';
import { renderPrice } from '~/shared/utils/renderPrice';

import { AppRoute } from '~/config/route';
import type { Color, Gender } from '~/shared/@types/category';
import type { Size } from '~/shared/@types/size';
import type { Status } from '~/shared/@types/status';

interface OrderItemProps {
  imageSrc: string
  title: string
  price: number
  salePercent: number
  status: Status
  gender: Gender
  slug: string
  quantity: number
  pickedColor: Color
  pickedSize: Size
}

const Container = styled.figure`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  & > .order-item-name {
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0;
    & > a:hover,
    a:link:hover {
      color: ${props => props.theme.colors.secondaryRed};
    }
  }
`;

const OrderItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & > .order-item-category {
    font-size: 1.4rem;
    color: ${props => props.theme.colors.grayDarker};
  }
  & > .order-item-price {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
  }
`;

const OrderItem: React.FC<OrderItemProps> = props => {
  const emotionTheme = useTheme();
  const {
    imageSrc,
    title,
    price,
    salePercent,
    status,
    gender,
    slug,
    quantity,
    pickedColor,
    pickedSize
  } = props;
  const { actualPrice, originalPrice, isSale } = renderPrice(
    price,
    salePercent,
    status
  );
  const linkToProduct = [AppRoute.SHOP, gender.toLowerCase(), slug].join('/');
  const sizeColorProduct = [pickedColor, pickedSize].join(', ');

  return (
    <Container>
      <Link to={linkToProduct}>
        <ImageBox
          src={imageSrc}
          size="5.6rem"
        />
      </Link>
      <OrderInfoContainer>
        <Typography.Title
          level={5}
          className="order-item-name"
        >
          <Link to={linkToProduct}>{`${title} x${quantity}`}</Link>
        </Typography.Title>
        <OrderItemInfo>
          <Typography.Text className="order-item-category">
            {sizeColorProduct}
          </Typography.Text>
          <div className="order-item-price">
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
        </OrderItemInfo>
      </OrderInfoContainer>
    </Container>
  );
};

export default OrderItem;
