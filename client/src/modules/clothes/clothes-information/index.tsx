import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';

import MyBadge from '~/shared/components/badge';
import { MyButton } from '~/shared/components/button';
import { PlusIcon, SubstractIcon } from '~/shared/components/icon';
import QuantityBox from '~/shared/components/quantity-box';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { renderBadge } from '~/shared/utils/renderBadge';
import { renderPrice } from '~/shared/utils/renderPrice';
import ClothesDetails from './ClothesDetails';
import ClothesInformationSkeleton from './ClothesInformationSkeleton';
import ClothesSelectCategory from './clothes-select-category';

import { useClothesDetails } from '~/contexts/clothes-details-context';
import type { Color } from '~/shared/@types/category';
import { Status } from '~/shared/@types/status';
import { addProductToCart } from '~/store/cart/cartSlice';
import type { RootState } from '~/store/store';

const ClothesInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > .product-overview {
    font-weight: 300;
    font-size: 1.6rem;
    color: ${props => props.theme.colors.textSubtitle};
    margin-bottom: 4rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
      margin-bottom: 3.2rem;
    }
  }
  @media ${props => props.theme.devices.mobile} {
    padding: 0 2.4rem;
  }
`;

const ClothesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 1.2rem;
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
  & > .product-name {
    margin: 0;
    font-weight: 400;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    font-size: 2.8rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2rem;
      letter-spacing: 0.1rem;
    }
  }
  & > .product-badge {
    height: 100%;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.2rem;
    }
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2rem;
  @media ${props => props.theme.devices.mobile} {
    margin-bottom: 1.6rem;
  }
  & > .ant-typography {
    font-size: 3.2rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2.4rem;
    }
  }
`;

const AddToCartBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 2.8rem;
  @media ${props => props.theme.devices.mobile} {
    margin-bottom: 2.4rem;
  }
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
      @media ${props => props.theme.devices.mobile} {
        width: 4rem;
        height: 4rem;
        padding: 1.2rem;
      }
    }
    & > .quantity-text {
      height: 5.2rem;
      width: 8.8rem;
      background-color: #f9f9f9;
      font-size: 1.6rem;
      @media ${props => props.theme.devices.mobile} {
        height: 4rem;
        width: 6.6rem;
        font-size: 1.4rem;
      }
    }
  }
  & > .action-btn {
    height: 5.2rem;
    padding: 1.5rem 3.5rem;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    @media ${props => props.theme.devices.mobile} {
      height: 4rem;
      padding: 0 2rem;
      font-size: 1.4rem;
    }
  }
`;

const ClothesInformation: React.FC = () => {
  const dispatch = useDispatch();
  const emotionTheme = useTheme();
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const { currentClothes, pickedSize, pickedColor } = useClothesDetails();
  const [quantity, setQuantity] = useState<number>(1);
  const { loading, fakeLoading } = useFakeLoading();

  const handleAddQuantity = (): void => {
    setQuantity(prev => prev + 1);
  };

  const handleSubstractQuantity = (): void => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async (): Promise<void> => {
    if (currentUser == null || currentClothes == null) return;
    if (currentClothes.status === Status.SOLD_OUT) {
      void Swal.fire({
        title: 'Sold out!',
        text: 'Please select other available products',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: emotionTheme.colors.primaryBlack
      });
      return;
    }
    await fakeLoading();
    dispatch(
      addProductToCart({
        id: v4(),
        quantity,
        userId: currentUser.id,
        clothes: currentClothes,
        color: pickedColor ?? (currentClothes.category.slice(2)[0] as Color),
        size: pickedSize ?? currentClothes.sizes[0]
      })
    );
    toast.success(`${quantity}x ${currentClothes.name} added to cart`);
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
          onClick={() => {
            void handleAddToCart();
          }}
          loading={loading}
        >
          Add to cart
        </MyButton>
      </AddToCartBox>
      <ClothesSelectCategory
        sizes={sizes}
        colors={category.slice(2) as Color[]}
      />
      <ClothesDetails
        description={description}
        sizes={sizes}
        category={category}
      />
    </ClothesInformationContainer>
  );
};

export default ClothesInformation;
