import DetailedOrderItem from "./DetailedOrderItem";

interface OrderInfo {
  id: string;
  address: string;
  phoneNumber: string;
  status: string;
  createdAt: Date;
  orderItems: Array<DetailedOrderItem>;
}

export default OrderInfo;
