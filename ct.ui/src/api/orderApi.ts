import { fetchClient } from "./fetchClient";
import { ORDERS_URL_API } from "./apiConfig";
import AuthData from "@models/apiData/AuthData";
import OrderInfo from "@models/OrderInfo";
import OrderPayload from "@models/apiData/OrderPayload";
import CreateOrderResult from "@models/apiData/CreateOrderResult";

export const setOrder = async (
  payload: OrderPayload
): Promise<CreateOrderResult> => {
  console.log("OrderItems");
  console.log(JSON.stringify(payload.Order));
  return fetchClient<CreateOrderResult>(`${ORDERS_URL_API}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${payload.authData.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload.Order),
  });
};

export const getOrder = async (
  payload: AuthData
): Promise<Array<OrderInfo>> => {
  return fetchClient<Array<OrderInfo>>(`${ORDERS_URL_API}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${payload.accessToken}`,
    },
  });
};
