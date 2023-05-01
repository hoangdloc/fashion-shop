import React, { Fragment } from 'react';

import {
  BannerSection,
  GallerySection,
  StorySection,
  TestimonialsSection
} from '../modules/about';
import PartnerRibbon from '../shared/components/layout/PartnerRibbon';

const AboutPage: React.FC = () => {
  return (
    <Fragment>
      <BannerSection />
      <StorySection />
      <TestimonialsSection />
      <GallerySection />
      <PartnerRibbon />
    </Fragment>
  );
};

export default AboutPage;
