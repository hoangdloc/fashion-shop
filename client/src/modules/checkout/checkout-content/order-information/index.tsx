import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ArticleHeading } from '~/shared/components/heading';
import { getCartItemsSelector } from '~/store/cart/cartSlice';
import OrderItem from './OrderItem';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/config/route';
import { toast } from 'react-toastify';

const Container = styled.aside`
  width: 36.3rem;
  background-color: ${props => props.theme.colors.textWhite};
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  padding: 3.2rem 4rem 4rem 4rem;
`;

const ProductContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  .ant-typography {
    margin: 0;
  }
`;

const ProductListStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const OrderInformation: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(getCartItemsSelector);

  useEffect(() => {
    if (cartItems.length <= 0) {
      toast.warning('You have no product to checkout 🤨', {
        toastId: 'order-empty'
      });
      navigate(AppRoute.SHOP);
    }
  }, [cartItems]);

  return (
    <Container>
      <ArticleHeading
        level="h3"
        style={{ marginBottom: '2.7rem' }}
      >
        Your order
      </ArticleHeading>
      <ProductContainerStyles>
        <Typography.Title level={5}>Products</Typography.Title>
        <ProductListStyles>
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
        </ProductListStyles>
      </ProductContainerStyles>
    </Container>
  );
};

export default OrderInformation;
