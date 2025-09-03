import { useContext } from "react";
import AccountContextType from "@context/Account/AccountContextType";
import AccountContext from "@context/Account/AccountContext";

const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};

export default useAccount;
