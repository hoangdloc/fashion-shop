import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/config/route';
import { useCart } from '~/contexts/cart-context';
import { Icon } from '~/shared/components/icon';
import ImageBox from '~/shared/components/image-box';
import QuantityBox from '~/shared/components/quantity-box';
import { renderPrice } from '~/shared/utils/renderPrice';
import { plusProduct, substractProduct } from '~/store/cart/cartSlice';

import { type CartItem } from '~/shared/@types/cart';

interface CartProductItemMobileProps {
  cartItem: CartItem
  enableAnimations: (enabled: boolean) => void
}

const CartProductItemContainer = styled.div`
  width: 100%;
  height: 6.7rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CartProductItemDetails = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
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
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.2rem;
    }
  }
  & > .product-price {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
    }
  }
  & > .size-color {
    font-size: 1.4rem;
    color: ${props => props.theme.colors.grayDarker};
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.2rem;
    }
  }
`;

const CartProductItemAction = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  & > .delete-btn {
    color: #eaeaeb;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.secondaryRed};
    }
    &:active {
      transform: scale(1.1);
    }
    & > svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
  & > .quantity-box {
    border: none;
    & > .quantity-btn {
      background-color: #eaeaeb;
      width: 2rem;
      height: 2rem;
      padding: 0.6rem;
      border-radius: 100%;
      transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
      &:hover {
        color: ${props => props.theme.colors.textWhite};
        background-color: ${props => props.theme.colors.secondaryRed};
      }
      &:active {
        transform: scale(1.1);
      }
    }
    & > .quantity {
      padding: 0 1.2rem;
      width: 1.2rem;
      font-size: 1.4rem;
    }
  }
`;

const CartProductItemMobile: React.FC<CartProductItemMobileProps> = ({
  cartItem,
  enableAnimations
}) => {
  const emotionTheme = useTheme();
  const dispatch = useDispatch();
  const { cart, setCart } = useCart();
  const { price, salePercent, status, images, name, category, slug } =
    cartItem.clothes;
  const { actualPrice, originalPrice, isSale } = renderPrice(
    price,
    salePercent,
    status
  );
  const gender = category[0];
  const linkToProduct = [AppRoute.SHOP, gender.toLowerCase(), slug].join('/');
  const sizeColorProdcut = [cartItem.color, cartItem.size].join(', ');

  const handlePlus = (): void => {
    enableAnimations(false);
    dispatch(plusProduct(cartItem));
  };

  const handleSubstract = (): void => {
    enableAnimations(false);
    dispatch(substractProduct(cartItem));
  };

  const handleDeleteProduct = (): void => {
    enableAnimations(true);
    setCart(cart.filter(item => item.id !== cartItem.id));
  };

  return (
    <CartProductItemContainer>
      <CartProductItemDetails>
        <Link to={linkToProduct}>
          <ImageBox
            src={images[0]}
            size="10rem"
          />
        </Link>
        <ProductInfoContainer>
          <Typography.Title
            level={5}
            className="product-name"
          >
            <Link to={linkToProduct}>{name}</Link>
          </Typography.Title>
          <Typography.Text className="size-color">
            {sizeColorProdcut}
          </Typography.Text>
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
      </CartProductItemDetails>
      <CartProductItemAction>
        <button
          className="delete-btn"
          onClick={handleDeleteProduct}
        >
          <Icon
            name="trash"
            width="18"
            height="20"
          />
        </button>
        <QuantityBox
          plusIcon={
            <Icon
              name="plus"
              width="12"
              height="12"
            />
          }
          substractIcon={
            <Icon
              name="substract"
              width="12"
              height="2"
            />
          }
          initialValue={cartItem.quantity}
          quantityClassName="quantity"
          containerClassName="quantity-box"
          btnClassName="quantity-btn"
          handlePlus={handlePlus}
          handleSubtract={handleSubstract}
        />
      </CartProductItemAction>
    </CartProductItemContainer>
  );
};

export default CartProductItemMobile;
