import type { Meta, StoryObj } from '@storybook/react';
import { theme } from '~/config/theme';
import MyBadge from '.';

const meta: Meta<typeof MyBadge> = {
  title: 'Components/Badge',
  component: MyBadge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      table: {
        defaultValue: { summary: '"Hot"' },
        type: { summary: 'ReactNode' }
      }
    },
    color: {
      table: {
        defaultValue: { summary: '"#C97178"' },
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Hot: Story = {
  args: {
    label: 'Hot',
    color: theme.colors.secondaryRed
  }
};

export const SoldOut: Story = {
  args: {
    label: 'Sold out',
    color: theme.colors.grayDark
  }
};

export const Sale: Story = {
  args: {
    label: 'Sale',
    color: theme.colors.primaryBlack
  }
};
