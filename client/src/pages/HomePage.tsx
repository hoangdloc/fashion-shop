import React, { Fragment, useLayoutEffect } from 'react';

import {
  BestSellerSection,
  BreakSection,
  CommerceSection,
  FeaturedProductSection,
  HeroSection,
  ShortIntroduceSection
} from '../modules/home';
import PartnerRibbon from '../shared/components/layout/PartnerRibbon';

const HomePage: React.FC = () => {
  useLayoutEffect(() => {
    document.title = 'Fashion';
  }, []);

  return (
    <Fragment>
      <HeroSection />
      <CommerceSection />
      <FeaturedProductSection />
      <BreakSection />
      <BestSellerSection />
      <ShortIntroduceSection />
      <PartnerRibbon />
    </Fragment>
  );
};

export default HomePage;
