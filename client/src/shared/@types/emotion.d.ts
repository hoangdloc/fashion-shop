import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fontFamily: {
      PlayfairDisplay: string
      Oxygen: string
      DmSans: string
      Rufina: string
    }
    colors: {
      primaryBlack: string
      secondaryRed: string
      bgWhite: string
      bgGray: string
      textWhite: string
      textGrayLight: string
      textGray: string
      grayDark: string
      grayDarker: string
      textSubtitle: string
      footerBg: string
      horizontalColor: string
    }
    keyframes: {
      pulse: string
    }
    devices: {
      mobile: string
    }
  }
}
