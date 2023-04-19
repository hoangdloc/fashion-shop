import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import MyButton from '../shared/components/button';

export default createBrowserRouter([
  {
    element: <App />,
    errorElement: null,
    children: [
      {
        path: '/',
        element: <MyButton type='primary'>Hello World</MyButton>
      },
      {
        path: 'about',
        element: null
      }
    ]
  }
]);
