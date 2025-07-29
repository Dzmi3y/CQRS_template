import React from "react";
import styles from "./styles.module.scss";
import CartList from "./CartList/CartList";

const CartModal: React.FC<{
  isHidden: boolean;
  onToggleVisibility: () => void;
}> = ({ isHidden, onToggleVisibility }) => {
  return (
    <div
      onClick={() => onToggleVisibility()}
      className={`${styles.container} ${
        isHidden ? styles.hidden : styles.shown
      }`}
    >
      <div className={styles.content}>
        <CartList />
      </div>
    </div>
  );
};

export default CartModal;
