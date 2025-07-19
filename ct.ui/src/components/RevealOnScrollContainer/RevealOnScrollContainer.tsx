import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const RevealOnScrollContainer: React.FC<{
  delay?: number;
  yDisplacement?: boolean;
  children: React.ReactNode;
}> = ({ children, delay = 0, yDisplacement = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay + "s" }}
      className={`${styles.reveal} ${
        yDisplacement ? styles.yDisplacement : ""
      } ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScrollContainer;
