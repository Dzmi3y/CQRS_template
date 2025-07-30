import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
}

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      ✖
    </button>
  );
};

export default CloseButton;
