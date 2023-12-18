import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const receiptServiceApi = createApi({
  reducerPath: "receiptServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getReceipts: builder.query({
      query: (params: any) => ({
        url: `/receipts`,
        method: "GET",
        params: params,
      }),
    }),

    createNewReceipt: builder.mutation({
      query: (payload: any) => ({
        url: `/receipts`,
        method: "POST",
        body: payload,
      }),
    }),
    getReceiptById: builder.query({
      query: (id: any) => ({
        url: `/receipts/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
   useCreateNewReceiptMutation,
   useGetReceiptsQuery,
   useGetReceiptByIdQuery
} = receiptServiceApi;