import React from "react";
import styles from "./styles.module.scss";
import AccordionItem from "@components/AccordionItem/AccordionItem";
import useAccount from "@hooks/useAccount";
import { AccountActionTypes } from "@actions/AccountAction";
import { logout } from "@api/accountApi";
import { useRecoverableMutation } from "@hooks/useRecoverableMutation";

const AccountDetails: React.FC<{ onSignOutComplete: () => void }> = ({
  onSignOutComplete,
}) => {
  const { account, dispatch } = useAccount();

  const logoutMutation = useRecoverableMutation(logout, {
    onSuccess: (data) => {
      dispatch({ type: AccountActionTypes.SIGN_OUT });
      onSignOutComplete();
      console.log("Logout Success:", data);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  const handleSignOut = () => {
    if (account.authData) {
      logoutMutation.mutate(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Account details</div>

      <div>
        <div>{account.accountInfo?.userName}</div>
        <div>{account.accountInfo?.userEmail}</div>
      </div>

      <div className={styles.orderContainer}>
        {account.orderHistory.length !== 0 && (
          <div className={styles.orderList}>
            {account.orderHistory.map((orderInfo) => (
              <AccordionItem
                key={orderInfo.id}
                title={`Id: ${
                  orderInfo.id
                } Price: ${orderInfo.orderItems.reduce(
                  (accumulator, orderItem) =>
                    accumulator + orderItem.price * orderItem.quantity,
                  0
                )}
              $`}
              >
                <div>
                  <div className={styles.orderInfo}>
                    <b>Status: </b>
                    <div>{orderInfo.status}</div>
                  </div>
                  <div className={styles.orderInfo}>
                    <b>Date: </b>
                    <div>{orderInfo.createdAt.toLocaleString()}</div>
                  </div>
                  <div className={styles.orderInfo}>
                    <b>Address: </b>
                    <div>{orderInfo.address}</div>
                  </div>
                  <div className={styles.orderInfo}>
                    <b>Phone: </b>
                    <div>{orderInfo.phoneNumber}</div>
                  </div>
                  <ul>
                    {orderInfo.orderItems.map((orderItem) => (
                      <li key={orderItem.productId}>
                        <div>
                          <b>Name:</b> <i>{orderItem.productName}</i>
                        </div>
                        <div>
                          <b>Price:</b> <i>{orderItem.price}$</i>
                        </div>
                        <div>
                          <b>Quantity:</b> <i>{orderItem.quantity}</i>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionItem>
            ))}
          </div>
        )}
      </div>

      <button className={styles.button} onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default AccountDetails;
