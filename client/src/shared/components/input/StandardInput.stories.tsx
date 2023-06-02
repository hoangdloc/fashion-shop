import React from 'react';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import StandardInput from '~/shared/components/input/StandardInput';

const Container = styled.div`
  background-color: #232323;
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

const meta: Meta<typeof StandardInput> = {
  title: 'Components/Input/StandardInput',
  component: StandardInput,
  tags: ['autodocs'],
  argTypes: {
    status: {
      table: { type: { summary: "'normal' | 'error'" } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    id: 'demo',
    placeholder: 'Hey you, you are finally awake!',
    label: 'Demo'
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    )
  ]
};

export const Error: Story = {
  args: {
    id: 'demo',
    placeholder: 'Hey you, you are finally awake!',
    label: 'Demo',
    status: 'error'
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    )
  ]
};
