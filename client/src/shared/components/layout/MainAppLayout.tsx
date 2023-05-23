import { useTheme } from '@emotion/react';
import { Layout } from 'antd';
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '~/config/route';
import { CartProvider } from '~/contexts/cart-context';
import ClothesPopup from '~/shared/components/clothes-popup';
import SubcribePopup from '~/shared/components/subscribe-popup';
import LoadingScreen from './LoadingScreen';

import type { RootState } from '~/store/store';

const AppFooter = lazy(async () => await import('./AppFooter'));
const AppHeader = lazy(async () => await import('./AppHeader'));

const MainAppLayout: React.FC = () => {
  const emotionTheme = useTheme();
  const isAuth = useSelector((state: RootState) => state.auth.accessToken);

  if (isAuth == null) {
    return (
      <Navigate
        to={AppRoute.LOGIN}
        replace
      />
    );
  }

  return (
    <CartProvider>
      <Layout>
        <AppHeader />
        <Layout.Content style={{ backgroundColor: emotionTheme.colors.bgWhite }}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
        <AppFooter />
        <SubcribePopup />
        <ClothesPopup />
      </Layout>
    </CartProvider>
  );
};

export default MainAppLayout;
