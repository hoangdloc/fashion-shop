import styled from '@emotion/styled';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import { Color, Gender, Type } from '~/shared/@types/category';
import { Size } from '~/shared/@types/size';
import CarouselCards from '~/shared/components/carousel-cards';

const CarouselCardsContainer = styled.div`
  * {
    text-decoration: none;
  }
`;

const meta: Meta<typeof CarouselCards> = {
  title: 'Components/CarouselCards',
  component: CarouselCards,
  tags: ['autodocs'],
  argTypes: {
    data: {
      table: { type: { summary: 'Clothes[]' } }
    },
    loading: {
      table: { type: { summary: 'boolean' } },
      required: true
    }
  },
  decorators: [
    Story => (
      <Provider
        store={configureStore({
          reducer: {
            clothes: createSlice({
              name: 'clothes',
              initialState: {},
              reducers: {}
            }).reducer
          }
        })}
      >
        <CarouselCardsContainer>
          <Story />
        </CarouselCardsContainer>
      </Provider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    loading: false,
    data: new Array(8).fill(0).map((_, index) => ({
      id: index,
      name: 'T-shirt with crew neck',
      slug: 't-shirt-with-crew-neck',
      images: [
        'https://img.freepik.com/free-photo/basic-white-tee-women-s-apparel-rear-view_53876-108033.jpg?w=826&t=st=1681960524~exp=1681961124~hmac=5d2d857628b0ee2301db4542953563af9373f8760e08ff1ea56cdbe1ac65eda5',
        'https://img.freepik.com/premium-photo/yellow-tshirt_719385-441.jpg?w=1060',
        'https://img.freepik.com/premium-vector/red-vector-men-s-t-shirt-mockup_292608-838.jpg?w=1060',
        'https://img.freepik.com/free-photo/short-sleeve-black-t-shirt_1409-2226.jpg?w=1380&t=st=1681959458~exp=1681960058~hmac=e9c4eaf887aee7f42a50b27aa00d99dfe4ecfeeacff75eb5deb9b5b4a5cc21bb'
      ],
      price: 312,
      salePercent: 0,
      status: 2,
      bestSeller: true,
      featured: true,
      overview:
        'LoLorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit atque eum ut nulla iure fuga, repellat, officiis quasi ab dolor magnam corrupti rerum sit adipisci voluptatum nihil exercitationem facilis sed, totam repudiandae debitis? Incidunt molestias nesciunt enim excepturi quas repellendus, vitae exercitationem odit ea vero ipsa iusto obcaecati placeat esse?rem',
      description: [
        'Woman 3-piece dress suits: 100% organic cotton',
        'Dry clean only',
        'This product contains (suit, vest and pants)'
      ],
      category: [
        Gender.WOMEN,
        Type.CLOTHING,
        Color.WHITE,
        Color.YELLOW,
        Color.RED,
        Color.BLACK
      ],
      sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL]
    }))
  }
};

export const Skeleton: Story = {
  args: {
    loading: true,
    data: undefined
  }
};
