import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = 'https://jobs-search.herokuapp.com/api/v1/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: '/register',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
