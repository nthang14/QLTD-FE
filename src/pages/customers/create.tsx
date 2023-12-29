import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { setLoading } from "~/app/slices/commonSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "~/app/services/userService";
import { setNotify } from "~/app/slices/commonSlice";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { REGEX_PASSPORT, REGEX_PHONE_NUMBER } from "~/utils/constants";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [createUser] = useCreateUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const doSubmit = async (value: any) => {
    if (isLoading) return;
    const result: any = await createUser(value);
    if (result) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg012"),
          typeAlert: "success",
        })
      );
      router.push("/customers");
    }
  };
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbsCommon data={["customer", "customerCreate"]} />
          <TitleCommon title={t("customer.create.title")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <Grid container columnSpacing={6} rowSpacing={6}>
              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="fullName"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("customer.create.form.fullName"),
                    }),
                  }}
                  label={`${t("customer.create.form.fullName")} *`}
                  error={errors.fullName}
                  inputProps={{
                    style: {
                      color: errors.fullName && "#B33434",
                    },
                  }}
                  maxLength={256}
                  type="text"
                />
              </Grid>
              <Grid item xs={6} className="">
                <InputHasValidate
                  control={control}
                  name="passport"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("customer.create.form.passport"),
                    }),
                    pattern: {
                      value: REGEX_PASSPORT,
                      message: t("common.messages.msg003", {
                        field: t("customer.create.form.passport"),
                      }),
                    },
                  }}
                  label={`${t("customer.create.form.passport")} *`}
                  error={errors.passport}
                  inputProps={{
                    style: {
                      color: errors.passport && "#B33434",
                    },
                  }}
                  maxLength={256}
                  type="text"
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
