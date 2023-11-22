import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const fileServiceApi = createApi({
  reducerPath: "fileServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getFileByOwner: builder.query({
      query: (params) => ({
        url: `/files`,
        method: "GET",
        params: params,
      }),
    }),
    uploadFile: builder.mutation({
      query: (payload) => {
        return ({
          url: "/files/upload",
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      },
    }),
  }),
});

export const { useGetFileByOwnerQuery, useUploadFileMutation } = fileServiceApi;
