import React from "react";
import styles from "./styles.module.scss";
import CardMenuButton from "../../Buttons/CardMenuButton/CardMenuButton";

interface Props {
  imageSrc: string;
  title: string;
  price: number;
  onClick: () => void;
}
const MenuCard: React.FC<Props> = ({ imageSrc, title, price, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          className={styles.image}
          draggable={false}
          src={imageSrc}
          alt={title}
        />
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.price}>Price: {price}$</div>
          <CardMenuButton onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
