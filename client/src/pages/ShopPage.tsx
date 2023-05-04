import React, { Fragment } from 'react';
import MyBreadcrump from '../shared/components/breadcrumb';
import { ShopBannerSection } from '../modules/shop';

const ShopPage: React.FC = () => {
  return (
    <Fragment>
      <MyBreadcrump />
      <ShopBannerSection />
    </Fragment>
  );
};

export default ShopPage;
