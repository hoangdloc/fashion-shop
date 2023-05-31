import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '~/config/theme';
import { store } from '~/store/store';
import BreakSection from './BreakSection';

const renderComponent = (): void => {
  render(
    <EmotionThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter>
          <BreakSection />
        </MemoryRouter>
      </Provider>
    </EmotionThemeProvider>
  );
};

describe('[HomePage]: BreakSection', () => {
  test('should have banner in the section', () => {
    renderComponent();

    const banner = screen.getByRole('img');

    expect(banner).toBeInTheDocument();
  });
});
