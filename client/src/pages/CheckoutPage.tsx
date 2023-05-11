import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  CheckoutBannerSection,
  CheckoutContentSection
} from '~/modules/checkout';
import MyBreadcrump from '~/shared/components/breadcrumb';
import ThanksPopup from '~/shared/components/thanks-popup';

import { type RootState } from '~/store/store';

const CheckoutPage: React.FC = () => {
  const showOrderingPopup = useSelector(
    (state: RootState) => state.general.showOrderingPopup
  );

  return (
    <Fragment>
      <MyBreadcrump />
      <CheckoutBannerSection />
      <CheckoutContentSection />
      {showOrderingPopup && (
        <ThanksPopup>
          <p>
            Thanks for your ordering. Your order is being confirmed and will be
            delivered as soon as possible. Don&lsquo;t forget to keep an eye on
            your phone and email to receive the latest information from us.
          </p>
          <p>Best regards!</p>
        </ThanksPopup>
      )}
    </Fragment>
  );
};

export default CheckoutPage;
