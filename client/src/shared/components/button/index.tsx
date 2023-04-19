import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import React from 'react';

const ButtonStyles = styled(Button)(() => ({
  fontFamily: "'Oxygen', san-serif",
  boxShadow: 'none',
  color: '#FFFFFF'
}));

const MyButton: React.FC<ButtonProps> = props => {
  const { children, ...rest } = props;

  return <ButtonStyles {...rest}>{children}</ButtonStyles>;
};

export default MyButton;
