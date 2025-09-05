import { useReducer, ReactNode } from "react";
import CartReducer from "@reducers/CartReducer";
import CartContext from "./CartContext";
import cartCache from "@mixins/Cache/cartCache";
import CartState from "@states/CartState";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const init: CartState = cartCache.get();
  const [cart, dispatch] = useReducer(CartReducer, init);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
