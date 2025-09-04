import Product from "@models/Product";
import { fetchClient } from "./fetchClient";
import { PRODUCTS_URL_API } from "./apiConfig";

export const getProducts = async (isSet: boolean): Promise<Product[]> => {
  return fetchClient<Product[]>(`${PRODUCTS_URL_API}?count=10&IsSet=${isSet}`);
};

// export const getProducts = async (payload: CreateUserPayload): Promise<User> => {
//   return fetchClient<User>(`${BASE_URL}/users`, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// };
