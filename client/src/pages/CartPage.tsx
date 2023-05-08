import React, { Fragment } from 'react';

import { CartBannerSection, CartProductTable } from '~/modules/cart';
import MyBreadcrump from '~/shared/components/breadcrumb';

const CartPage: React.FC = () => {
  return (
    <Fragment>
      <MyBreadcrump />
      <CartBannerSection />
      <CartProductTable />
    </Fragment>
  );
};

export default CartPage;
