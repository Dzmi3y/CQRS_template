import useCart from "@hooks/useCart";
import styles from "./styles.module.scss";
import { CartActionTypes } from "@actions/CartAction";
import Product from "@models/Product";

const CartList = () => {
  const { cart, dispatch } = useCart();
  const add = (currentProduct: Product) => {
    dispatch({ type: CartActionTypes.ADD, payload: currentProduct });
  };

  const remove = (currentProduct: Product) => {
    dispatch({ type: CartActionTypes.REMOVE, payload: currentProduct.id });
  };

  return (
    <div className={styles.container}>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.imageSrc} />
          <div>
            {item.title}
            {item.price}
            {item.quantity}
            <div>
              <button onClick={() => add(item)}>+</button>
              <button onClick={() => remove(item)}>-</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
