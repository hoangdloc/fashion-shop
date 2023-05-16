import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Modal, Select, Typography } from 'antd';
import { type DefaultOptionType } from 'antd/es/select';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';

import { renderColorBox } from '~/shared/utils/renderColorBox';
import { setClothesPopup } from '~/store/clothes/clothesSlice';

import { Status } from '~/shared/@types/status';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { addProductToCart } from '~/store/cart/cartSlice';
import { MyButton } from '../button';

import { type Color } from '~/shared/@types/category';
import { type Size } from '~/shared/@types/size';
import { type RootState } from '~/store/store';

const ClothesPopupStyles = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    min-height: 30rem;
    & > .ant-modal-body {
      height: 100%;
    }
  }
  .ant-select {
    & > .ant-select-selector > .ant-select-selection-item {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
    }
  }
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.8rem;
  padding: 1.6rem 3.5rem;
  & > .ant-typography {
    margin: 0;
    font-size: 2.4rem;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & > .add-to-cart-btn {
    text-transform: uppercase;
    margin-top: 1.2rem;
    height: 4rem;
    font-size: 1.6rem;
    font-weight: 700;
    padding: 1.5rem 3.5rem;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  & > .ant-typography {
    margin: 0;
    font-family: ${props => props.theme.fontFamily.DmSans};
  }
`;

const SelectItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  & > .ant-typography {
    font-size: 1.2rem;
    color: inherit;
  }
`;

const ColorBox = styled.div<{ boxColor: string }>`
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${props => props.boxColor};
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
`;

const SizeBox = styled.div`
  background-color: #f4f5f5;
  color: ${props => props.theme.colors.primaryBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  width: 2.8rem;
  height: 2.8rem;
`;

const ClothesPopup: React.FC = () => {
  const emotionTheme = useTheme();
  const dispatch = useDispatch();
  const clothesModal = useSelector(
    (state: RootState) => state.clothes.clothesPopup
  );
  const currentClothes = useSelector(
    (state: RootState) => state.clothes.currentClothes
  );
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const [pickedColor, setPickedColor] = useState<Color | undefined>(undefined);
  const [pickedSize, setPickedSize] = useState<Size | undefined>(undefined);
  const { loading, fakeLoading } = useFakeLoading();
  const availableColors = currentClothes?.category.slice(2) as Color[];
  const availableSizes = currentClothes?.sizes as Size[];

  useLayoutEffect(() => {
    if (availableColors != null) {
      setPickedColor(availableColors[0]);
    }
    if (availableSizes != null) {
      setPickedSize(availableSizes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentClothes)]);

  const handleCancel = (): void => {
    dispatch(setClothesPopup(false));
  };

  const colorSelectOptions: DefaultOptionType[] =
    availableColors?.map(color => ({
      id: color,
      value: color,
      label: (
        <SelectItemContainer>
          <ColorBox boxColor={renderColorBox(color)} />
          <Typography.Text>{color}</Typography.Text>
        </SelectItemContainer>
      )
    })) ?? [];

  const sizeSelectOptions: DefaultOptionType[] =
    availableSizes?.map(size => ({
      id: size,
      value: size,
      label: (
        <SelectItemContainer>
          <SizeBox>{size}</SizeBox>
          <Typography.Text>{size}</Typography.Text>
        </SelectItemContainer>
      )
    })) ?? [];

  const onColorChange = (value: Color): void => {
    setPickedColor(value);
  };

  const onSizeChange = (value: Size): void => {
    setPickedSize(value);
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
      dispatch(setClothesPopup(false));
      return;
    }
    await fakeLoading();
    dispatch(
      addProductToCart({
        id: v4(),
        quantity: 1,
        userId: currentUser.id,
        clothes: currentClothes,
        color: pickedColor ?? availableColors[0],
        size: pickedSize ?? availableSizes[0]
      })
    );
    dispatch(setClothesPopup(false));
    toast.success(`1x ${currentClothes.name} added to cart`);
  };

  if (
    currentClothes == null ||
    availableColors == null ||
    availableSizes == null
  ) {
    return null;
  }

  return (
    <ClothesPopupStyles
      width="36rem"
      open={clothesModal}
      onCancel={handleCancel}
      footer={null}
      centered
      closable={false}
    >
      <PopupContainer>
        <Typography.Title level={2}>{currentClothes.name}</Typography.Title>
        <SelectContainer>
          <Typography.Title level={5}>Select color</Typography.Title>
          <Select
            value={pickedColor}
            size="large"
            options={colorSelectOptions}
            dropdownStyle={{ padding: 0 }}
            onChange={onColorChange}
            loading={loading}
          />
        </SelectContainer>
        <SelectContainer>
          <Typography.Title level={5}>Select size</Typography.Title>
          <Select
            value={pickedSize}
            size="large"
            options={sizeSelectOptions}
            dropdownStyle={{ padding: 0 }}
            onChange={onSizeChange}
            loading={loading}
          />
        </SelectContainer>
        <MyButton
          type="primary"
          block
          className="add-to-cart-btn"
          onClick={() => {
            void handleAddToCart();
          }}
          loading={loading}
        >
          Add to cart
        </MyButton>
      </PopupContainer>
    </ClothesPopupStyles>
  );
};

export default ClothesPopup;
