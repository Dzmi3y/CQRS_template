import React, { useState } from "react";
import styles from "./styles.module.scss";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={styles.item}>
      <button className={styles.header} onClick={toggleOpen}>
        <div>{title}</div>
        <div>{isOpen ? "−" : "+"} </div>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
