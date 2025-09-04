import AccountInfo from "@models/AccountInfo";
import AuthData from "@models/apiData/AuthData";
import OrderInfo from "@models/OrderInfo";

type AccountState = {
  accountInfo: AccountInfo | null;
  authData: AuthData | null;
  orderHistory: OrderInfo[];
};

export default AccountState;
