import AccountInfo from "@models/AccountInfo";
import AuthData from "@models/apiData/AuthData";

type AccountState = {
  accountInfo: AccountInfo | null;
  authData: AuthData | null;
};

export default AccountState;
