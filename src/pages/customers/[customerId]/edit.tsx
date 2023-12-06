import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { setNotify } from "~/app/slices/commonSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef, useMemo } from "react";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { REGEX_PASSPORT, REGEX_PHONE_NUMBER } from "~/utils/constants";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "~/app/services/userService";
import { validatePassword } from "~/utils/helpers";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Grid } from "@mui/material";
export default function CreateCustomer() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = router?.query?.customerId || "";
  const [showPassword, setShowPassword] = useState(false);
  const [isOutSide, setIsOutSide] = useState(false);

  const [loading, setLoading] = useState(true);
  const userDetail = useGetUserByIdQuery(userId);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (event.target.name === "username") return;
      if (ref && ref?.current && !ref.current?.contains(event.target)) {
        setIsOutSide(true);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const clickEye = (showPassword: boolean) => {
    setShowPassword(showPassword);
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    values: useMemo(() => {
      const userInfo = userDetail?.data?.data || {};
      return {
        fullName: userInfo?.fullName || "",
        passport: userInfo?.passport || "",
        phoneNumber: userInfo?.phoneNumber || "",
        address: userInfo?.address || "",
        password: userInfo?.password || "",
      };
    }, [userDetail]),
  });

  const doSubmit = async (data: any) => {
    const result = await updateUser({
      id: userId,
      payload: data,
    });
    if (result) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg007"),
          typeAlert: "success",
        })
      );
      router.push(`/customers/${userId}`);
    }
  };
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbsCommon
            data={["customer", "detailCustomer", "editCustomer"]}
          />
          <TitleCommon title={t("customer.create.edit")} />
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
              <Grid item xs={6} className="" ref={ref}>
                <InputHasValidate
                  control={control}
                  name="password"
                  className={`${showPassword ? "" : "password-security"}`}
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("login.payload.password"),
                    }),
                    validate: (value: string) =>
                      validatePassword(value, t("common.messages.msg002")),
                  }}
                  label={t("login.payload.password")}
                  error={isOutSide ? errors.password : null}
                  inputProps={{
                    style: { color: errors.password && "#B33434" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="bg-white hover:bg-white"
                          onClick={() => clickEye(!showPassword)}
                          edge="end"
                          style={{ color: errors.password && "#B33434" }}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon
                              className={
                                errors.password && isOutSide
                                  ? "fill-error"
                                  : "fill-neutral-09"
                              }
                            />
                          ) : (
                            <VisibilityOutlinedIcon
                              className={
                                errors.password && isOutSide
                                  ? "fill-error"
                                  : "fill-neutral-09"
                              }
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  maxLength={256}
                  attribute={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={6} className="flex justify-end"></Grid>
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
                  {t("common.button.save")}
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
