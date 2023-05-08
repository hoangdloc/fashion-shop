import type { Theme } from '@emotion/react';

export const theme: Theme = {
  fontFamily: {
    PlayfairDisplay: "'Playfair Display', serif",
    Rufina: "'Rufina', serif",
    Oxygen: "'Oxygen', san-serif",
    DmSans: "'DM Sans', san-serif"
  },
  colors: {
    primaryBlack: '#2B2F32',
    // primaryBlack: 'green',
    secondaryRed: '#C97178',
    bgWhite: '#FCFCFC',
    bgGray: '#F9F9F9',
    textWhite: '#FFFFFF',
    textGrayLight: '#B5B6B7',
    textGray: '#AAACAD',
    grayDark: '#909293',
    textSubtitle: '#55595B',
    footerBg: '#F3F3F3',
    horizontalColor: '#D5D5D6'
  },
  keyframes: {
    pulse: 'pulse 0.2s ease-in-out'
  }
};
