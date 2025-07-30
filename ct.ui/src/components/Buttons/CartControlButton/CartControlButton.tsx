import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const CartControlButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <p>{children}</p>
    </button>
  );
};

export default CartControlButton;
