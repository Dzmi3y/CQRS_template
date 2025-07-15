import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
}

const BurgerButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <p>Add</p>
    </button>
  );
};

export default BurgerButton;
