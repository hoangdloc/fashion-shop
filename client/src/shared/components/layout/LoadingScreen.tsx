import styled from '@emotion/styled';
import React from 'react';
import { Spinner } from '~/shared/components/loader';

const LoadingScreenStyles = styled('section')(() => ({
  height: 'calc(100vh - 14.2rem - 31.5rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const LoadingScreen: React.FC = () => {
  return (
    <LoadingScreenStyles>
      <Spinner size={96} />
    </LoadingScreenStyles>
  );
};

export default LoadingScreen;
