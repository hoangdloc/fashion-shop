import React, { Fragment } from 'react';

import { CommerceSection, HeroSection } from '../modules/home';

const HomePage: React.FC = () => {
  return (
    <Fragment>
      <HeroSection />
      <CommerceSection />
    </Fragment>
  );
};

export default HomePage;
