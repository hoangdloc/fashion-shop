import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primaryBlack: string
      secondaryRed: string
      bgWhite: string
      textWhite: string
      textGrayLight: string
      textGray: string
      grayDark: string
      textSubtitle: string
      footerBg: string
      horizontalColor: string
    }
    keyframes: {
      pulse: string
    }
  }
}
