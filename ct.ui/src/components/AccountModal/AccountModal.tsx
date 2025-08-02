import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import AccountContainer from "./AccountContainer/AccountContainer";
import SignUp from "./SignUp/SignUp";

const AccountModal: React.FC<{
  isHidden: boolean;
  onToggleVisibility: () => void;
}> = ({ isHidden, onToggleVisibility }) => {
  const onClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onToggleVisibility();
    }
  };

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
          <SignUp />
        </AccountContainer>
      </div>
    </div>
  );
};

export default AccountModal;
