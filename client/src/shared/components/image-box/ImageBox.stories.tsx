import type { Meta, StoryObj } from '@storybook/react';
import ImageBox from '~/shared/components/image-box';

const meta: Meta<typeof ImageBox> = {
  title: 'Components/ImageBox',
  component: ImageBox,
  tags: ['autodocs'],
  argTypes: {
    src: {
      table: { type: { summary: 'string' } }
    },
    alt: {
      table: { type: { summary: 'string' } }
    },
    size: {
      table: { type: { summary: 'string' } }
    },
    className: {
      table: { type: { summary: 'string' } }
    },
    containerStyle: {
      table: { type: { summary: 'CSSProperties' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    alt: 'Salad dish',
    size: '10rem',
    className: 'image-box',
    containerStyle: {
      margin: 'auto'
    }
  }
};
