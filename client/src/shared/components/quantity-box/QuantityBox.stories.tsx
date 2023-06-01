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

export const Basic: Story = {
  args: {
    handleSubtract: undefined,
    handlePlus: undefined,
    plusIcon: '+',
    substractIcon: '-',
    initialValue: 1,
    substratBtnClassName: undefined,
    plusBtnClassName: undefined,
    quantityClassName: undefined,
    containerClassName: undefined,
    btnClassName: undefined,
    plusBtnStyle: undefined,
    substractBtnStyle: undefined,
    containerStyle: undefined,
    quantityStyle: undefined,
    btnStyle: undefined
  }
};
