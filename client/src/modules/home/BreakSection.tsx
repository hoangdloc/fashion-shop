import styled from '@emotion/styled';
import React from 'react';

import background from '~/assets/images/break-section-bg.png';

const BreakSectionStyles = styled.section`
  height: 46rem;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media ${props => props.theme.devices.mobile} {
    height: 32rem;
  }
`;

const BreakSection: React.FC = () => {
  return (
    <BreakSectionStyles>
      <img
        src={background}
        alt="Autumn Lookbook"
        draggable={false}
      />
    </BreakSectionStyles>
  );
};

export default BreakSection;
