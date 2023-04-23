import styled from '@emotion/styled';
import React from 'react';

import { Spinner } from '../shared/components/loader';

const LoadingPageStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LoadingPage: React.FC = () => {
  return (
    <LoadingPageStyles>
      <Spinner size={128} />
    </LoadingPageStyles>
  );
};

export default LoadingPage;
