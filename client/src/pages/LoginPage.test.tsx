import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { theme } from '~/config/theme';
import { store } from '~/store/store';
import { type UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import LoginPage from './LoginPage';
import { AppRoute } from '~/config/route';

const renderComponent = (): UserEvent => {
  const user = userEvent.setup();

  render(
    <EmotionThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    </EmotionThemeProvider>
  );

  return user;
};

describe('[LoginPage]', () => {
  test('should redirect to Home page when login successfully!', async () => {
    const user = renderComponent();

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailInput);
    await user.keyboard('test@gmail.com');

    await user.click(passwordInput);
    await user.keyboard('12345678');

    const loginBtn = screen.getByRole('button', { name: /sign in/i });

    await user.click(loginBtn);

    await waitFor(() => {
      expect(window.location.pathname).toEqual(AppRoute.HOME);
    });
  });
});
