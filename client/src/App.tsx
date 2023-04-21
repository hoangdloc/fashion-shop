import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider, Layout } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppFooter, AppHeader } from './shared/components/layout';

function App (): JSX.Element {
  const emotionTheme = useTheme();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AntdGlobalConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.primaryBlack,
            borderRadius: 0,
            fontFamily: "'Oxygen', san-serif"
          }
        }}
      >
        <Layout>
          <AppHeader />
          <Layout.Content>
            <Outlet />
          </Layout.Content>
          <AppFooter />
        </Layout>
      </AntdGlobalConfigProvider>
    </Suspense>
  );
}

export default App;
