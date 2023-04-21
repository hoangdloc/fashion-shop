import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primaryBlack: string
      secondaryRed: string
      bgWhite: string
      textWhite: string
      textGray: string
      footerBg: string
    }
    keyframes: {
      pulse: string
    }
  }
}
