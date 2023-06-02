import React from 'react';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import StandardTextarea from '~/shared/components/input/StandardTextarea';

const Container = styled.div`
  background-color: #232323;
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

const meta: Meta<typeof StandardTextarea> = {
  title: 'Components/Input/StandardTextarea',
  component: StandardTextarea,
  tags: ['autodocs'],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    id: 'demo',
    label: 'Demo',
    placeholder: 'Hey you, you are finally awake!'
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    )
  ]
};
