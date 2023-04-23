import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { Input, InputProps } from 'antd';
import React from 'react';

import { theme } from '../../../config/theme';

interface MyInputProps extends InputProps {
  placeholderColor?: string
}

const MyInputStyles = styled(Input, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'placeholderColor'
})((props: MyInputProps) => ({
  fontFamily: "'Oxygen', san-serif",
  padding: '1rem 1.2rem',
  fontSize: '1.4rem',
  '&::placeholder': {
    color: props.placeholderColor ?? theme.colors.textGray
  }
}));

const MyInput: React.FC<MyInputProps> = props => {
  return <MyInputStyles {...props} />;
};

export default MyInput;
