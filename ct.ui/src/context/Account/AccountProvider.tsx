import { useReducer, ReactNode } from "react";
import AccountReducer from "@reducers/AccountReducer";
import AccountContext from "./AccountContext";
import AccountState from "@states/AccountState";

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const init: AccountState = { accountInfo: null, authData: null };
  const [account, dispatch] = useReducer(AccountReducer, init);
  return (
    <AccountContext.Provider value={{ account, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
