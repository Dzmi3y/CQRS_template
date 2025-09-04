import AccountAction, { AccountActionTypes } from "@actions/AccountAction";
import AccountState from "@states/AccountState";

const AccountReducer = (
  state: AccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SIGN_IN:
      return { ...state, authData: action.payload };

    case AccountActionTypes.SIGN_OUT:
      return { accountInfo: null, authData: null };

    case AccountActionTypes.SET_Account_INFO:
      return { ...state, accountInfo: action.payload };

    default:
      return state;
  }
};

export default AccountReducer;
