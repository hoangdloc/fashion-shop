import type { Meta, StoryObj } from '@storybook/react';
import MyCheckbox from '~/shared/components/checkbox';

const meta: Meta<typeof MyCheckbox> = {
  title: 'Components/Checkbox',
  component: MyCheckbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      table: { defaultValue: { summary: false }, type: { summary: 'boolean' } },
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false
  }
};

export const Basic: Story = {
  args: {
    children: 'Check me 🤤'
  }
};
