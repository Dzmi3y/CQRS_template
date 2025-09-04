import AuthData from "@models/apiData/AuthData";
import SignUpContract from "@models/SignUpContract";

export enum AccountActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type AccountAction =
  | { type: AccountActionTypes.SIGN_IN; payload: AuthData }
  | { type: AccountActionTypes.SIGN_UP; payload: SignUpContract }
  | { type: AccountActionTypes.SIGN_OUT };

export default AccountAction;
