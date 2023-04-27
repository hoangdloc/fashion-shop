import { useTheme } from '@emotion/react';
import { Layout } from 'antd';
import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '../../../config/route';
import { RootState } from '../../../store/store';

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
    <Layout>
      <AppHeader />
      <Layout.Content style={{ backgroundColor: emotionTheme.colors.bgWhite }}>
        <Outlet />
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
};

export default MainAppLayout;
