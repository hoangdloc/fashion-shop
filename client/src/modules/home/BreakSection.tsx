import styled from '@emotion/styled';
import React from 'react';

import background from '../../assets/images/break-section-bg.png';

const BreakSectionStyles = styled('section')(props => ({
  height: '46rem'
}));

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
