import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/config/route';

const NotFoundPageStyles = styled.section`
  height: calc(100vh - 14.2rem - 31.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primaryBlack};
  text-align: center;
  & > .title {
    font-size: 4.8rem;
    margin-top: -1rem;
  }
  & > .status {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }
  & > .description {
    font-size: 1.4rem;
    width: 48rem;
    color: ${props => props.theme.colors.textGray};
    margin-bottom: 1.4rem;
  }
  & > .homepage-link {
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 0.6rem;
    font-size: 1.4rem;
  }
  @media ${props => props.theme.devices.mobile} {
    height: calc(100vh - 6.4rem - 24.8rem);
    & > .title {
      font-size: 3.2rem;
      margin-top: 0;
    }
    & > .status {
      font-size: 2rem;
      margin-bottom: 1.4rem;
    }
    & > .description {
      font-size: 1.2rem;
      width: 32.8rem;
      margin-bottom: 1.6rem;
    }
    & > .homepage-link {
      font-size: 1.2rem;
    }
  }
`;

const NotFoundPage: React.FC = () => {
  useLayoutEffect(() => {
    document.title = 'Fashion | Not Found';
  }, []);

  return (
    <NotFoundPageStyles>
      <Typography.Title className="title">Oops!</Typography.Title>
      <Typography.Text className="status">404 - Page Not Found</Typography.Text>
      <Typography.Text className="description">
        The page you looking for might have been removed had its name changed or
        is temporaily unvailable.
      </Typography.Text>
      <Link
        className="homepage-link"
        to={AppRoute.HOME}
      >
        Go to homepage
      </Link>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
