import React, { Fragment } from 'react';

import {
  CommerceSection,
  FeaturedProductSection,
  HeroSection
} from '../modules/home';

const HomePage: React.FC = () => {
  return (
    <Fragment>
      <HeroSection />
      <CommerceSection />
      <FeaturedProductSection />
    </Fragment>
  );
};

export default HomePage;
