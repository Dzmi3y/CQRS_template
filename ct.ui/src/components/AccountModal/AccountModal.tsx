import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import AccountContainer from "./AccountContainer/AccountContainer";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import AccountDetails from "./AccountDetails/AccountDetails";
import useAccount from "@hooks/useAccount";
import { info } from "@api/accountApi";
import { useMutation } from "@tanstack/react-query";
import { AccountActionTypes } from "@actions/AccountAction";
import { getOrder } from "@api/orderApi";

const AccountModal: React.FC<{
  isHidden: boolean;
  onToggleVisibility: () => void;
}> = ({ isHidden, onToggleVisibility }) => {
  const { account, dispatch } = useAccount();
  const [isSignInPriority, setIsSignInPriority] = useState<boolean>(true);

  const orderHistoryMutation = useMutation({
    mutationFn: getOrder,
    onSuccess: (data) => {
      dispatch({ type: AccountActionTypes.SET_ORDER_LIST, payload: data });
      console.log("Order list:");
      console.log(data);
    },
    onError: (error) => {
      console.error("Order list load error:", error);
    },
  });

  const accountInfoMutation = useMutation({
    mutationFn: info,
    onSuccess: (data) => {
      dispatch({ type: AccountActionTypes.SET_Account_INFO, payload: data });
      onSignInComplete();
    },
    onError: (error) => {
      console.error("InfoApi error:", error);
    },
  });

  const onClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onToggleVisibility();
    }
  };

  const onSignInComplete = () => {
    console.log("sign in complete");
    onToggleVisibility();
  };

  const onSignUpComplete = () => {
    console.log("sign up complete");
    onToggleVisibility();
  };
  const onSignOutComplete = () => {
    console.log("sign out complete");
    onToggleVisibility();
  };

  useEffect(() => {
    if (account.authData) {
      accountInfoMutation.mutate(account.authData);
    } else {
      console.error("authData is null");
    }
  }, [account.authData]);

  useEffect(() => {
    if (isHidden) {
      document.body?.classList.remove("no-scroll");
    } else {
      document.body?.classList.add("no-scroll");
      if (account.authData) {
        orderHistoryMutation.mutate(account.authData);
      }
    }
  }, [isHidden]);
  return (
    <div
      onClick={(e) => onClickBackground(e)}
      className={`${styles.container} ${
        isHidden ? styles.hidden : styles.shown
      }`}
    >
      <div className={styles.content}>
        <AccountContainer onToggleVisibility={() => onToggleVisibility()}>
          {account.authData ? (
            <AccountDetails onSignOutComplete={onSignOutComplete} />
          ) : (
            <div>
              <button
                className={styles.switchButton}
                onClick={() => setIsSignInPriority(!isSignInPriority)}
              >
                {isSignInPriority ? "Sign Out" : "Sign In"}
              </button>
              {isSignInPriority ? (
                <SignIn onSignInComplete={onSignInComplete} />
              ) : (
                <SignUp onSignUpComplete={onSignUpComplete} />
              )}
            </div>
          )}
        </AccountContainer>
      </div>
    </div>
  );
};

export default AccountModal;
