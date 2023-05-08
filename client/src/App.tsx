import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import EmotionGlobalStyles from './shared/components/global-style';

const App: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <Suspense fallback={<LoadingPage />}>
      <EmotionGlobalStyles />
      <AntdGlobalConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.primaryBlack,
            colorTextBase: emotionTheme.colors.primaryBlack,
            fontFamily: emotionTheme.fontFamily.Oxygen,
            borderRadius: 0
          }
        }}
      >
        <Outlet />
      </AntdGlobalConfigProvider>
      <ScrollRestoration />
    </Suspense>
  );
};

export default App;
