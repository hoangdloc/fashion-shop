import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { Input, type InputProps } from 'antd';
import React from 'react';

interface MyInputProps extends InputProps {
  placeholderColor?: string
}

const MyOutlinedInputStyles = styled(Input, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'placeholderColor'
})<MyInputProps>(props => ({
  fontFamily: props.theme.fontFamily.Oxygen,
  padding: '1rem 1.2rem',
  fontSize: '1.4rem',
  '&::placeholder': {
    color: props.placeholderColor ?? props.theme.colors.textGray
  }
}));

const MyOutlinedInput: React.FC<MyInputProps> = props => {
  return <MyOutlinedInputStyles {...props} />;
};

export default MyOutlinedInput;
