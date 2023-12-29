import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "~/app/services/userService";

import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import duration from "dayjs/plugin/duration";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import { validatePassword } from "~/utils/helpers";
import { PassThrough } from "stream";

dayjs.extend(duration);
export default function ChangePassword() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [changePassword] = useChangePasswordMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const validateConfirmPassword = (value: string, message: string) => {
    const password = getValues("newPassword");
    if (value !== password) {
      return t("common.messages.msg018");
    }
    validatePassword(value, message);
  };
  const doSubmit = async (value: any) => {
    if (isLoading) return;
    const payload = {
      password: value.newPassword,
    };
    const result: any = await changePassword(payload);
    if (result && result?.data?.data) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg017"),
          typeAlert: "success",
        })
      );
      router.push("/user/receipts");
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
          <TitleCommon title={t("user.changePassword")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <Grid container columnSpacing={6} rowSpacing={6}>
              <Grid item xs={12} className="">
                <InputHasValidate
                  control={control}
                  name="newPassword"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("user.newPassword"),
                    }),
                    validate: (value: string) =>
                      validatePassword(value, t("common.messages.msg002")),
                  }}
                  label={`${t("user.newPassword")} *`}
                  error={errors.newPassword}
                  inputProps={{
                    style: {
                      color: errors.newPassword && "#B33434",
                    },
                  }}
                  maxLength={256}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} className="">
                <InputHasValidate
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("user.confirmPassword"),
                    }),
                    validate: (value: string) =>
                      validateConfirmPassword(
                        value,
                        t("common.messages.msg002")
                      ),
                  }}
                  label={`${t("user.confirmPassword")} *`}
                  error={errors.confirmPassword}
                  inputProps={{
                    style: {
                      color: errors.confirmPassword && "#B33434",
                    },
                  }}
                  maxLength={256}
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
                    router.push("/user/receipts");
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
