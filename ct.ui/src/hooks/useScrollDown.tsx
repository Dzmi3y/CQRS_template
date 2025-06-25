import { useEffect, useRef } from "react";

const useScrollDown = (onScrollDown: () => void) => {
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        onScrollDown(); // Действие при прокрутке вниз
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollDown]);
};

export default useScrollDown;
