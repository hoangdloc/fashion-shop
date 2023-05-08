import React, { Fragment } from 'react';

import MyBreadcrump from '~/shared/components/breadcrumb';
import { ShopBannerSection } from '~/modules/shop';
import AllProductSection from '~/modules/shop/all-products';

const ShopPage: React.FC = () => {
  return (
    <Fragment>
      <MyBreadcrump />
      <ShopBannerSection />
      <AllProductSection />
    </Fragment>
  );
};

export default ShopPage;
