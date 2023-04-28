/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../config/axios';
import { Color, Gender, Type } from '../../shared/@types/category';
import { Clothes, ClothesResponse } from '../../shared/@types/clothes';
import { Size } from '../../shared/@types/size';

interface FetchClothingParams {
  gender?: Gender
  type?: Type
  color?: Color
  size?: Size
  sortByPrice?: 0 | 1
  bestSeller?: boolean
  featured?: boolean
}

export const clothesApi = createApi({
  reducerPath: 'clothesApi',
  tagTypes: ['Clothes'],
  baseQuery: axiosBaseQuery(),
  refetchOnReconnect: true,
  endpoints: builder => ({
    fetchClothing: builder.query<Clothes[], FetchClothingParams | void>({
      query: (params) => ({
        url: '/clothes',
        method: 'get',
        params
      }),
      transformResponse: (response: ClothesResponse) =>
        response.data.clothings,
      providesTags: result => {
        if (result != null) {
          const final = [
            ...result.map(({ id }) => ({
              type: 'Clothes' as const,
              id
            })),
            { type: 'Clothes' as const, id: 'LIST' }
          ];
          return final;
        }
        return [{ type: 'Clothes', id: 'LIST' }];
      }
    })
  })
});

export const { useFetchClothingQuery } = clothesApi;
