import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { setLoading } from "~/app/slices/commonSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetUserByPassportMutation } from "~/app/services/userService";
import { useGetPreviousPowerMutation } from "~/app/services/powerService";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { REGEX_PASSPORT, REGEX_PHONE_NUMBER } from "~/utils/constants";
import DatePickerCommon from "~/components/common/DatePickerCommon";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import InputCommon from "~/components/common/InputCommon";
import duration from "dayjs/plugin/duration";
import { getLastMonth } from "~/utils/helpers";
dayjs.extend(duration);
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState("");
  const [userByPassport] = useGetUserByPassportMutation();
  const [getPreviousPower] = useGetPreviousPowerMutation();
  const [user, SetUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastMonth, setLastMonth] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const doSubmit = async (value: any) => {
    if (isLoading) return;
  };
  const getCustomer = async (passport: string) => {
    setPassport(passport);
    const result = await userByPassport({ passport });
    if (result) {
      SetUser(result);
    }
  };
  const handleChangeMonth = async (value: string) => {
    const newLastMonth = getLastMonth(
      dayjs(dayjs(value).valueOf()).format("YYYY/MM")
    );
    setLastMonth(newLastMonth);
    console.log("lastMonth", lastMonth);
    console.log("user", user);
    if (newLastMonth && user?.data?._id) {
      const result = await getPreviousPower({
        customerId: user.data._id,
        indexOfMonth: newLastMonth,
      });
    }
  };
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbsCommon data={["energy", "indexCreate"]} />
          <TitleCommon title={t("power.create.title")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <Grid container columnSpacing={6} rowSpacing={6}>
              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="passport"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("power.create.form.passport"),
                    }),
                    pattern: {
                      value: REGEX_PASSPORT,
                      message: t("common.messages.msg003", {
                        field: t("power.create.form.passport"),
                      }),
                    },
                  }}
                  label={`${t("power.create.form.passport")} *`}
                  error={errors.passport}
                  inputProps={{
                    style: {
                      color: errors.passport && "#B33434",
                    },
                  }}
                  onBlur={(e: any) => {
                    getCustomer(e);
                  }}
                  maxLength={256}
                  type="text"
                />
              </Grid>
              <Grid item xs={6} className="">
                <InputCommon
                  value="1"
                  disabled
                  placeholder={t("power.create.form.customerName")}
                  label={t("power.create.form.customerName")}
                />
              </Grid>
              <Grid item xs={6} className="">
                <DatePickerCommon
                  onChange={(value: string) => {
                    handleChangeMonth(value);
                  }}
                  label={t("power.create.form.indexOfMonth")}
                  format={"YYYY-MM"}
                  inputProps={{
                    style: { color: errors.indexOfMonth && "#B33434" },
                  }}
                  control={control}
                  rules={{}}
                  name={"indexOfMonth"}
                  error={errors.indexOfMonth}
                />
              </Grid>
              <Grid item xs={6} className="">
                <InputCommon
                  value="1"
                  disabled
                  placeholder={t("power.create.form.indexLastMonth")}
                  label={t("power.create.form.indexLastMonth")}
                />
              </Grid>

              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="phoneNumber"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("customer.create.form.phoneNumber"),
                    }),
                    pattern: {
                      value: REGEX_PHONE_NUMBER,
                      message: t("common.messages.msg003", {
                        field: t("customer.create.form.phoneNumber"),
                      }),
                    },
                  }}
                  label={`${t("customer.create.form.phoneNumber")} *`}
                  error={errors.phoneNumber}
                  inputProps={{
                    style: {
                      color: errors.phoneNumber && "#B33434",
                    },
                  }}
                  maxLength={10}
                  type="text"
                />
              </Grid>
              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="address"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("customer.create.form.address"),
                    }),
                  }}
                  label={`${t("customer.create.form.address")} *`}
                  error={errors.address}
                  inputProps={{
                    style: {
                      color: errors.address && "#B33434",
                    },
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={6} className="flex justify-end">
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  className="rounded-3xl w-[216px]"
                  variant="outlined"
                  onClick={() => {
                    router.push("/customers");
                  }}
                  autoFocus
                >
                  {t("common.button.cancel")}
                </ButtonCommon>
              </Grid>
              <Grid item xs={6} className="">
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  className="rounded-3xl w-[216px]"
                  onClick={handleSubmit((data) => {
                    doSubmit(data);
                  })}
                  autoFocus
                >
                  {t("common.button.submit")}
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
