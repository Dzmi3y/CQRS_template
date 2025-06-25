import { useState } from "react";
import styles from "./styles.module.scss";
import BagImage from "@images/menu/bag.png";
import PhoneImage from "@images/menu/phone.png";
import MacaronImage from "@images/Macaron_Icon.png";
import useScrollUp from "@hooks/useScrollUp";
import useScrollDown from "@hooks/useScrollDown";
import BurgerButton from "../BurgerButton/BurgerButton";

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollUp(() => setIsFixed(true));
  useScrollDown(() => setIsFixed(false));

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "menu", label: "Menu" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div
      className={`${styles.container} ${
        isFixed ? styles.fixed : styles.absolute
      }`}
    >
      <div className={styles.logoBlock}>
        <img
          className={styles.logoImage}
          src={MacaronImage}
          alt="Macaron logo"
        />
        <div className={styles.logoText}>Macaronsmania</div>
      </div>

      <nav className={styles.navBlockDesktop}>
        {navItems.map(({ id, label }) => (
          <a key={id} href={`/#${id}`} className={styles.navItem}>
            {label}
          </a>
        ))}
        <div className={styles.navItem}>
          <img
            className={styles.phoneImage}
            src={PhoneImage}
            alt="Phone icon"
          />
          <span>+123456789</span>
        </div>
        <button className={styles.orderButton}>
          <img className={styles.bagImage} src={BagImage} alt="Bag icon" />
        </button>
      </nav>

      <div className={styles.navBlockMobile}>
        <button className={styles.orderButton}>
          <img className={styles.bagImage} src={BagImage} alt="Bag icon" />
        </button>
        <BurgerButton
          active={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
        />
        <nav
          className={`${styles.mobileNavItems} ${
            menuOpen ? styles.showNav : styles.hideNav
          }`}
        >
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`/#${id}`}
              className={styles.navItem}
              onClick={handleLinkClick}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
