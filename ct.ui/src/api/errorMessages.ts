export const errorMessages: Record<string, string> = {
  "HTTP 401: NoAssociatedUser": "Email doesn't exist",
  "HTTP 401: PasswordIsWrong": "Password is wrong",
};

export const getErrorMessage = (code: string) =>
  errorMessages[code] ?? "Error with api connection";
