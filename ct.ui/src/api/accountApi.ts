import { fetchClient } from "./fetchClient";
import {
  INFO_URL_API,
  LOGIN_URL_API,
  LOGOUT_URL_API,
  REFRESH_TOKEN_API,
  REGISTER_URL_API,
} from "./apiConfig";
import AuthData from "@models/apiData/AuthData";
import SignInContract from "@models/SignInContract";
import LogoutData from "@models/apiData/LogoutData";
import AccountInfo from "@models/AccountInfo";
import SignUpContract from "@models/SignUpContract";
import RegisterResult from "@models/apiData/RegisterResult";
import accountCache from "@mixins/Cache/accountCache";

export const register = async (
  payload: SignUpContract
): Promise<RegisterResult> => {
  return fetchClient<RegisterResult>(`${REGISTER_URL_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const login = async (payload: SignInContract): Promise<AuthData> => {
  return fetchClient<AuthData>(`${LOGIN_URL_API}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const logout = async (): Promise<LogoutData> => {
  const account = accountCache.get();
  return fetchClient<LogoutData>(`${LOGOUT_URL_API}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${account.authData?.accessToken}`,
    },
  });
};

export const info = async (): Promise<AccountInfo> => {
  const account = accountCache.get();
  return fetchClient<AccountInfo>(`${INFO_URL_API}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${account.authData?.accessToken}`,
    },
  });
};

export const refresh = async (): Promise<AuthData> => {
  const account = accountCache.get();
  return fetchClient<AuthData>(`${REFRESH_TOKEN_API}`, {
    method: "post",
    body: JSON.stringify({
      refreshToken: account.authData?.refreshToken,
    }),
  });
};
