import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { AppRoute, ShopRoute, SLUG } from '../config/route';
import ErrorPage from '../pages/ErrorPage';

const MainAppLayout = lazy(
  async () => await import('../shared/components/layout/MainAppLayout')
);
const LoginPage = lazy(async () => await import('../pages/LoginPage'));
const SignupPage = lazy(async () => await import('../pages/SignupPage'));
const HomePage = lazy(async () => await import('../pages/HomePage'));
const AboutPage = lazy(async () => await import('../pages/AboutPage'));
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
            element: <AboutPage />
          },
          {
            path: AppRoute.SHOP,
            children: [
              {
                path: '',
                element: <Navigate to="men" />
              },
              {
                path: ShopRoute.MEN,
                children: [
                  {
                    index: true,
                    path: '',
                    element: <div>Shop men...</div>
                  },
                  {
                    path: SLUG,
                    element: <div>Product men...</div>
                  }
                ]
              },
              {
                path: ShopRoute.WOMEN,
                children: [
                  {
                    index: true,
                    path: '',
                    element: <div>Shop women...</div>
                  },
                  {
                    path: SLUG,
                    element: <div>Product women...</div>
                  }
                ]
              },
              {
                path: ShopRoute.UNISEX,
                children: [
                  {
                    index: true,
                    path: '',
                    element: <div>Shop unisex...</div>
                  },
                  {
                    path: SLUG,
                    element: <div>Product unisex...</div>
                  }
                ]
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
