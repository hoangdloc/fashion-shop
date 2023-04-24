import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import React from 'react';

interface MyBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  label?: React.ReactNode
}

const MyBadgeStyles = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})(props => ({
  padding: '0.4rem 1.2rem',
  backgroundColor: props.color,
  fontSize: '1.4rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: props.theme.colors.textWhite,
  userSelect: 'none'
}));

const MyBadge: React.FC<MyBadgeProps> = props => {
  const { label = 'Hot', color = '#C97178', ...rest } = props;

  return (
    <MyBadgeStyles
      color={color}
      {...rest}
    >
      {label}
    </MyBadgeStyles>
  );
};

export default MyBadge;
