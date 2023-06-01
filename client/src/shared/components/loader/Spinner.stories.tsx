import type { Meta, StoryObj } from '@storybook/react';

import { theme } from '~/config/theme';
import { Spinner } from '.';

const meta: Meta<typeof Spinner> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      values: [
        { name: 'Primary background', value: theme.colors.bgWhite },
        { name: 'Secondary background', value: theme.colors.bgGray },
        { name: 'Footer background', value: theme.colors.footerBg }
      ]
    }
  },
  argTypes: {
    size: {
      table: { defaultValue: { summary: '"24"' } },
      description: 'Only number or string digits. Not accept length unit'
    },
    color: {
      table: { defaultValue: { summary: '"#2B2F32"' } },
      description: 'Color of spinner'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    size: 24,
    color: theme.colors.primaryBlack
  }
};
