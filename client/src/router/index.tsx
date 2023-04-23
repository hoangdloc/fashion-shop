import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { AppRoute, ShopRoute } from '../config/route';
import ErrorPage from '../pages/ErrorPage';

const HomePage = lazy(async () => await import('../pages/HomePage'));
const NotFoundPage = lazy(async () => await import('../pages/NotFoundPage'));

export default createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
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
            element: <Navigate to='men' />
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
  }
]);
