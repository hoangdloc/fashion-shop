import styled from '@emotion/styled';
import React from 'react';

import type { HeadingProps } from '.';

const ArticleHeadingStyles = styled.div`
  font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
  font-weight: 400;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.primaryBlack};
  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media ${props => props.theme.devices.mobile} {
    font-size: 1.8rem;
    gap: 1.2rem;
  }
`;

const DecoratedLine = styled.div`
  width: 3.6rem;
  height: 0.15rem;
  background-color: ${props => props.theme.colors.primaryBlack};
  @media ${props => props.theme.devices.mobile} {
    width: 3rem;
  }
`;

const ArticleHeading: React.FC<HeadingProps> = ({
  level = 'h1',
  children,
  ...rest
}) => {
  const Heading = level as keyof JSX.IntrinsicElements;

  return (
    <ArticleHeadingStyles
      as={Heading}
      {...rest}
    >
      <DecoratedLine />
      <span>{children}</span>
    </ArticleHeadingStyles>
  );
};

export default ArticleHeading;
