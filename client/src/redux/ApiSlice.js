import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farmers-sol-1.onrender.com",
    credentials: "include",
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
      }),
    }),

    // get all products/items
    getProducts: builder.query({
      query: () => "/products/get-products",
    }),

    //get products by category
    getProductByCategory: builder.query({
      query: (catId) => `/products/get-productsByCategory/${catId}`,
    }),

    //get products by id
    getProductsById: builder.query({
      query: (id) => `/products/get-productById/${id}`,
    }),

    // get categories by id
    getCategoryById: builder.query({
      query: (id) => `/category/get-Category/${id}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCategoriesQuery,
  useCreateProductsMutation,
  useGetProductsQuery,
  useGetProductByCategoryQuery,
  useGetProductsByIdQuery,
  useGetCategoryByIdQuery,
} = ApiSlice;
