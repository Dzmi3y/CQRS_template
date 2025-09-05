import CartAction, { CartActionTypes } from "@actions/CartAction";
import CartState from "@states/CartState";
import CartItem from "@models/CartItem";
import cartCache from "@mixins/Cache/cartCache";

const CartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD: {
      let newValue: CartState = [];
      const newProduct = action.payload;
      const existingItem: CartItem | undefined = state.find(
        (item) => item.id === newProduct.id
      );

      if (existingItem) {
        newValue = state.map((item) =>
          item.id === newProduct.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        newValue = [...state, { ...newProduct, quantity: 1 }];
      }

      cartCache.set(newValue);
      return newValue;
    }
    case CartActionTypes.REMOVE: {
      const newValue = state.reduce<CartItem[]>((acc, item) => {
        if (item.id !== action.payload) {
          return [...acc, item];
        }

        if ((item.quantity ?? 1) > 1) {
          return [...acc, { ...item, quantity: (item.quantity ?? 1) - 1 }];
        }

        return acc;
      }, []);

      cartCache.set(newValue);
      return newValue;
    }

    case CartActionTypes.CLEAR: {
      cartCache.clear();
      return [];
    }
    default:
      return state;
  }
};

export default CartReducer;
