import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useLayoutEffect } from 'react';

const ErrorPageStyles = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgWhite};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  .ant-typography {
    font-family: ${props => props.theme.fontFamily.Oxygen};
  }
`;

const ErrorPage: React.FC = () => {
  const theme = useTheme();

  useLayoutEffect(() => {
    document.title = 'Fashion | Error';
  }, []);

  return (
    <ErrorPageStyles>
      <Typography.Title style={{ fontSize: '4.8rem' }}>Oops!</Typography.Title>
      <Typography.Text style={{ fontSize: '2.4rem' }}>
        Sorry, an unexpected error has occured
      </Typography.Text>
      <Typography.Text
        style={{
          fontSize: '2rem',
          fontStyle: 'italic',
          color: theme.colors.textGray
        }}
      >
        Not found
      </Typography.Text>
    </ErrorPageStyles>
  );
};

export default ErrorPage;
