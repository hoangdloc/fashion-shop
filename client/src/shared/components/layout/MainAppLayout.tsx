import { useTheme } from '@emotion/react';
import { Layout } from 'antd';
import React, { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const AppFooter = lazy(async () => await import('./AppFooter'));
const AppHeader = lazy(async () => await import('./AppHeader'));

const MainAppLayout: React.FC = () => {
  const emotionTheme = useTheme();

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
