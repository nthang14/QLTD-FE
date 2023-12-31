export const ORDER_ASCEND = "ascend";
export const ORDER_DESCEND = "descend";
export const PATH_API = "http://localhost:8080";
export const PATH_API_TEST: string = "http://localhost:8000/api/v1";
export const URL_AUTH = "/auth";
export const METHOD = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};
export const REGEX_ADDRESS = /\w{8,}$/im;
export const REGEX_PASSPORT = /\d{12}$/im;
export const REGEX_PHONE_NUMBER = /\d{10}$/im;
export const REGEX_EMAIL =
  /^[a-zA-Z0-9]{8,}$|^(?=.{8,256}$)[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)?@[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)[.]{1}[a-zA-Z]{2,}$/gm;
export const REGEX_EMAIL_CONTACT =
  /^(?=.{8,256}$)[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)?@[a-zA-Z0-9]+([._-]{0,1}[a-zA-Z0-9]+)[.]{1}[a-zA-Z]{2,}$/gm;
export const TYPE = {
  in: "IN",
  out: "OUT",
};
export const STATUS_TRANSACTION = {
  pending: "pending",
  completed: "completed",
};
export const BLOCK_NUMBER_PENDING = -1;
export const LOGOUT = "log out";
export const AUTH_LOGIN = "/auth/login";
export const ENDPOINT_LOGIN = "authLogin";
export const REGEX_TITLE = /^.{1,256}$/gm;
export const REGEX_DECIMAL = /^((?!0)\d{1,18}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/gm;
export const MIN_DATE = "2023-06-01";
export const MAX_DATE = "2100-12-31";
export const AUTO_REMOVE_WHITESPACE = ["password", "toAddress", "username"];
export const REGEX_PASSWORD_INCLUDES_NUMBER = /[0-9]/;
export const REGEX_PASSWORD_MIN_MAX = /^(?=.{8,256}$)/;
export const REGEX_PASSWORD_INCLUDES_LOWER_CASE = /[a-z]/;
export const REGEX_PASSWORD_INCLUDES_UPPER_CASE = /[A-Z]/;
export const REGEX_PASSWORD_INCLUDES_SPECIAL_CHARACTERS =
  /[~`!@#$%^&*()\-_+={}\[\]\\|:;"'<>,.?]/;
export const REGEX_FULL_WIDTH = /[０-９]/;
export const ROLE_ADMIN = {
  value: 0,
  text: "Admin",
};
export const ROLE_USER = {
  value: 1,
  text: "User",
};
export const MAX_LENGTH_DECIMAL = 18;
export const AUTHORIZATION = "Unauthorized";
export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 10;
