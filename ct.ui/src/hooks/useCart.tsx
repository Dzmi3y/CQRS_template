import { useContext } from "react";
import CartContext from "src/context/Cart/CartContext";
import CartContextType from "src/context/Cart/CartContextType";

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;
