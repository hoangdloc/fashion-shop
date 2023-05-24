/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

import { axiosBaseQuery } from '~/config/axios';

import type { Color, Gender, Type } from '~/shared/@types/category';
import type {
  Clothes,
  ClothesResponse,
  ClothingsResponse
} from '~/shared/@types/clothes';
import type { Size } from '~/shared/@types/size';
import type { Sorting } from '~/shared/@types/sorting';

interface FetchClothingParams {
  gender?: Gender
  type?: Type
  color?: Color
  size?: Size
  sortByPrice?: Sorting
  bestSeller?: boolean
  featured?: boolean
  minPrice?: number
  maxPrice?: number
  keyword?: string
  page?: number
  limit?: number
}

export const clothesApi = createApi({
  reducerPath: 'clothesApi',
  tagTypes: ['Clothes'],
  baseQuery: axiosBaseQuery(),
  refetchOnReconnect: true,
  endpoints: builder => ({
    fetchClothing: builder.query<ClothingsResponse, FetchClothingParams | void>(
      {
        query: params => ({
          url: '/clothes',
          method: 'get',
          params
        }),
        providesTags: result => {
          if (result != null) {
            const final = [
              ...result.data.clothings.map(({ id }) => ({
                type: 'Clothes' as const,
                id
              })),
              { type: 'Clothes' as const, id: 'LIST' }
            ];
            return final;
          }
          return [{ type: 'Clothes', id: 'LIST' }];
        }
      }
    ),
    getCurrentClothes: builder.query<Clothes, string>({
      query: slug => ({
        url: `/clothes/current/${slug}`,
        method: 'get'
      }),
      transformResponse: (response: ClothesResponse) => response.data.clothes,
      onQueryStarted: async (_, api) => {
        const payload = (await api.queryFulfilled).data;
        if (payload == null) {
          toast.error('Product not found! 😵‍💫');
        }
      }
    })
  })
});

export const {
  useFetchClothingQuery,
  useGetCurrentClothesQuery,
  useLazyFetchClothingQuery
} = clothesApi;
