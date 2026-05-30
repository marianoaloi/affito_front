import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AffitoEntity } from '@/app/entity/AffitoEntity';
import { FilterAffito } from '../filter/filterTypes';
import { API_BASE_URL } from '../BaseURL';

export const affitoApi = createApi({
  reducerPath: 'affitoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getAffito: builder.query<AffitoEntity[], FilterAffito>({
      query: (filter) => ({
        url: '/api/affito',
        method: 'POST',
        body: filter,
      }),
      transformResponse: (response: { data: AffitoEntity[] }) => response.data,
    }),
  }),
});

export const { useGetAffitoQuery } = affitoApi;
