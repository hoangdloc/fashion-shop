import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function App (): JSX.Element {
  const emotionTheme = useTheme();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AntdGlobalConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.primaryBlack,
            borderRadius: 0
          }
        }}
      >
        <Outlet />
      </AntdGlobalConfigProvider>
    </Suspense>
  );
}

export default App;
