import AuthData from "./AuthData";
import CreateOrderRequest from "./CreateOrderRequest";

interface OrderPayload {
  authData: AuthData;
  Order: CreateOrderRequest;
}

export default OrderPayload;
