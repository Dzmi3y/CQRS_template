import CartState from "@states/CartState";

const cartCache = {
  get: (): CartState => JSON.parse(localStorage.getItem("cart") || "[]"),
  set: (cart: CartState) => localStorage.setItem("cart", JSON.stringify(cart)),
  clear: () => localStorage.setItem("cart", "[]"),
};

export default cartCache;
