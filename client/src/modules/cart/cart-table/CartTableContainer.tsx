import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Divider, Empty, Typography } from 'antd';
import React, { Fragment, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';

import { CartRoute } from '~/config/route';
import { useCart } from '~/contexts/cart-context';
import { MyButton } from '~/shared/components/button';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { renderPrice } from '~/shared/utils/renderPrice';
import { updateProductToCart } from '~/store/cart/cartSlice';
import CartProductTableRow from './CartProductTableRow';

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
`;

const Table = styled.table`
  min-width: 100%;
  & > thead,
  tbody,
  tfoot {
    & > tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .product {
        text-align: left;
        width: 60%;
      }
      .quantity {
        text-align: center;
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .subtotal {
        text-align: right;
        width: 20%;
      }
      th {
        font-weight: 400;
        padding-bottom: 1.6rem;
        font-size: 1.6rem;
      }
    }
    &:not(:last-child) {
      border-bottom: 0.1rem solid ${props => props.theme.colors.horizontalColor};
    }
  }
  & > tfoot {
    & > tr {
      align-items: flex-start;
      & > td {
        padding: 2.4rem 0;
        .serve {
          font-size: 1.4rem;
          color: ${props => props.theme.colors.grayDark};
        }
        .total {
          font-size: 2.4rem;
          font-weight: 700;
        }
      }
    }
  }
`;

const ActionBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1.5rem;
  & > .ant-btn {
    height: 5.2rem;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    &.update-btn {
      padding: 1.5rem 3.4rem;
      border: 0.15rem solid ${props => props.theme.colors.primaryBlack};
      &:hover {
        color: ${props => props.theme.colors.textWhite};
        background-color: ${props => props.theme.colors.primaryBlack};
      }
    }
  }
`;

const CartTableContainer: React.FC = () => {
  const emotionTheme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [parent, enableAnimations] = useAutoAnimate();
  const { loading, fakeLoading } = useFakeLoading();
  const { cart } = useCart();
  const cartTotal = useMemo(() => {
    return cart.reduce((total, current) => {
      const { quantity, clothes } = current;
      const { actualPrice } = renderPrice(
        clothes.price,
        clothes.salePercent,
        clothes.status
      );
      return total + quantity * +actualPrice;
    }, 0);
  }, [cart]);

  const handleUpdateCart = async (): Promise<void> => {
    await fakeLoading();
    dispatch(updateProductToCart(cart));
    await Swal.fire({
      title: 'Success!',
      text: 'Updated cart successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: emotionTheme.colors.primaryBlack
    });
  };

  const handleProceesToCheckout = (): void => {
    navigate(CartRoute.CHECKOUT);
  };

  return (
    <CartTableContainerStyles>
      {cart.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th className="product">Product</th>
              <th className="quantity">Quantity</th>
              <th className="subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody ref={parent}>
            {cart.map(item => (
              <CartProductTableRow
                key={v4()}
                cartItem={item}
                enableAnimations={enableAnimations}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Typography.Text className="serve">
                  It is our pleasure to serve you!
                </Typography.Text>
              </td>
              <td>
                <Typography.Text className="total">
                  {cartTotal.toFixed(2)} $
                </Typography.Text>
              </td>
            </tr>
          </tfoot>
        </Table>
      )}
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
          loading={loading}
          className="update-btn"
        >
          Update cart
        </MyButton>
        <MyButton
          onClick={handleProceesToCheckout}
          type="primary"
        >
          Process to checkout
        </MyButton>
      </ActionBox>
    </CartTableContainerStyles>
  );
};

export default CartTableContainer;
