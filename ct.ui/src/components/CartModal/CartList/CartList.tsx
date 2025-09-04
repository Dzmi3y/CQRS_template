import useCart from "@hooks/useCart";
import styles from "./styles.module.scss";
import { CartActionTypes } from "@actions/CartAction";
import Product from "@models/Product";
import CartControlButton from "@components/Buttons/CartControlButton/CartControlButton";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import React from "react";
import OrderButton from "@components/Buttons/OrderButton/OrderButton";
import { BASE_URL } from "@api/apiConfig";
import { useMutation } from "@tanstack/react-query";
import { setOrder } from "@api/orderApi";
import ShortOrderItem from "@models/apiData/ShortOrderItem";
import useAccount from "@hooks/useAccount";
import CreateOrderRequest from "@models/apiData/CreateOrderRequest";
import OrderPayload from "@models/apiData/OrderPayload";

const CartList: React.FC<{ onToggleVisibility: () => void }> = ({
  onToggleVisibility,
}) => {
  const { cart, dispatch } = useCart();
  const { account } = useAccount();

  const mutation = useMutation({
    mutationFn: setOrder,
    onSuccess: (data) => {
      dispatch({ type: CartActionTypes.CLEAR });
      console.log("Order created");
      console.log(data);
    },
    onError: (error) => {
      console.error("Order error:", error);
    },
  });

  const add = (currentProduct: Product) => {
    dispatch({ type: CartActionTypes.ADD, payload: currentProduct });
  };

  const createOrder = () => {
    const orderItems: ShortOrderItem[] | null = cart.map((item) => ({
      ProductId: item.id,
      Quantity: item.quantity,
    }));

    if (account.authData && orderItems) {
      const newOrder: CreateOrderRequest = { OrderList: orderItems };
      const orderPayload: OrderPayload = {
        authData: account.authData,
        Order: newOrder,
      };
      console.log("newOrder");
      console.log(orderPayload);
      mutation.mutate(orderPayload);
    }
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
              <img
                className={styles.image}
                src={`${BASE_URL}/${item.imageUrl}`}
              />
              <div className={styles.infoContainer}>
                <div>
                  <div className={styles.title}> {item.name} </div>
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
        {cart.length !== 0 && account.authData && (
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
