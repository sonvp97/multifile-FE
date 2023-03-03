import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { v4 as uuidv4 } from 'uuid';

const config = {
  headers: {
    Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3NzgwNjY5MCwiZXhwIjoxNjc4NDExNDkwfQ._iK-PbMftKFjwwTDKbukESmvoLZjCjuY8IGcDBLM6upsN-e2kcO4rTdwS4OKgHCzrJ9ttGV_vvLUEP3aw4VY_A`
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
      query: ({ orderId }) => ({
        url: `/customers/${orderId}`,
        method: "DELETE",
        headers: config.headers,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});
export const { useGetCustomerQuery,
useUpdateCustomerMutation,
useCreateFileMutation } = api;

