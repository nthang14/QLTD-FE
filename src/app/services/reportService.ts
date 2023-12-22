import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const reportServiceApi = createApi({
  reducerPath: "reportServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getReportUser: builder.query({
      query: () => ({
        url: `/report/users`,
        method: "GET",
      }),
    }),
    getReportReceipt: builder.query({
        query: (params: any) => ({
          url: `/report/receipts`,
          method: "GET",
          params: params
        }),
      }),
  }),
});

export const {
 useGetReportUserQuery,
 useGetReportReceiptQuery
} = reportServiceApi;
