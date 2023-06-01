import styled from '@emotion/styled';
import React from 'react';

interface MyBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  label?: React.ReactNode
}

const MyBadgeStyles = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1.2rem;
  background-color: ${props => props.color};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textWhite};
  user-select: none;
  width: max-content;
`;

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
