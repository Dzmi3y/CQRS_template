import useCart from "@hooks/useCart";
import styles from "./styles.module.scss";
import { CartActionTypes } from "@actions/CartAction";
import Product from "@models/Product";
import CartControlButton from "@components/Buttons/CartControlButton/CartControlButton";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import React from "react";
import OrderButton from "@components/Buttons/OrderButton/OrderButton";

const CartList: React.FC<{ onToggleVisibility: () => void }> = ({
  onToggleVisibility,
}) => {
  const { cart, dispatch } = useCart();
  const add = (currentProduct: Product) => {
    dispatch({ type: CartActionTypes.ADD, payload: currentProduct });
  };

  const createOrder = () => {
    dispatch({ type: CartActionTypes.CLEAR });
    console.log("order created");
  };

  const remove = (currentProduct: Product) => {
    dispatch({ type: CartActionTypes.REMOVE, payload: currentProduct.id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CloseButton onClick={() => onToggleVisibility()} />
      </div>
      {!cart.length && <div className={styles.emptyCart}>CART IS EMPTY</div>}

      <div className={styles.cardContainer}>
        <div>
          {cart.map((item) => (
            <div className={styles.card} key={item.id}>
              <img className={styles.image} src={item.imageSrc} />
              <div className={styles.infoContainer}>
                <div>
                  <div className={styles.title}> {item.title} </div>
                  <div className={styles.cardInfo}>
                    Price: <b>{item.price}$</b> Quantity: <b>{item.quantity}</b>
                  </div>
                </div>
                <div className={styles.buttonsContainer}>
                  <CartControlButton onClick={() => add(item)}>
                    +
                  </CartControlButton>
                  <CartControlButton onClick={() => remove(item)}>
                    -
                  </CartControlButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length !== 0 && (
          <div className={styles.orderPanel}>
            <OrderButton onClick={() => createOrder()}>
              Buy{" "}
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              {"$"}
            </OrderButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
