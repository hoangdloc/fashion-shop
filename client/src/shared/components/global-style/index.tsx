import { Global, useTheme, css } from '@emotion/react';
import React from 'react';

const EmotionGlobalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          font-size: 62.5%;
          scroll-behavior: smooth;
        }
        body {
          font-family: ${theme.fontFamily.Oxygen};
          line-height: 1;
          font-weight: 400;
          color: ${theme.colors.primaryBlack};
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a,
        a:link,
        a:visited {
          color: inherit;
        }
        a:hover,
        a:active {
          color: ${theme.colors.secondaryRed};
        }
        ul {
          margin: 0;
          list-style-type: none;
        }
        li {
          text-align: start;
        }
        label {
          cursor: pointer;
        }
        hr {
          border: 0.05rem solid ${theme.colors.horizontalColor};
        }
        figure {
          margin: 0;
        }
        button {
          border: none;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .swal2-container {
          zoom: 1.5;
        }
        .ant-typography {
          margin: 0;
        }
        .ant-select-dropdown {
          & .ant-select-item-option-content {
            font-size: 1.2rem;
          }
          &
            .ant-select-item.ant-select-item-option.ant-select-item-option-selected {
            background-color: ${theme.colors.secondaryRed};
            & > .ant-select-item-option-content {
              color: ${theme.colors.textWhite};
            }
          }
        }
        @keyframes pulse {
          0% {
            width: 0.8rem;
          }
          50% {
            width: 2.8rem;
          }
          75% {
            width: 3.8rem;
          }
        }
      `}
    />
  );
};

export default EmotionGlobalStyles;
