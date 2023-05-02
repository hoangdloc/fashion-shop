import styled from '@emotion/styled';
import { Button, type ButtonProps } from 'antd';
import React from 'react';

const ButtonStyles = styled(Button)(props => ({
  fontFamily: "'Oxygen', san-serif",
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const MyButton: React.FC<ButtonProps> = props => {
  const { children, ...rest } = props;

  return <ButtonStyles {...rest}>{children}</ButtonStyles>;
};

export default MyButton;
