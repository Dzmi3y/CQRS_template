import AccountState from "@states/AccountState";

const defaultValue: AccountState = {
  accountInfo: null,
  authData: null,
  orderHistory: [],
};

const accountCache = {
  get: (): AccountState =>
    JSON.parse(localStorage.getItem("account") || JSON.stringify(defaultValue)),
  set: (account: AccountState) =>
    localStorage.setItem("account", JSON.stringify(account)),
  clear: () => localStorage.setItem("account", JSON.stringify(defaultValue)),
};

export default accountCache;
