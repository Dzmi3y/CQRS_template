import React, { useState } from "react";
import styles from "./styles.module.scss";
import AccountInfo from "@models/AccountInfo";
import OrderInfo from "@models/OrderInfo";
import AccordionItem from "@components/AccordionItem/AccordionItem";

const AccountDetails: React.FC<{ onSignOutComplete: () => void }> = ({
  onSignOutComplete,
}) => {
  const [accountInfo, SetAccountInfo] = useState<AccountInfo>({
    userEmail: "test@test.com",
    userId: "test",
    userName: "Test User",
  });

  const [orderInfoList, SetOrderInfoList] = useState<Array<OrderInfo>>([
    {
      Id: "1",
      Address: "Sweet Street 1",
      Status: "Pending",
      CreatedAt: new Date(),
      PhoneNumber: "123456",
      OrderItems: [
        {
          ProductId: "1",
          ProductName: "Macaron - Vanilla",
          Price: 120,
          Quantity: 1,
        },
      ],
    },
    {
      Id: "2",
      Address: "Sweet Street 2",
      Status: "Shipped",
      CreatedAt: new Date(),
      PhoneNumber: "654321",
      OrderItems: [
        {
          ProductId: "2",
          ProductName: "Macaron - Raspberry",
          Price: 130,
          Quantity: 2,
        },
        {
          ProductId: "3",
          ProductName: "Macaron - Pistachio",
          Price: 140,
          Quantity: 1,
        },
      ],
    },
    {
      Id: "3",
      Address: "Sweet Street 3",
      Status: "Delivered",
      CreatedAt: new Date(),
      PhoneNumber: "789012",
      OrderItems: [
        {
          ProductId: "4",
          ProductName: "Macaron - Chocolate",
          Price: 150,
          Quantity: 1,
        },
        {
          ProductId: "5",
          ProductName: "Macaron - Lemon",
          Price: 125,
          Quantity: 3,
        },
        {
          ProductId: "6",
          ProductName: "Macaron - Coffee",
          Price: 135,
          Quantity: 1,
        },
      ],
    },
    {
      Id: "4",
      Address: "Sweet Street 4",
      Status: "Cancelled",
      CreatedAt: new Date(),
      PhoneNumber: "345678",
      OrderItems: [
        {
          ProductId: "7",
          ProductName: "Macaron - Strawberry",
          Price: 130,
          Quantity: 2,
        },
        {
          ProductId: "8",
          ProductName: "Macaron - Mango",
          Price: 145,
          Quantity: 1,
        },
        {
          ProductId: "9",
          ProductName: "Macaron - Matcha",
          Price: 140,
          Quantity: 2,
        },
        {
          ProductId: "10",
          ProductName: "Macaron - Coconut",
          Price: 150,
          Quantity: 1,
        },
      ],
    },
  ]);

  const handleSignOut = () => {
    onSignOutComplete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Account details</div>

      <div>
        <div>{accountInfo.userName}</div>
        <div>{accountInfo.userEmail}</div>
      </div>

      <div className={styles.orderContainer}>
        <div className={styles.orderList}>
          {orderInfoList.map((orderInfo) => (
            <AccordionItem
              key={orderInfo.Id}
              title={`Id: ${orderInfo.Id} Price: ${orderInfo.OrderItems.reduce(
                (accumulator, orderItem) => accumulator + orderItem.Price,
                0
              )}
              $`}
            >
              <div>
                <div className={styles.orderInfo}>
                  <b>Status: </b>
                  <div>{orderInfo.Status}</div>
                </div>
                <div className={styles.orderInfo}>
                  <b>Date: </b>
                  <div>{orderInfo.CreatedAt.toLocaleString()}</div>
                </div>
                <div className={styles.orderInfo}>
                  <b>Address: </b>
                  <div>{orderInfo.Address}</div>
                </div>
                <div className={styles.orderInfo}>
                  <b>Phone: </b>
                  <div>{orderInfo.PhoneNumber}</div>
                </div>
                <ul>
                  {orderInfo.OrderItems.map((orderItem) => (
                    <li key={orderItem.ProductId}>
                      <div>
                        <b>Name:</b> <i>{orderItem.ProductName}</i>
                      </div>
                      <div>
                        <b>Price:</b> <i>{orderItem.Price}$</i>
                      </div>
                      <div>
                        <b>Quantity:</b> <i>{orderItem.Quantity}</i>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionItem>
          ))}
        </div>
      </div>

      <button className={styles.button} onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default AccountDetails;
