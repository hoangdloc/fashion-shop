import React, { Fragment, useLayoutEffect } from 'react';

import { CartBannerSection, CartProductTable } from '~/modules/cart';
import MyBreadcrump from '~/shared/components/breadcrumb';

const CartPage: React.FC = () => {
  useLayoutEffect(() => {
    document.title = 'Fashion | My Cart';
  }, []);

  return (
    <Fragment>
      <MyBreadcrump />
      <CartBannerSection />
      <CartProductTable />
    </Fragment>
  );
};

export default CartPage;
