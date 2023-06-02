import type { Meta, StoryObj } from '@storybook/react';
import ArticleHeading from '~/shared/components/heading/ArticleHeading';

const meta: Meta<typeof ArticleHeading> = {
  title: 'Components/Heading/ArticleHeading',
  component: ArticleHeading,
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
