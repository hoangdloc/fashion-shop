import React from 'react';
import styled from '@emotion/styled';

import type { HeadingProps } from '.';

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
  @media ${props => props.theme.devices.mobile} {
    font-size: 1.6rem;
    letter-spacing: 0.08rem;
    &::after {
      width: 4.8rem;
    }
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
