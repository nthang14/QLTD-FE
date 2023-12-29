import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { readProfile } from "~/utils/storage";
import { Grid } from "@mui/material";
import { NoSsr } from "@mui/material";
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const userInfo = readProfile();
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <TitleCommon title={t("myProfile.title")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <NoSsr>
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
              </Grid>
            </NoSsr>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
