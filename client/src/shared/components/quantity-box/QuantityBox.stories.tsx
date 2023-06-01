import type { Meta, StoryObj } from '@storybook/react';
import QuantityBox from '.';

const meta: Meta<typeof QuantityBox> = {
  title: 'Components/QuantityBox',
  component: QuantityBox,
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
