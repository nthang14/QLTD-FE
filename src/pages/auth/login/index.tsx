import { useAuthLoginMutation } from "~/app/services/authService";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import ButtonCommon from "~/components/common/ButtonCommon";
import { REGEX_EMAIL, ROLE_ADMIN, ROLE_USER } from "~/utils/constants";
import { saveAccessToken, saveProfile } from "~/utils/storage";
import { useTranslations } from "next-intl";
import "./style.scss";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { validatePassword } from "~/utils/helpers";

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({ mode: "onBlur" });

  const t = useTranslations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useAuthLoginMutation();
  const [isOutSide, setIsOutSide] = useState(false);
  const handleLogin = async (value: any) => {
    if (isLoading) return;
    setIsLoading(true);
    const result: any = await login(value);

    if (!!result && result?.data?.success) {
      saveAccessToken(result?.data?.data?.access_token || "");
      const profile = result?.data?.data?.profile || {};
      saveProfile(profile);
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg005"),
          typeAlert: "success",
        })
      );
      if (profile.level === ROLE_ADMIN.value) {
        router.push("/");
      }
      if (profile.level === ROLE_USER.value) {
        router.push(profile.first ? "/user/change-password" : "/user/receipts");
      }
      return;
    } else {
      const data: any = result.data?.data;
      setError("password", {
        type: "manual",
        message: t("common.messages.msg002"),
      });
      setError("username", {
        type: "manual",
        message: t("common.messages.msg002email"),
      });
    }
    setIsLoading(false);
  };
  const [first, setFirst] = useState(true);
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (event.target.name === "username") return;
      if (
        ref &&
        ref?.current &&
        !ref.current?.contains(event.target) &&
        first
      ) {
        setIsOutSide(true);
        setFirst(false);
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
  return (
    <article id="login-page">
      <div className="login-page container mx-auto flex items-center min-h-screen justify-center">
        <div className="login-wrap">
          <div className="form-login flex justify-around items-center  py-20 gap-x-16">
            <div>
              <div className="title">
                <div className="flex justify-center w-full pb-5">
                  <Typography
                    variant="h3"
                    align="center"
                    className="pni-text-title text-center font-bold w-100"
                  >
                    {t("login.title")}
                  </Typography>
                </div>

                <span className="pni-text-base">{t("login.sub_title")}</span>
              </div>
              <div className="text-field  pb-5">
                <InputHasValidate
                  control={control}
                  name="username"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("login.payload.username"),
                    }),
                    pattern: {
                      value: REGEX_EMAIL,
                      message: t("common.messages.msg002"),
                    },
                  }}
                  label={t("login.payload.username")}
                  error={errors.username}
                  inputProps={{
                    style: { color: errors.username && "#B33434" },
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
                <div ref={ref} className="w-full  pb-5">
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
                </div>
                <div className="form-button">
                  <ButtonCommon
                    color="primary"
                    size="large"
                    variant="contained"
                    className="rounded-3xl w-full"
                    onClick={handleSubmit(handleLogin)}
                  >
                    {t("login.button")}
                  </ButtonCommon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
