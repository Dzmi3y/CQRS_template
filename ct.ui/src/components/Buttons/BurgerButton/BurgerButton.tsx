import React from "react";
import styles from "./styles.module.scss";

interface Props {
  active: boolean;
  onToggle: () => void;
}

const BurgerButton: React.FC<Props> = ({ active, onToggle }) => {
  return (
    <button
      className={`${styles.burger} ${active ? styles.active : ""}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default BurgerButton;
