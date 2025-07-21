import CartAction from "src/actions/CartAction";
import CartState from "src/states/CartState";

interface CartContextType {
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
}

export default CartContextType;
