import AccountAction from "src/actions/AccountAction";
import AccountState from "src/states/AccountState";

interface AccountContextType {
  account: AccountState;
  dispatch: React.Dispatch<AccountAction>;
}

export default AccountContextType;
