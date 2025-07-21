import CartContextType from "./CartContextType";
import { createContext } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;
