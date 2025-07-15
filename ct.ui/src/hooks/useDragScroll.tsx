import { useRef, useEffect } from "react";

const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const scrollLeft = useRef(0);

  const updateScroll = () => {
    const el = ref.current;
    if (!el) return;

    if (Math.abs(velocity.current) < 1) {
      velocity.current = 0;
      animationFrame.current = null;

      requestAnimationFrame(() => {
        el.style.scrollBehavior = "smooth";
        el.style.scrollSnapType = "x proximity";
      });

      return;
    }

    el.scrollTo({
      left: el.scrollLeft - velocity.current,
      behavior: "auto",
    });

    velocity.current *= 0.94;
    animationFrame.current = requestAnimationFrame(updateScroll);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      lastX.current = startX.current;
      scrollLeft.current = el.scrollLeft;

      el.classList.add("dragging");
      el.style.scrollBehavior = "auto";
      el.style.scrollSnapType = "none";

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };

    const mouseUp = () => {
      const delta = lastX.current - startX.current;
      isDragging.current = false;
      el.classList.remove("dragging");

      if (Math.abs(delta) < 5) {
        velocity.current = 0;
        return;
      }

      velocity.current = Math.max(Math.min(delta * 0.2, 40), -40);

      requestAnimationFrame(() => {
        el.style.scrollBehavior = "auto";
        animationFrame.current = requestAnimationFrame(updateScroll);
      });
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

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [ref]);
};

export default useDragScroll;
