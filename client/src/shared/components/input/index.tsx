import styled from '@emotion/styled';
import { Input, InputProps } from 'antd';
import React from 'react';

interface MyInputProps extends InputProps {
  placeholderColor?: string
}

const MyInputStyles = styled(Input)<MyInputProps>(props => ({
  fontFamily: "'Oxygen', san-serif",
  padding: '1rem 1.2rem',
  fontSize: '1.4rem',
  '&::placeholder': {
    color: props.placeholderColor ?? props.theme.colors.textGray
  }
}));

const MyInput: React.FC<MyInputProps> = props => {
  return <MyInputStyles {...props} />;
};

export default MyInput;
