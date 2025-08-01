import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const OrderButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default OrderButton;
