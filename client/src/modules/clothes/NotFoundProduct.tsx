import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../config/route';

const NotFoundProductStyles = styled('section')(props => ({
  height: 'calc(100vh - 14.2rem - 31.5rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: props.theme.colors.primaryBlack,
  textAlign: 'center'
}));

const NotFoundProduct: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <NotFoundProductStyles>
      <Typography.Title style={{ fontSize: '4.8rem', marginTop: '-1rem' }}>Oops!</Typography.Title>
      <Typography.Text style={{ fontSize: '2.4rem', marginBottom: '1.6rem' }}>
        404 - Product Not Found
      </Typography.Text>
      <Typography.Text
        style={{
          fontSize: '1.4rem',
          width: '48rem',
          color: emotionTheme.colors.textGray,
          marginBottom: '1.4rem'
        }}
      >
        The product you looking for might have been removed had its name changed or
        is temporaily unvailable.
      </Typography.Text>
      <Link
        style={{
          textTransform: 'uppercase',
          textDecoration: 'underline',
          textUnderlineOffset: '0.6rem',
          fontSize: '1.4rem'
        }}
        to={AppRoute.HOME}
      >
        Go to homepage
      </Link>
    </NotFoundProductStyles>
  );
};

export default NotFoundProduct;
