import { configureStore } from "@reduxjs/toolkit";
import { authServiceApi } from "~/app/services/authService";
import authSlice from "~/app/slices/authSlice";
import userSlice from "~/app/slices/userSlice";
import { userServiceApi } from "~/app/services/userService";
import powerSlice from '~/app/slices/powerSlice';
import { powerServiceApi } from "~/app/services/powerService"
import receiptSlice from '~/app/slices/receiptSlice';
import { receiptServiceApi } from "~/app/services/receiptService"
import reportSlice from '~/app/slices/reportSlice';
import { reportServiceApi } from "~/app/services/reportService"
import commonSlice from "~/app/slices/commonSlice";
export const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    [authServiceApi.reducerPath]: authServiceApi.reducer,

    user: userSlice,
    [userServiceApi.reducerPath]: userServiceApi.reducer,

    power: powerSlice,
    [powerServiceApi.reducerPath]: powerServiceApi.reducer,
    receipt: receiptSlice,
    [receiptServiceApi.reducerPath]: receiptServiceApi.reducer,
    report: reportSlice,
    [reportServiceApi.reducerPath]: reportServiceApi.reducer
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authServiceApi.middleware)
      .concat(userServiceApi.middleware)
      .concat(powerServiceApi.middleware)
      .concat(receiptServiceApi.middleware)
      .concat(reportServiceApi.middleware)


      
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
