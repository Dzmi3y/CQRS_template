import AccountContextType from "./AccountContextType";
import { createContext } from "react";

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export default AccountContext;
