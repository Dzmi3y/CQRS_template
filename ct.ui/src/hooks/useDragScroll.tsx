import { useRef, useEffect } from "react";

const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      lastX.current = startX.current;
      scrollLeft.current = el.scrollLeft;

      el.classList.add("dragging");
    };

    const mouseUp = () => {
      isDragging.current = false;
      el.classList.remove("dragging");
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      lastX.current = e.pageX - el.offsetLeft;
      const walk = lastX.current - startX.current;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const cleanup = () => {
      isDragging.current = false;
      el.classList.remove("dragging");
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", cleanup);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", cleanup);
    };
  }, [ref]);
};

export default useDragScroll;
