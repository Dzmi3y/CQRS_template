import DetailedOrderItem from "./DetailedOrderItem";

interface OrderInfo {
  Id: string;
  Address: string;
  PhoneNumber: string;
  Status: string;
  CreatedAt: Date;
  OrderItems: Array<DetailedOrderItem>;
}

export default OrderInfo;
