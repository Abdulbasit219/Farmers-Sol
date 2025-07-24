import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farmers-sol-backend.onrender.com",
    credentials: "include", //cookies
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/registeration",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),

    // get all categories for add product in shown in dropdown
    getCategories: builder.query({
      query: () => "/category",
    }),

    createProducts: builder.mutation({
      query: (formData) => ({
        url: "/products/create-products",
        method: "POST",
        body: formData,
        formData: true
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCategoriesQuery,
  useCreateProductsMutation,
} = ApiSlice;
