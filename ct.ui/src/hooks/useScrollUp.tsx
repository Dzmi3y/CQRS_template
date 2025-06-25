import { useEffect, useRef } from "react";

const useScrollUp = (onScrollUp: () => void) => {
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < lastScrollTop.current) {
        onScrollUp();
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollUp]);
};

export default useScrollUp;
