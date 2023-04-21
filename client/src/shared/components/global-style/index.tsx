import { Global, useTheme } from '@emotion/react';
import React from 'react';

const EmotionGlobalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={{
        'a, a:link, a:visited': {
          color: 'inherit'
        },
        'a:hover, a:active': {
          color: theme.colors.secondaryRed
        }
      }}
    />
  );
};

export default EmotionGlobalStyles;
