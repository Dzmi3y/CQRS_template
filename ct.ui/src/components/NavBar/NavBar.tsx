import { useState } from "react";
import styles from "./styles.module.scss";
import BagImage from "@images/menu/bag.png";
import PhoneImage from "@images/menu/phone.png";
import MacaronImage from "@images/Macaron_Icon.png";
import useScrollUp from "@hooks/useScrollUp";
import useScrollDown from "@hooks/useScrollDown";
import BurgerButton from "../Buttons/BurgerButton/BurgerButton";
import useCart from "@hooks/useCart";
import CartModal from "@components/CartModal/CartModal";

const NavBar = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isCartHidden, setIsCartHidden] = useState<boolean>(true);
  const { cart } = useCart();

  useScrollUp(() => setIsFixed(true));
  useScrollDown(() => setIsFixed(false));

  const totalCount = cart.reduce<number>((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "menu", label: "Menu" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  const cartToggle = () => {
    setIsCartHidden(!isCartHidden);
  };

  return (
    <>
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
          <button
            className={styles.orderButton}
            onClick={() => cartToggle()}
            draggable="false"
          >
            <img
              className={styles.bagImage}
              draggable="false"
              src={BagImage}
              alt="Bag icon"
            />
            {totalCount > 0 ? <div>{totalCount}</div> : ""}
          </button>
        </nav>

        <div className={styles.navBlockMobile}>
          <button
            className={styles.orderButton}
            draggable="false"
            onClick={() => cartToggle()}
          >
            <img
              className={styles.bagImage}
              draggable="false"
              src={BagImage}
              alt="Bag icon"
            />
            {totalCount > 0 ? <div>{totalCount}</div> : ""}
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
      <CartModal
        isHidden={isCartHidden}
        onToggleVisibility={() => cartToggle()}
      />
    </>
  );
};

export default NavBar;
