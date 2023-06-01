import type { Meta, StoryObj } from '@storybook/react';

import MyLinkButton from './MyLinkButton';

const meta: Meta<typeof MyLinkButton> = {
  title: 'Components/Button/MyLinkButton',
  component: MyLinkButton,
  tags: ['autodocs'],
  argTypes: {
    to: {
      table: { type: { summary: 'string' } }
    },
    className: {
      table: { type: { summary: 'string' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'My link button'
  }
};
