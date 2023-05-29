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
  @media ${props => props.theme.devices.mobile} {
    gap: 1.6rem;
  }
  .ant-typography {
    font-family: ${props => props.theme.fontFamily.Oxygen};
    margin: 0;
  }
  .status {
    font-size: 4.8rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 3.2rem;
    }
  }
  .description {
    font-size: 2.4rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.8rem;
    }
  }
  .subtitle {
    font-size: 2rem;
    font-style: italic;
    color: ${props => props.theme.colors.textGray};
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.6rem;
    }
  }
`;

const ErrorPage: React.FC = () => {
  useLayoutEffect(() => {
    document.title = 'Fashion | Error';
  }, []);

  return (
    <ErrorPageStyles>
      <Typography.Title className="status">Oops!</Typography.Title>
      <Typography.Text className="description">
        Sorry, an unexpected error has occured
      </Typography.Text>
      <Typography.Text className="subtitle">Not found</Typography.Text>
    </ErrorPageStyles>
  );
};

export default ErrorPage;
