import React, { Fragment } from 'react';

import { CheckoutBannerSection, CheckoutContentSection } from '~/modules/checkout';
import MyBreadcrump from '~/shared/components/breadcrumb';

const CheckoutPage: React.FC = () => {
  return (
    <Fragment>
      <MyBreadcrump />
      <CheckoutBannerSection />
      <CheckoutContentSection />
    </Fragment>
  );
};

export default CheckoutPage;
