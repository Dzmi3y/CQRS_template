import useCart from "@hooks/useCart";
import styles from "./styles.module.scss";
import { CartActionTypes } from "@actions/CartAction";
import Product from "@models/Product";
import CartControlButton from "@components/Buttons/CartControlButton/CartControlButton";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import React from "react";
import OrderButton from "@components/Buttons/OrderButton/OrderButton";

const AccountContainer: React.FC<{
  onToggleVisibility: () => void;
  children: React.ReactNode;
}> = ({ onToggleVisibility, children }) => {
  //   const { cart, dispatch } = useCart();
  //   const add = (currentProduct: Product) => {
  //     dispatch({ type: CartActionTypes.ADD, payload: currentProduct });
  //   };

  //   const createOrder = () => {
  //     dispatch({ type: CartActionTypes.CLEAR });
  //     console.log("order created");
  //   };

  //   const remove = (currentProduct: Product) => {
  //     dispatch({ type: CartActionTypes.REMOVE, payload: currentProduct.id });
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CloseButton onClick={() => onToggleVisibility()} />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AccountContainer;
