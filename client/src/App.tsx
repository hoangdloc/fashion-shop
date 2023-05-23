import { useTheme } from '@emotion/react';
import { ConfigProvider as AntdGlobalConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import LoadingPage from '~/pages/LoadingPage';
import EmotionGlobalStyles from '~/shared/components/global-style';
import { AppRoute, ShopRoute } from './config/route';

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
      <ScrollRestoration
        getKey={location => {
          const paths = [
            `${AppRoute.SHOP}/${ShopRoute.MEN}`,
            `${AppRoute.SHOP}/${ShopRoute.WOMEN}`,
            `${AppRoute.SHOP}/${ShopRoute.UNISEX}`
          ];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />
    </Suspense>
  );
};

export default App;
