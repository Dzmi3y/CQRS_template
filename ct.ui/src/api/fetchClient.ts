import { HttpError } from "@mixins/Errors/HttpError";
import { Exception } from "sass";

export async function fetchClient<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new HttpError(response.status, errorText);
  }

  return response.json() as Promise<T>;
}
