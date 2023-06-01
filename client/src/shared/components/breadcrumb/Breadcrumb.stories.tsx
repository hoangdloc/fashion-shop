import type { Meta, StoryObj } from '@storybook/react';
import MyBreadcrump from '.';

const meta: Meta<typeof MyBreadcrump> = {
  title: 'Components/Breadcrumb',
  component: MyBreadcrump,
  tags: ['autodocs'],
  argTypes: {
    productName: {
      table: { type: { summary: 'string' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    productName: 'T-shirt'
  }
};
