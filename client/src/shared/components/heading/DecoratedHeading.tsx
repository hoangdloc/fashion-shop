import React from 'react';
import type { HeadingProps } from '.';
import styled from '@emotion/styled';

const DecoratedHeadingStyles = styled.div`
  font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.primaryBlack};
  margin: 0 0 1.2rem 0;
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 0.15rem;
    width: 5.2rem;
    background-color: ${props => props.theme.colors.horizontalColor};
    bottom: -1.2rem;
    transform: translateY(-50%);
  }
`;

const DecoratedHeading: React.FC<HeadingProps> = ({
  level = 'h1',
  children,
  ...rest
}) => {
  const Heading = level as keyof JSX.IntrinsicElements;

  return (
    <DecoratedHeadingStyles
      as={Heading}
      {...rest}
    >
      {children}
    </DecoratedHeadingStyles>
  );
};

export default DecoratedHeading;
