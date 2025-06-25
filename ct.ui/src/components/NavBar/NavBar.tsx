import styles from "./styles.module.scss";
import BagImage from "@images/menu/bag.png";
import PhoneImage from "@images/menu/phone.png";
import MacaronImage from "@images/Macaron_Icon.png";
import useScrollUp from "@hooks/useScrollUp";
import useScrollDown from "@hooks/useScrollDown";
import { useState } from "react";

const NavBar = () => {
  const [attachmentStyle, setAttachmentStyle] = useState<string>(
    styles.absolute
  );

  useScrollUp(() => {
    if (attachmentStyle === styles.absolute) {
      setAttachmentStyle(styles.fixed);
    }
  });

  useScrollDown(() => {
    if (attachmentStyle === styles.fixed) {
      setAttachmentStyle(styles.absolute);
    }
  });

  return (
    <div className={`${styles.container} ${attachmentStyle}`}>
      <div className={styles.logoBlock}>
        <img
          className={styles.logoImage}
          src={MacaronImage}
          alt="MacaronImage"
        />
        <div className={styles.logoText}>Macaronsmania</div>
      </div>
      <nav className={styles.navBlock}>
        <a href="/#home" className={styles.navItem}>
          Home
        </a>
        <a href="/#about" className={styles.navItem}>
          About Us
        </a>
        <a href="/#menu" className={styles.navItem}>
          Menu
        </a>
        <a href="/#contact" className={styles.navItem}>
          Contact
        </a>
        <div className={styles.navItem}>
          <img className={styles.phoneImage} src={PhoneImage} alt="phone" />
          <span>+123456789</span>
        </div>
        <button className={styles.orderButton}>
          <img className={styles.bagImage} src={BagImage} alt="bag" />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
