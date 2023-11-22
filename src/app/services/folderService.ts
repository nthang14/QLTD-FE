import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const folderServiceApi = createApi({
  reducerPath: "folderServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getFoldersByOwner: builder.query({
      query: (params) => ({
        url: `/folders`,
        method: "GET",
        params: params,
      }),
    }),
    createFolder: builder.mutation({
      query: (payload) => {
        return ({
          url: "/folders",
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      },
    }),
    getFolderShareWithMe: builder.query({
      query: (params) => ({
        url: `/folders/shared-me`,
        method: "GET",
        params: params,
      }),
    })
  }),
});

export const { useGetFoldersByOwnerQuery, useCreateFolderMutation, useGetFolderShareWithMeQuery } = folderServiceApi;
