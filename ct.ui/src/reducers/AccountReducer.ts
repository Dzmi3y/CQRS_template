import AccountAction, { AccountActionTypes } from "@actions/AccountAction";
import AccountState from "@states/AccountState";

const AccountReducer = (
  state: AccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SIGN_UP:
      throw new Error("Not implemented");

    case AccountActionTypes.SIGN_IN:
      return { ...state, authData: action.payload };

    case AccountActionTypes.SIGN_OUT:
      return { accountInfo: null, authData: null };

    default:
      return state;
  }
};

export default AccountReducer;
