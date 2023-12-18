import { createSlice } from "@reduxjs/toolkit";
import { powerServiceApi } from "~/app/services/powerService";
import { PaginationProps } from "~/types/globalTypes";



const initialState = {
  powers: [],
  pagination: {
    page: 1,
    total: 0,
  },
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
   
  },
});

export const { } = receiptSlice.actions;

export default receiptSlice.reducer;
