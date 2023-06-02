import type { Meta, StoryObj } from '@storybook/react';
import QuantityBox from '~/shared/components/quantity-box';

const meta = {
  title: 'Components/QuantityBox',
  component: QuantityBox,
  tags: ['autodocs'],
  argTypes: {
    handleSubtract: {
      table: { type: { summary: '() => void' } }
    },
    handlePlus: {
      table: { type: { summary: '() => void' } }
    },
    plusIcon: {
      table: { type: { summary: 'ReactNode' } }
    }
  }
} satisfies Meta<typeof QuantityBox>;

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
