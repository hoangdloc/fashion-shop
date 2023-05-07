import styled from '@emotion/styled';
import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

const MyLinkButtonStyle = styled(Link)(props => ({
  color: props.theme.colors.textWhite,
  fontSize: '1.6rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  border: `0.2rem solid ${props.theme.colors.textWhite}`,
  padding: '1.5rem 2.2rem',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: props.theme.colors.textWhite,
    color: props.theme.colors.primaryBlack
  }
}));

const MyLinkButton: React.FC<LinkProps> = ({ children, ...rest }) => {
  return <MyLinkButtonStyle {...rest}>{children}</MyLinkButtonStyle>;
};

export default MyLinkButton;
