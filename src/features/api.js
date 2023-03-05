import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const config = {
  headers: {
    Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3Nzk4MDU1MywiZXhwIjoxNjc4NTg1MzUzfQ.Byi4hQCorW3PeUJS6E2XQT-7Kg-NGznZbwceYQr_9EaSr9QgTcYX2rTM5RMjGc033WhsVXGQiUTFisQSC4tsAg`
  }
};
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8004/api" }),
  reducerPath: "adminApi",
  tagTypes: ["Customer"],
  endpoints: (build) => ({
    getCustomer: build.query({
      query: () => ({
        url: '/customers',
        method: 'GET',
        headers: config.headers
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        headers: config.headers,
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    createFile: build.mutation({
      query: (file) => ({
        url: "/customers/file",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: (customer) => ({
        url: `/customers`,
        method: "PUT",
        headers: {
          ...config.headers,
        },
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation({
      query: (id ) => ({
        url: `/customers/${id}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});
export const { useGetCustomerQuery,
useUpdateCustomerMutation,
useCreateFileMutation,
useDeleteCustomerMutation,
useCreateCustomerMutation} = api;

