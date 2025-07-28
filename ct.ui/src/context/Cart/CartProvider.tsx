import { useReducer, ReactNode } from "react";
import CartReducer from "@reducers/CartReducer";
import CartContext from "./CartContext";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
