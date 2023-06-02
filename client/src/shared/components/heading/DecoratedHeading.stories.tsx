import type { Meta, StoryObj } from '@storybook/react';
import DecoratedHeading from '~/shared/components/heading/DecoratedHeading';

const meta: Meta<typeof DecoratedHeading> = {
  title: 'Components/Heading/DecoratedHeading',
  component: DecoratedHeading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      table: { type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5'" } },
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      control: { type: 'radio' }
    },
    children: {
      table: { type: { summary: 'ReactNode' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'This a heading'
  }
};
