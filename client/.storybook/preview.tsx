import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/oxygen/300.css';
import '@fontsource/oxygen/400.css';
import '@fontsource/oxygen/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/rufina/400.css';
import '@fontsource/rufina/700.css';
import 'antd/dist/reset.css';
import React from 'react';
import { Global, ThemeProvider, css } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { withRouter } from 'storybook-addon-react-router-v6';
import type { Preview } from '@storybook/react';

import { theme } from '../src/config/theme';

const GlobalStyles: React.FC = () => {
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
          font-family: 'Oxygen', sans-serif;
          line-height: 1;
          font-weight: 400;
          color: #2B2F32;
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
          color: #C97178;
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
          border: 0.05rem solid #D5D5D6;
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
            background-color: #C97178;
            & > .ant-select-item-option-content {
              color: #FFFFFF;
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

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    withRouter,
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
      themes: {
        primary: theme
      },
      defaultTheme: 'primary',
      GlobalStyles
    })
  ]
};

export default preview;
