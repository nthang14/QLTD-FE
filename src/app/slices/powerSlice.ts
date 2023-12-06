import { createSlice } from "@reduxjs/toolkit";
import { powerServiceApi } from "~/app/services/powerService";
import { PaginationProps } from "~/types/globalTypes";
type Power = {
  
};

export interface PowerState {
    powers: any[];
  pagination: PaginationProps;
}

const initialState: PowerState = {
  powers: [],
  pagination: {
    page: 1,
    total: 0,
  },
};

export const powerSlice = createSlice({
  name: "power",
  initialState,
  reducers: {
   
  },
});

export const { } = powerSlice.actions;

export default powerSlice.reducer;
