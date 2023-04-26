import { Global, useTheme } from '@emotion/react';
import React from 'react';

const EmotionGlobalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        html: {
          fontSize: '62.5%'
        },
        body: {
          fontFamily: "'Oxygen', sans-serif",
          lineHeight: 1,
          fontWeight: 400,
          color: theme.colors.primaryBlack
        },
        'a, a:link, a:visited': {
          color: 'inherit'
        },
        'a:hover, a:active': {
          color: theme.colors.secondaryRed
        },
        ul: {
          margin: 0,
          listStyleType: 'none'
        },
        li: {
          textAlign: 'start'
        },
        label: {
          cursor: 'pointer'
        },
        hr: {
          border: `0.05rem solid ${theme.colors.horizontalColor}`
        },
        '.ant-typography': {
          margin: 0
        },
        '@keyframes pulse': {
          '0%': {
            width: '0.8rem'
          },
          '50%': {
            width: '2.8rem'
          },
          '75%': {
            width: '3.8rem'
          }
        }
      }}
    />
  );
};

export default EmotionGlobalStyles;
