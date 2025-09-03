import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import AccountContainer from "./AccountContainer/AccountContainer";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import AccountDetails from "./AccountDetails/AccountDetails";
import useAccount from "@hooks/useAccount";

const AccountModal: React.FC<{
  isHidden: boolean;
  onToggleVisibility: () => void;
}> = ({ isHidden, onToggleVisibility }) => {
  const { account } = useAccount();
  const [isSignInPriority, setIsSignInPriority] = useState<boolean>(true);

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

  console.log("account.accountInfo");
  console.log(account.accountInfo);

  useEffect(() => {
    if (isHidden) {
      document.body?.classList.remove("no-scroll");
    } else {
      document.body?.classList.add("no-scroll");
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
          {account.accountInfo ? (
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
