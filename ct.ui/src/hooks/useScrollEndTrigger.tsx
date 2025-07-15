import { useEffect } from "react";

const useScrollEndTrigger = (
  ref: React.RefObject<HTMLElement | null>,
  onScrollEnd: () => void,
  delay = 150
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: number | null = null;

    const onScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        onScrollEnd();
      }, delay);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref, onScrollEnd, delay]);
};

export default useScrollEndTrigger;
