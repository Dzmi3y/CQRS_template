import React from "react";
import LeftArrowImage from "@images/Home/Left_arrow.png";
import RightArrowImage from "@images/Home/Right_arrow.png";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  isRight?: boolean;
  disabled?: boolean;
}

const ArrowSliderButton: React.FC<Props> = ({
  onClick,
  isRight = false,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${
        disabled ? styles.disabled : styles.enabled
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={isRight ? RightArrowImage : LeftArrowImage}
        className={styles.image}
        alt={isRight ? "Right arrow" : "Left arrow"}
      />
    </button>
  );
};

export default ArrowSliderButton;
