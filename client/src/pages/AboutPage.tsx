import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import
{
  BannerSection,
  ContactUsSection,
  GallerySection,
  StorySection,
  TestimonialsSection
} from '~/modules/about';
import PartnerRibbon from '~/shared/components/layout/PartnerRibbon';
import ThanksPopup from '~/shared/components/thanks-popup';
import type { RootState } from '~/store/store';

const AboutPage: React.FC = () => {
  const showContactPopup = useSelector(
    (state: RootState) => state.general.showContactPopup
  );

  return (
    <Fragment>
      <BannerSection />
      <StorySection />
      <TestimonialsSection />
      <GallerySection />
      <ContactUsSection />
      <PartnerRibbon />
      {showContactPopup && (
        <ThanksPopup>
          Thanks you for sending us message. Your comments are always welcomed
          and noted by us. The answer will be sent to your email or phone as
          soon as possible.
        </ThanksPopup>
      )}
    </Fragment>
  );
};

export default AboutPage;
