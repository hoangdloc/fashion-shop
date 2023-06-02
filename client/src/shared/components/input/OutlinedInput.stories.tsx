import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import OutlinedInput from '~/shared/components/input/OutlinedInput';
import { theme } from '~/config/theme';

const meta: Meta<typeof OutlinedInput> = {
  title: 'Components/Input/OutlinedInput',
  component: OutlinedInput,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colors.primaryBlack,
            colorTextBase: theme.colors.primaryBlack,
            fontFamily: theme.fontFamily.Oxygen,
            borderRadius: 0
          }
        }}
      >
        <Story />
      </ConfigProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Need something?',
    placeholderColor: 'pink'
  }
};
