import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { theme } from '~/config/theme';
import MyButton from './MyButton';

const meta: Meta<typeof MyButton> = {
  title: 'Components/Button/MyButton',
  component: MyButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: { defaultValue: { summary: false } },
      description: 'HTML Attributes',
      control: { type: 'boolean' }
    },
    htmlType: {
      table: { defaultValue: { summary: 'button' } }
    },
    loading: {
      table: { defaultValue: { summary: false }, type: { summary: 'boolean' } },
      control: { type: 'boolean' },
      type: 'boolean'
    }
  },
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

export const Type: Story = {
  args: {
    disabled: false,
    htmlType: 'button',
    loading: false
  },
  render: ({ disabled, loading }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
        <MyButton
          type="primary"
          disabled={disabled}
          loading={loading}
        >
          Primary
        </MyButton>
        <MyButton
          type="dashed"
          disabled={disabled}
          loading={loading}
        >
          Dashed
        </MyButton>
        <MyButton
          type="ghost"
          disabled={disabled}
          loading={loading}
        >
          Ghost
        </MyButton>
        <MyButton
          type="text"
          disabled={disabled}
          loading={loading}
        >
          Text
        </MyButton>
        <MyButton
          type="link"
          disabled={disabled}
          loading={loading}
        >
          Link
        </MyButton>
        <MyButton
          type="default"
          disabled={disabled}
          loading={loading}
        >
          Default
        </MyButton>
      </div>
    );
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    type: 'primary',
    children: "You can't click me"
  }
};

export const Icon: Story = {
  args: {
    type: 'primary',
    icon: <SearchOutlined />
  }
};

export const WithIcon: Story = {
  args: {
    type: 'primary',
    icon: <SearchOutlined />,
    children: 'Search'
  }
};
