import CartAction, { CartActionTypes } from "@actions/CartAction";
import CartState from "@states/CartState";
import CartItem from "@models/CartItem";

const CartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD: {
      const newProduct = action.payload;
      const existingItem: CartItem | undefined = state.find(
        (item) => item.id === newProduct.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === newProduct.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...state, { ...newProduct, quantity: 1 }];
      }
    }
    case CartActionTypes.REMOVE: {
      return state.reduce<CartItem[]>((acc, item) => {
        if (item.id !== action.payload) {
          return [...acc, item];
        }

        if ((item.quantity ?? 1) > 1) {
          return [...acc, { ...item, quantity: (item.quantity ?? 1) - 1 }];
        }

        return acc;
      }, []);
    }

    case CartActionTypes.CLEAR:
      return [];
    default:
      return state;
  }
};

export default CartReducer;
