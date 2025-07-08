import React from "react";
import styles from "./styles.module.scss";

type InfoCardProps = {
  imgSrc: string;
  title: string;
  text: string;
  hasBackground?: boolean;
};

const InfoCard: React.FC<InfoCardProps> = ({
  imgSrc,
  title,
  text,
  hasBackground = false,
}) => {
  return (
    <div
      className={`${styles.container} ${
        hasBackground ? styles.background : ""
      }`}
    >
      <img className={styles.image} src={imgSrc} alt={title} />
      <div className={styles.textBlock}>
        <div>{title}</div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default InfoCard;
