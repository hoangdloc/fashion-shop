import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import EmotionGlobalStyles from './shared/components/global-style';

function App (): JSX.Element {
  const emotionTheme = useTheme();

  return (
    <Suspense fallback={<LoadingPage />}>
      <EmotionGlobalStyles />
      <AntdGlobalConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.primaryBlack,
            colorTextBase: emotionTheme.colors.primaryBlack,
            borderRadius: 0,
            fontFamily: "'Oxygen', san-serif"
          }
        }}
      >
        <Outlet />
      </AntdGlobalConfigProvider>
    </Suspense>
  );
}

export default App;
