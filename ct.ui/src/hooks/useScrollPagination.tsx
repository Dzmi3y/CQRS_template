import { useEffect, useState } from "react";

const useScrollPagination = (
  ref: React.RefObject<HTMLDivElement | null>,
  totalCards: number
) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const updatePages = () => {
    const el = ref.current;
    const child = el?.firstElementChild;
    if (!el || !child) return;

    const containerWidth = el.getBoundingClientRect().width;
    const totalWidth = child.getBoundingClientRect().width;
    const cardWidth = totalWidth / totalCards;
    const visible = Math.floor(containerWidth / cardWidth);
    const pages = Math.ceil(totalCards - visible + 1);
    setPageCount(pages);
  };

  const goToPage = (index: number) => {
    const el = ref.current;
    const child = el?.firstElementChild;
    if (!el || !child) return;

    const cardWidth = child.getBoundingClientRect().width / totalCards;
    el.style.scrollBehavior = "smooth";
    el.scrollTo({ left: cardWidth * index + 1, behavior: "smooth" });
    setCurrentPage(index);
  };

  const detectPage = () => {
    const el = ref.current;
    const child = el?.firstElementChild;
    if (!el || !child) return;

    const totalWidth = child.getBoundingClientRect().width;
    const containerWidth = el.getBoundingClientRect().width;
    const maxScroll = Math.floor(totalWidth - containerWidth);
    const cardWidth = totalWidth / totalCards;
    const scroll = el.scrollLeft;
    const index =
      scroll >= maxScroll ? pageCount - 1 : Math.floor(scroll / cardWidth);

    setCurrentPage(index);
  };

  useEffect(() => {
    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, [totalCards]);

  return { pageCount, currentPage, goToPage, detectPage };
};

export default useScrollPagination;
