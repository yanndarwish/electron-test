import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from '../store/store';
const url = 'https://jobs-search.herokuapp.com/api/v1/jobs';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = store.getState().authSlice.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: '/',
      }),
    }),
    createJob: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
    }),
    getSingleJob: builder.query({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
    updateJob: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useGetSingleJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
