import AccountAction, { AccountActionTypes } from "@actions/AccountAction";
import AccountState from "@states/AccountState";

const AccountReducer = (
  state: AccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SIGNUP:
      return {
        accountInfo: {
          userId: "1",
          userEmail: action.payload.Email,
          userName: "username",
        },
      };

    case AccountActionTypes.SIGN_IN:
      return {
        accountInfo: {
          userId: "1",
          userEmail: action.payload.Email,
          userName: "username",
        },
      };

    case AccountActionTypes.SIGN_OUT:
      return { accountInfo: null };

    default:
      return state;
  }
};

export default AccountReducer;
