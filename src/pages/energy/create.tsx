import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetUserByPassportMutation } from "~/app/services/userService";
import {
  useGetPreviousPowerMutation,
  useCreatePowersMutation,
} from "~/app/services/powerService";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { REGEX_PASSPORT } from "~/utils/constants";
import DatePickerCommon from "~/components/common/DatePickerCommon";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import InputCommon from "~/components/common/InputCommon";
import duration from "dayjs/plugin/duration";
import { getLastMonth } from "~/utils/helpers";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
dayjs.extend(duration);
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState("");
  const [userByPassport] = useGetUserByPassportMutation();
  const [getPreviousPower] = useGetPreviousPowerMutation();
  const [createPowers] = useCreatePowersMutation();
  const [user, setUser] = useState<any>(null);
  const [lastIndex, setLastIndex] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [lastMonth, setLastMonth] = useState("");
  const [indexOfMonth, setIndexOfMonth] = useState("");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const getCustomer = async (passport: string) => {
    setPassport(passport);
    const result: any = await userByPassport({ passport });
    if (result) {
      setUser(result?.data);
    } else {
      setUser(null);
    }
  };
  const handleChangeMonth = async (value: string) => {
    const newLastMonth = getLastMonth(
      dayjs(dayjs(value).valueOf()).format("YYYY/MM")
    );
    if (newLastMonth && user?._id) {
      setIndexOfMonth(dayjs(dayjs(value).valueOf()).format("YYYY/MM"));
      const result: any = await getPreviousPower({
        customerId: user._id,
        indexOfMonth: newLastMonth,
      });
      if (result && result?.data && result?.data?.index) {
        setLastIndex(result?.data?.index);
      }
      setLastMonth(newLastMonth);
    }
  };
  const validateIndex = (value: number, message: string) => {
    if (value <= 0) {
      return message;
    }
    if (value <= lastIndex) {
      return message;
    }
    return true;
  };
  const doSubmit = async (value: any) => {
    if (isLoading) return;
    const { index, note, passport } = value;
    const payload = {
      index: parseInt(index),
      note: note || "",
      passport: passport,
      lastIndex: lastIndex || 0,
      indexOfMonth,
      customerId: user._id,
    };
    const result: any = await createPowers(payload);
    if (result && result?.data?.data) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg009"),
          typeAlert: "success",
        })
      );
      router.push("/energy");
    } else {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: result?.data?.message,
          typeAlert: "error",
        })
      );
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
              <Grid item xs={12} className="">
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
                  value={user?.fullName || ""}
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
                  disabled={!user?.fullName}
                  control={control}
                  rules={{}}
                  name="indexOfMonth"
                  error={errors.indexOfMonth}
                />
              </Grid>
              <Grid item xs={6} className="">
                <InputCommon
                  value={lastIndex}
                  disabled
                  placeholder={t("power.create.form.indexLastMonth")}
                  label={t("power.create.form.indexLastMonth")}
                />
              </Grid>

              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="index"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("power.create.form.index"),
                    }),
                    validate: (value: string) =>
                      validateIndex(value, t("common.messages.msg008")),
                  }}
                  label={`${t("power.create.form.index")} *`}
                  error={errors.index}
                  inputProps={{
                    style: {
                      color: errors.index && "#B33434",
                    },
                  }}
                  maxLength={10}
                  type="number"
                />
              </Grid>

              <Grid item xs={12} className="">
                <InputHasValidate
                  className="h-full"
                  control={control}
                  name="note"
                  rules={{}}
                  label={`${t("power.create.form.note")}`}
                  error={errors.note}
                  inputProps={{
                    style: {
                      color: errors.note && "#B33434",
                    },
                  }}
                  multiline
                  maxRows={4}
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
                    router.push("/energy");
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
