import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider, Layout } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import EmotionGlobalStyles from './shared/components/global-style';

const AppFooter = lazy(async () => await import('./shared/components/layout/AppFooter'));
const AppHeader = lazy(async () => await import('./shared/components/layout/AppHeader'));

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
        <Layout>
          <AppHeader />
          <Layout.Content
            style={{ backgroundColor: emotionTheme.colors.bgWhite }}
          >
            <Outlet />
          </Layout.Content>
          <AppFooter />
        </Layout>
      </AntdGlobalConfigProvider>
    </Suspense>
  );
}

export default App;
