import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { AppRoute, ShopRoute } from '../config/route';
import ErrorPage from '../pages/ErrorPage';

const MainAppLayout = lazy(
  async () => await import('../shared/components/layout/MainAppLayout')
);
const LoginPage = lazy(async () => await import('../pages/LoginPage'));
const SignupPage = lazy(async () => await import('../pages/SignupPage'));
const HomePage = lazy(async () => await import('../pages/HomePage'));
const NotFoundPage = lazy(async () => await import('../pages/NotFoundPage'));

export default createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainAppLayout />,
        children: [
          {
            index: true,
            path: AppRoute.HOME,
            element: <HomePage />
          },
          {
            path: AppRoute.ABOUT,
            element: <div>About...</div>
          },
          {
            path: AppRoute.SHOP,
            children: [
              {
                path: '',
                element: <Navigate to="men" />
              },
              {
                index: true,
                path: ShopRoute.MEN,
                element: <div>Shop men...</div>
              },
              {
                path: ShopRoute.WOMEN,
                element: <div>Shop women...</div>
              },
              {
                path: ShopRoute.UNISEX,
                element: <div>Shop unisex...</div>
              }
            ]
          },
          {
            path: AppRoute.CART,
            element: <div>Cart...</div>
          },
          {
            path: '*',
            element: <NotFoundPage />
          }
        ]
      },
      {
        element: <LoginPage />,
        errorElement: <ErrorPage />,
        path: AppRoute.LOGIN
      },
      {
        element: <SignupPage />,
        errorElement: <ErrorPage />,
        path: AppRoute.SIGNUP
      }
    ]
  }
]);
