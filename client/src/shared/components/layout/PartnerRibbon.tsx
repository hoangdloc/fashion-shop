import styled from '@emotion/styled';
import React from 'react';

import hausLogo from '../../../assets/svg/haus-logo.svg';
import loremipsum2Logo from '../../../assets/svg/logoipsum-logo-2.svg';
import loremipsumLogo from '../../../assets/svg/logoipsum-logo.svg';
import startupVenturelogo from '../../../assets/svg/startup-venture-logo.svg';

const PartnerRibbonStyles = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  img {
    display: block;
    padding: 3.8rem 7.5rem;
  }
`;

const imgItems = [
  {
    src: loremipsumLogo,
    alt: 'Lorem Ipsum'
  },
  {
    src: hausLogo,
    alt: 'Haus'
  },
  {
    src: loremipsum2Logo,
    alt: 'Lorem Ipsum2'
  },
  {
    src: startupVenturelogo,
    alt: 'Startup Venture'
  }
];

const PartnerRibbon: React.FC = () => {
  return (
    <PartnerRibbonStyles>
      {imgItems.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={item.alt}
          draggable={false}
        />
      ))}
    </PartnerRibbonStyles>
  );
};

export default PartnerRibbon;
