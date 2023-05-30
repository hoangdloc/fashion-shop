import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Divider, Empty } from 'antd';
import React, { Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AppRoute, CartRoute } from '~/config/route';
import { useCart } from '~/contexts/cart-context';
import { MyButton } from '~/shared/components/button';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { useMedia } from '~/shared/hooks/useMedia';
import { updateProductToCart } from '~/store/cart/cartSlice';
import { TableDesktop, TableMobile, type TableRef } from './table';

const CartTableContainerStyles = styled.div`
  min-width: 100%;
  min-height: 20vh;
  padding: 4rem 9.5rem;
  background-color: ${props => props.theme.colors.textWhite};
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${props => props.theme.devices.mobile} {
    padding: 2.4rem;
  }
`;

const ActionBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1.5rem;
  @media ${props => props.theme.devices.mobile} {
    flex-direction: column;
    gap: 1.8rem;
  }
  & > .ant-btn {
    height: 5.2rem;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
      height: 4rem;
    }
    &.update-btn {
      padding: 1.5rem 3.4rem;
      border: 0.15rem solid ${props => props.theme.colors.primaryBlack};
      &:hover {
        color: ${props => props.theme.colors.textWhite};
        background-color: ${props => props.theme.colors.primaryBlack};
      }
      @media ${props => props.theme.devices.mobile} {
        height: 4rem;
        width: 100%;
      }
    }
    &.checkout-btn,
    &.back-btn {
      padding: 1.5rem 4rem;
      @media ${props => props.theme.devices.mobile} {
        width: 100%;
      }
    }
  }
`;

const CartTableContainer: React.FC = () => {
  const emotionTheme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: updateLoading, fakeLoading: fakeUpdateLoading } =
    useFakeLoading();
  const { loading: checkoutLoading, fakeLoading: fakeCheckoutLoading } =
    useFakeLoading();
  const { cart } = useCart();

  const isDesktop = useMedia<boolean>(
    ['(min-width: 37.5em)', '(min-width: 0)'],
    [true, false],
    true
  );
  const tableDekstopRef = useRef<TableRef>(null);
  const tableMobileRef = useRef<TableRef>(null);

  const handleUpdateCart = async (): Promise<void> => {
    tableDekstopRef.current?.disableAnimation();
    tableMobileRef.current?.disableAnimation();
    await fakeUpdateLoading();
    dispatch(updateProductToCart(cart));
    await Swal.fire({
      title: 'Success!',
      text: 'Updated cart successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: emotionTheme.colors.primaryBlack
    });
  };

  const handleProceesToCheckout = async (): Promise<void> => {
    tableDekstopRef.current?.disableAnimation();
    tableMobileRef.current?.disableAnimation();
    await fakeCheckoutLoading();
    dispatch(updateProductToCart(cart));
    navigate(CartRoute.CHECKOUT);
  };

  const handlebackToShopping = (): void => {
    navigate(AppRoute.SHOP);
  };

  return (
    <CartTableContainerStyles>
      {isDesktop && cart.length > 0 && <TableDesktop ref={tableDekstopRef} />}
      {!isDesktop && cart.length > 0 && <TableMobile ref={tableMobileRef} />}
      {cart.length <= 0 && (
        <Fragment>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <Divider />
        </Fragment>
      )}
      <ActionBox>
        <MyButton
          onClick={() => {
            void handleUpdateCart();
          }}
          loading={updateLoading}
          className="update-btn"
        >
          Update cart
        </MyButton>
        {cart.length > 0 && (
          <MyButton
            onClick={() => {
              void handleProceesToCheckout();
            }}
            type="primary"
            loading={checkoutLoading}
            className="checkout-btn"
          >
            Process to checkout
          </MyButton>
        )}
        {cart.length <= 0 && (
          <MyButton
            onClick={handlebackToShopping}
            type="primary"
            className="back-btn"
          >
            Keep shoping
          </MyButton>
        )}
      </ActionBox>
    </CartTableContainerStyles>
  );
};

export default CartTableContainer;
