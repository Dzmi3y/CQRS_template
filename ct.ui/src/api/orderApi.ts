import { fetchClient } from "./fetchClient";
import { ORDERS_URL_API } from "./apiConfig";
import OrderInfo from "@models/OrderInfo";
import CreateOrderResult from "@models/apiData/CreateOrderResult";
import accountCache from "@mixins/Cache/accountCache";
import CreateOrderRequest from "@models/apiData/CreateOrderRequest";

export const setOrder = async (
  payload: CreateOrderRequest
): Promise<CreateOrderResult> => {
  const account = accountCache.get();
  return fetchClient<CreateOrderResult>(`${ORDERS_URL_API}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${account.authData?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const getOrder = async (): Promise<Array<OrderInfo>> => {
  const account = accountCache.get();
  return fetchClient<Array<OrderInfo>>(`${ORDERS_URL_API}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${account.authData?.accessToken}`,
    },
  });
};
