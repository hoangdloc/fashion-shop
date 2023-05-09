import type React from 'react';
import DecoratedHeading from './DecoratedHeading';
import ArticleHeading from './ArticleHeading';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children?: React.ReactNode
}

export { DecoratedHeading, ArticleHeading };
