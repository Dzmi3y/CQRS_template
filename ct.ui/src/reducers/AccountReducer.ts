import AccountAction, { AccountActionTypes } from "@actions/AccountAction";
import accountCache from "@mixins/Cache/accountCache";
import AccountState from "@states/AccountState";

const AccountReducer = (
  state: AccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SIGN_IN: {
      const newValue = { ...state, authData: action.payload };
      accountCache.set(newValue);
      return newValue;
    }
    case AccountActionTypes.SIGN_OUT: {
      accountCache.clear();
      return { accountInfo: null, authData: null, orderHistory: [] };
    }

    case AccountActionTypes.SET_Account_INFO: {
      const newValue = { ...state, accountInfo: action.payload };
      accountCache.set(newValue);
      return newValue;
    }

    case AccountActionTypes.SET_ORDER_LIST: {
      const newValue = { ...state, orderHistory: action.payload };
      accountCache.set(newValue);
      return newValue;
    }
    default:
      return state;
  }
};

export default AccountReducer;
