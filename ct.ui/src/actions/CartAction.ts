import Product from "@models/Product";

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" };

export default CartAction;
