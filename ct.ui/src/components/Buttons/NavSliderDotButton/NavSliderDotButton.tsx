import React from 'react'
import styles from "./styles.module.scss";

interface Props {
    onClick: () => void;
    isSelected?: boolean;
}

const NavSliderDotButton : React.FC<Props> = ({ onClick, isSelected=false }) => {
    return (
      <button className={styles.button} onClick={onClick}>
        <div className={`${styles.dot} ${isSelected? styles.selected:""}`}>
        </div>
      </button>
    );
  };

export default NavSliderDotButton
