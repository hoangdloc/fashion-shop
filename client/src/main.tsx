import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/oxygen/300.css';
import '@fontsource/oxygen/400.css';
import '@fontsource/oxygen/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/rufina/400.css';
import '@fontsource/rufina/700.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { theme } from './config/theme';
import router from './router';
import { persistor, store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EmotionThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <RouterProvider router={router} />
        </PersistGate>
      </ReduxProvider>
    </EmotionThemeProvider>
    <ToastContainer
      autoClose={5000}
      draggablePercent={60}
      position={toast.POSITION.BOTTOM_RIGHT}
      theme="colored"
      pauseOnHover
      bodyStyle={{ fontSize: '1.4rem' }}
    />
  </React.StrictMode>
);
