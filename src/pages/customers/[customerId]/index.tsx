import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { setLoading } from "~/app/slices/commonSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "~/app/services/userService";

import { Grid } from "@mui/material";
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const userId = router?.query?.customerId || "";
  const userDetail = useGetUserByIdQuery(userId);
  const userInfo = userDetail?.data?.data;
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbsCommon data={["customer", "detailCustomer"]} />
          <TitleCommon title={t("customer.detail.title")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <Grid container columnSpacing={6} rowSpacing={6}>
              <Grid item xs={5} className="text-right">
                <div className="font-medium">
                  {t("customer.detail.form.fullName")}:
                </div>
              </Grid>
              <Grid item xs={7} className="">
                {userInfo?.fullName}
              </Grid>

              <Grid item xs={5} className="text-right">
                <div className="font-medium">
                  {t("customer.detail.form.passport")}:
                </div>
              </Grid>
              <Grid item xs={7} className="">
                {userInfo?.passport}
              </Grid>

              <Grid item xs={5} className="">
                <div className="font-medium text-right">
                  {t("customer.detail.form.phoneNumber")}:
                </div>
              </Grid>
              <Grid item xs={7} className="">
                {userInfo?.phoneNumber}
              </Grid>

              <Grid item xs={5} className="text-right">
                <div className="font-medium">
                  {t("customer.detail.form.address")}:
                </div>
              </Grid>
              <Grid item xs={7} className="">
                {userInfo?.address}
              </Grid>

              <Grid item xs={5} className="text-right">
                <div className="font-medium">
                  {t("customer.detail.form.password")}:
                </div>
              </Grid>
              <Grid item xs={7} className="">
                {userInfo?.password}
              </Grid>
              <Grid item xs={10} className="flex justify-center">
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  className="rounded-3xl w-[216px]"
                  onClick={() => {
                    router.push(`/customers/${router?.query?.customerId}/edit`);
                  }}
                  autoFocus
                >
                  {t("common.button.edit")}
                </ButtonCommon>
              </Grid>
            </Grid>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
