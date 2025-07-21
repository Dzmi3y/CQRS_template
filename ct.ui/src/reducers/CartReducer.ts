import CartAction from "src/actions/CartAction";
import CartState from "src/states/CartState";
import CartItem from "src/models/CartItem";

const CartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
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
    case "REMOVE": {
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

    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export default CartReducer;
