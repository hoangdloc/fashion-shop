import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBadge from '../../../shared/components/badge';
import { renderBadge } from '../../../shared/utils/renderBadge';
import { renderPrice } from '../../../shared/utils/renderPrice';
import QuantityBox from '../../../shared/components/quantity-box';
import { PlusIcon, SubstractIcon } from '../../../shared/components/icon';
import { MyButton } from '../../../shared/components/button';
import ClothesInformationSkeleton from './ClothesInformationSkeleton';
import ClothesDetails from './ClothesDetails';

import type { RootState } from '../../../store/store';
import { addProductToCart } from '../../../store/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../config/route';

const ClothesInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > .product-overview {
    font-weight: 300;
    font-size: 1.6rem;
    color: ${props => props.theme.colors.textSubtitle};
    margin-bottom: 4rem;
  }
`;

const ClothesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  & > .product-name {
    margin: 0;
    font-weight: 400;
    font-family: 'Playfair Display', sans-serif;
    font-size: 2.8rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
  }
  & > .product-badge {
    height: 100%;
  }
  margin-bottom: 2rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  & > .ant-typography {
    font-size: 3.2rem;
  }
  margin-bottom: 2rem;
`;

const AddToCartBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  & > .quantity-box {
    border: none;
    & > .quantity-btn {
      width: 5.2rem;
      height: 5.2rem;
      padding: 1.8rem;
      color: ${props => props.theme.colors.textWhite};
      background-color: ${props => props.theme.colors.primaryBlack};
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: ${props => props.theme.colors.secondaryRed};
      }
      &:active {
        transform: scale(1.05);
      }
    }
    & > .quantity-text {
      height: 5.2rem;
      width: 8.8rem;
      background-color: #f9f9f9;
      font-size: 1.6rem;
    }
  }
  & > .action-btn {
    height: 5.2rem;
    padding: 1.5rem 3.5rem;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
  }
  margin-bottom: 5.6rem;
`;

const ClothesInformation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emotionTheme = useTheme();
  const currentClothes = useSelector(
    (state: RootState) => state.clothes.currentClothes
  );
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddQuantity = (): void => {
    setQuantity(prev => prev + 1);
  };

  const handleSubstractQuantity = (): void => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = (): void => {
    if (currentUser == null || currentClothes == null) return;
    dispatch(
      addProductToCart({
        quantity,
        userId: currentUser.id,
        clothesId: currentClothes.id
      })
    );
    navigate(AppRoute.CART);
  };

  if (currentClothes == null) return <ClothesInformationSkeleton />;

  const {
    name,
    status,
    price,
    salePercent,
    overview,
    description,
    sizes,
    category
  } = currentClothes;
  const badge = renderBadge(status);
  const { isSale, originalPrice, actualPrice } = renderPrice(
    price,
    salePercent,
    status
  );

  return (
    <ClothesInformationContainer>
      <ClothesTitle>
        <Typography.Title className="product-name">{name}</Typography.Title>
        <MyBadge
          className="product-badge"
          color={badge?.color}
          label={badge?.label}
        />
      </ClothesTitle>
      <ProductPrice className="product-price">
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
          <Typography.Text style={{ color: emotionTheme.colors.secondaryRed }}>
            $ {actualPrice}
          </Typography.Text>
        )}
      </ProductPrice>
      <Typography.Text className="product-overview">{overview}</Typography.Text>
      <AddToCartBox>
        <QuantityBox
          containerClassName="quantity-box"
          btnClassName="quantity-btn"
          quantityClassName="quantity-text"
          plusIcon={<PlusIcon />}
          substractIcon={<SubstractIcon />}
          initialValue={quantity}
          handlePlus={handleAddQuantity}
          handleSubtract={handleSubstractQuantity}
        />
        <MyButton
          className="action-btn"
          type="primary"
          onClick={handleAddToCart}
        >
          Add to cart
        </MyButton>
      </AddToCartBox>
      <ClothesDetails
        description={description}
        sizes={sizes}
        category={category}
      />
    </ClothesInformationContainer>
  );
};

export default ClothesInformation;
