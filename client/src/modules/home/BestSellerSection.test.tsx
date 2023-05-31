import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { theme } from '~/config/theme';
import { store } from '~/store/store';
import BestSellerSection from './BestSellerSection';

const renderComponent = (): void => {
  render(
    <EmotionThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter>
          <BestSellerSection />
        </MemoryRouter>
      </Provider>
    </EmotionThemeProvider>
  );
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

vi.mock('@formkit/auto-animate/react', () => {
  const useAutoAnimate = (): [null] => [null];

  return { useAutoAnimate };
});

describe('[HomePage] BestSellerSection', () => {
  test('should render less than or equal to 8 products', async () => {
    renderComponent();

    await screen.findAllByRole('img');
    const allProducts = screen.getAllByRole('img');

    expect(allProducts.length).toBeLessThanOrEqual(8);
  });
});
