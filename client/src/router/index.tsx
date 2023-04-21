import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { AppRoute, ShopRoute } from '../config/route';
import ErrorPage from '../pages/ErrorPage';
import MyButton from '../shared/components/button';

export default createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: AppRoute.HOME,
        element: <MyButton type="primary">Hello World</MyButton>
      },
      {
        path: AppRoute.CONTACT,
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
        path: AppRoute.CONTACT,
        element: <div>Contact...</div>
      },
      {
        path: AppRoute.CART,
        element: <div>Cart...</div>
      },
      {
        path: '*',
        element: <div>404 Page</div>
      }
    ]
  }
]);
