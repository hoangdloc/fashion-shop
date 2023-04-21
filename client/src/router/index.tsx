import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import MyButton from '../shared/components/button';

export default createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MyButton type="primary">Hello World</MyButton>
      },
      {
        path: '/about',
        element: <div>About...</div>
      },
      {
        path: '/shop',
        children: [
          {
            path: '',
            element: <Navigate to='men' />
          },
          {
            path: 'men',
            element: <div>Shop men...</div>
          },
          {
            path: 'women',
            element: <div>Shop men...</div>
          },
          {
            path: 'unisex',
            element: <div>Shop men...</div>
          }
        ]
      },
      {
        path: '/contact',
        element: <div>Contact...</div>
      }
    ]
  }
]);
