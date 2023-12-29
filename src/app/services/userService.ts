import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
import ChangePassword from "~/pages/user/change-password";
export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: any) => ({
        url: `/users`,
        method: "GET",
        params: params,
      }),
    }),
    createUser: builder.mutation({
      query: (payload: any) => ({
        url: `/users`,
        method: "POST",
        body: payload,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: (payload: any) => ({
        url: `/users/${payload.id}/status`,
        method: "PUT",
        body: payload.payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload: any) => ({
        url: `/change-password`,
        method: "PUT",
        body: payload,
      }),
    }),
    getUserById: builder.query({
      query: (userId: any) => ({
        url: `/users/${userId}`,
        method: "GET",

      }),
    }),
    updateUser: builder.mutation({
      query: (payload: any) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
    }),
    getUserByPassport: builder.mutation({
      query: (params: any) => ({
        url: `/user-passport`,
        method: "PUT",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserStatusMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserByPassportMutation,
  useChangePasswordMutation
} = userServiceApi;
