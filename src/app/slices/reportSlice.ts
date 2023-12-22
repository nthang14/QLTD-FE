import { createSlice } from "@reduxjs/toolkit";
import { PaginationProps } from "~/types/globalTypes";


export interface PowerState {
    report: any[];
  pagination: PaginationProps;
}

const initialState: PowerState = {
  report: [],
  pagination: {
    page: 1,
    total: 0,
  },
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
   
  },
});

export const { } = reportSlice.actions;

export default reportSlice.reducer;
