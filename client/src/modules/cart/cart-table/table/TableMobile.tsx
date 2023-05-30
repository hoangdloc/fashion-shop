import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useImperativeHandle } from 'react';
import { v4 } from 'uuid';

import { useCart } from '~/contexts/cart-context';
import CartProductItemMobile from '../CartProductItemMobile';
import { Divider, Typography } from 'antd';
import { localePrice } from '~/shared/utils/renderPrice';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const CartTotalPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  & > .serve {
    font-size: 1.4rem;
    color: ${props => props.theme.colors.grayDark};
  }
  & > .total {
    font-size: 2rem;
    font-weight: 700;
  }
`;

const TableMobile = React.forwardRef((_, ref) => {
  const { cart, cartTotal } = useCart();
  const [parent, enableAnimations] = useAutoAnimate();

  useImperativeHandle(
    ref,
    () => {
      return {
        disableAnimation: () => {
          enableAnimations(false);
        }
      };
    },
    [enableAnimations]
  );

  return (
    <Container>
      <Table ref={parent}>
        {cart.map(item => (
          <CartProductItemMobile
            key={v4()}
            cartItem={item}
            enableAnimations={enableAnimations}
          />
        ))}
      </Table>
      <Divider />
      <CartTotalPriceContainer>
        <Typography.Text className="serve">
          It is our pleasure to serve you!
        </Typography.Text>
        <Typography.Text className="total">
          {localePrice(cartTotal.toFixed(2))} $
        </Typography.Text>
      </CartTotalPriceContainer>
    </Container>
  );
});

TableMobile.displayName = 'TableMobile';

export default TableMobile;
