import Product from "@models/Product";
import { fetchClient } from "./fetchClient";
import { BASE_URL_API } from "./apiConfig";

export const getProducts = async (): Promise<Product[]> => {
  return fetchClient<Product[]>(`${BASE_URL_API}/products?count=10`);
};

// export const getProducts = async (payload: CreateUserPayload): Promise<User> => {
//   return fetchClient<User>(`${BASE_URL}/users`, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// };
