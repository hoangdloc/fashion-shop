import styled from '@emotion/styled';
import { Empty, Typography } from 'antd';
import React, { Fragment, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoute } from '~/config/route';
import { useCheckout } from '~/contexts/checkout-context';
import { MyButton } from '~/shared/components/button';
import { ArticleHeading } from '~/shared/components/heading';
import { localePrice, renderPrice } from '~/shared/utils/renderPrice';
import { getCartItemsSelector } from '~/store/cart/cartSlice';
import OrderItem from './OrderItem';

const Container = styled.aside`
  width: 36.3rem;
  background-color: ${props => props.theme.colors.textWhite};
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  padding: 3.2rem 4rem 4rem 4rem;
  & > .order-btn,
  .back-btn {
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    padding: 1.5rem 0;
    height: 5.2rem;
  }
`;

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 100%;
  margin-bottom: 3.7rem;
`;

const OrderContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  .ant-typography {
    margin: 0;
    &.title {
      font-size: 1.6rem;
    }
  }
`;

const OrderListStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SummaryContainerStyles = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & > .ant-typography {
    margin: 0;
  }
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .ant-typography {
      font-size: 1.4rem;
    }
  }
`;

const Divider = styled.div`
  border-bottom: 0.15rem dashed ${props => props.theme.colors.horizontalColor};
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .ant-typography {
    font-weight: 700;
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

const SHIPPING_COST = 25;

const OrderInformation: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useCheckout();
  const cartItems = useSelector(getCartItemsSelector);
  const orderSubtotal = useMemo(() => {
    return cartItems.reduce((total, current) => {
      const { quantity, clothes } = current;
      const { actualPrice } = renderPrice(
        clothes.price,
        clothes.salePercent,
        clothes.status
      );
      return total + quantity * +actualPrice;
    }, 0);
  }, [cartItems]);

  useLayoutEffect(() => {
    if (cartItems.length <= 0) {
      toast.warning('You have no product to checkout 🤨', {
        toastId: 'order-empty'
      });
      navigate(AppRoute.SHOP);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackToShopClick = (): void => {
    navigate(AppRoute.SHOP);
  };

  return (
    <Container>
      <ArticleHeading
        level="h3"
        style={{ marginBottom: '2.7rem' }}
      >
        Your order
      </ArticleHeading>
      {cartItems.length > 0 && (
        <Fragment>
          <OrderInfoContainer>
            <OrderContainerStyles>
              <Typography.Title
                className="title"
                level={4}
              >
                Products
              </Typography.Title>
              <OrderListStyles>
                {cartItems.map((item, index) => (
                  <OrderItem
                    key={index}
                    imageSrc={item.clothes.images[0]}
                    title={item.clothes.name}
                    price={item.clothes.price}
                    salePercent={item.clothes.salePercent}
                    status={item.clothes.status}
                    gender={item.clothes.category[0]}
                    slug={item.clothes.slug}
                    quantity={item.quantity}
                    pickedColor={item.color}
                    pickedSize={item.size}
                  />
                ))}
              </OrderListStyles>
            </OrderContainerStyles>
            <Divider />
            <OrderContainerStyles>
              <Typography.Title
                className="title"
                level={4}
              >
                Order summary
              </Typography.Title>
              <SummaryContainerStyles>
                <li>
                  <Typography.Text>Subtotal</Typography.Text>
                  <Typography.Text>
                    {localePrice(orderSubtotal.toFixed(2))} $
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>Shipping</Typography.Text>
                  <Typography.Text>
                    {localePrice(SHIPPING_COST.toFixed(2))} $
                  </Typography.Text>
                </li>
              </SummaryContainerStyles>
            </OrderContainerStyles>
            <Divider />
            <TotalPrice>
              <Typography.Text>Total</Typography.Text>
              <Typography.Text>
                {localePrice((orderSubtotal + 25).toFixed(2))} $
              </Typography.Text>
            </TotalPrice>
          </OrderInfoContainer>
          <MyButton
            block
            type="primary"
            className="order-btn"
            form="checkout-form"
            htmlType="submit"
            loading={loading}
          >
            Confirm order
          </MyButton>
        </Fragment>
      )}
      {cartItems.length <= 0 && (
        <Fragment>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <MyButton
            block
            type="primary"
            className="back-btn"
            onClick={handleBackToShopClick}
          >
            Back to shop
          </MyButton>
        </Fragment>
      )}
    </Container>
  );
};

export default OrderInformation;
