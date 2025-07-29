import Product from "@models/Product";

export enum CartActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR",
}

type CartAction =
  | { type: CartActionTypes.ADD; payload: Product }
  | { type: CartActionTypes.REMOVE; payload: string }
  | { type: CartActionTypes.CLEAR };

export default CartAction;
