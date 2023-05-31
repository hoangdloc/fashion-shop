import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { type UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { theme } from '~/config/theme';
import { store } from '~/store/store';
import FeaturedProductSection from './FeaturedProductSection';

const renderComponent = (): UserEvent => {
  const user = userEvent.setup();

  render(
    <EmotionThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter>
          <FeaturedProductSection />
        </MemoryRouter>
      </Provider>
    </EmotionThemeProvider>
  );

  return user;
};

describe('[HomePage] FeaturedProductSection', () => {
  test('should have 3 tabs for each gender', () => {
    renderComponent();

    const allTabs = screen.getAllByRole('tab');

    expect(allTabs.length).toEqual(3);
  });

  test('should render less than or equal to 8 products each carousel', async () => {
    const user = renderComponent();

    const allTabs = screen.getAllByRole('tab');

    for (const tab of allTabs) {
      await user.click(tab);

      const allProducts = await screen.findAllByRole('img');

      expect(allProducts.length).toBeLessThanOrEqual(8);
    }
  });
});
