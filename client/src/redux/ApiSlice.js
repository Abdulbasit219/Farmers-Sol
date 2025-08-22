import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
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
      query: (search = "") => `/category?query=${search}`,
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
      query: ({ page = 1, admin = false }) =>
        `/products/get-products?page=${page}${admin ? "&admin=true" : ""}`,
    }),

    searchProduct: builder.mutation({
      query: ({ query, page }) => ({
        url: `/products/search?page=${page}`,
        method: "POST",
        body: { query },
      }),
    }),

    filterProducts: builder.mutation({
      query: (status) => ({
        url: `/products/filter?status=${status}`,
        method: "GET",
      }),
    }),

    //get products by category
    getProductByCategory: builder.query({
      query: ({ catId, page }) =>
        `/products/get-productsByCategory/${catId}?page=${page}`,
    }),

    //get products by id
    getProductsById: builder.query({
      query: (id) => `/products/get-productById/${id}`,
    }),

    // get categories by id
    getCategoryById: builder.query({
      query: (id) => `/category/get-Category/${id}`,
    }),

    //get products by farmer (with optional search + pagination)
    getProductsByFarmerId: builder.query({
      query: ({ id, page = 1, query = "" }) =>
        `/products/get-products/${id}?page=${page}&query=${query}`,
    }),

    //delete product by id
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: "DELETE",
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ productId, imageIndex, updatedData }) => {
        const url =
          imageIndex !== null && imageIndex !== undefined
            ? `/products/update-product/${productId}?imageIndex=${imageIndex}`
            : `/products/update-product/${productId}`;
        return {
          url,
          method: "PATCH",
          body: updatedData,
        };
      },
    }),

    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/auth/update_user/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
    }),

    getUser: builder.query({
      query: (search = "") => `/auth?query=${search}`,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete_user/${id}`,
        method: "DELETE",
      }),
    }),

    approveProduct: builder.mutation({
      query: ({ id, status }) => ({
        url: `/products/approve/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    createCategory: builder.mutation({
      query: (name) => ({
        url: `/category/create`,
        method: "POST",
        body: { name },
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/category/update-category/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/order/create-order`,
        method: "POST",
        body: orderData,
      }),
    }),

    getBuyerOrders: builder.query({
      query: ({ id, query = "" }) =>
        `/order/getBuyerOrders/${id}?query=${query}`,
    }),

    getReceivedOrderByFarmer: builder.query({
      query: ({ id, query = "" }) =>
        `/order/getReceivedOrder/${id}?query=${query}`,
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/updateOrderStatus/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    getAllOrders: builder.query({
      query: ({ page = 1, search = "" }) =>
        `/order?page=${page}&search=${search}`,
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/deleteOrder/${id}`,
        method: "Delete",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCategoriesQuery,
  useCreateProductsMutation,
  useGetProductsQuery,
  useSearchProductMutation,
  useFilterProductsMutation,
  useGetProductByCategoryQuery,
  useGetProductsByIdQuery,
  useGetCategoryByIdQuery,
  useGetProductsByFarmerIdQuery,
  useDeleteProductsMutation,
  useUpdateProductMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useApproveProductMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateOrderMutation,
  useGetBuyerOrdersQuery,
  useGetReceivedOrderByFarmerQuery,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = ApiSlice;
