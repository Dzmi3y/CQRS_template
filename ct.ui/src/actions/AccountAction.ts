import AccountInfo from "@models/AccountInfo";
import AuthData from "@models/apiData/AuthData";
import OrderInfo from "@models/OrderInfo";
import SignUpContract from "@models/SignUpContract";

export enum AccountActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
  SET_Account_INFO = "SET_Account_INFO",
  SET_ORDER_LIST = "SET_ORDER_LIST",
}

type AccountAction =
  | { type: AccountActionTypes.SIGN_IN; payload: AuthData }
  | { type: AccountActionTypes.SET_Account_INFO; payload: AccountInfo }
  | { type: AccountActionTypes.SET_ORDER_LIST; payload: Array<OrderInfo> }
  | { type: AccountActionTypes.SIGN_OUT };

export default AccountAction;
