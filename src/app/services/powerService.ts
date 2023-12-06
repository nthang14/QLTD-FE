import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const powerServiceApi = createApi({
  reducerPath: "powerServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getPowers: builder.query({
      query: (params: any) => ({
        url: `/powers`,
        method: "GET",
        params: params,
      }),
    }),
    getPowerById: builder.query({
      query: (id: any) => ({
        url: `/powers/${id}`,
        method: "GET",
      }),
    }),
    createPowers: builder.mutation({
      query: (payload: any) => ({
        url: `/powers`,
        method: "POST",
        body: payload,
      }),
    }),
    updatePowersStatus: builder.mutation({
      query: (payload: any) => ({
        url: `/powers/${payload.id}/status`,
        method: "PUT",
        body: payload.payload,
      }),
    }),
    getPowersById: builder.query({
      query: (userId: any) => ({
        url: `/powers/${userId}`,
        method: "GET",

      }),
    }),
    updatePowers: builder.mutation({
      query: (payload: any) => ({
        url: `/powers/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
    }),
    getPreviousPower: builder.mutation({
      query: (params: any) => ({
        url: `/powers/previous`,
        method: "PUT",
        body: params,
      }),
    }),
  }),
});

export const {
    useGetPreviousPowerMutation,
    useCreatePowersMutation,
    useGetPowersQuery,
    useGetPowerByIdQuery
} = powerServiceApi;
