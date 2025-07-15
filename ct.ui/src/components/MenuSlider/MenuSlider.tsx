import { useRef } from "react";
import product from "@models/product";
import ArrowSliderButton from "@components/Buttons/ArrowSliderButton/ArrowSliderButton";
import NavSliderDotButton from "@components/Buttons/NavSliderDotButton/NavSliderDotButton";
import MenuCard from "./MenuCard/MenuCard";
import styles from "./styles.module.scss";
import useDragScroll from "@hooks/useDragScroll";
import useScrollPagination from "@hooks/useScrollPagination";
import useScrollEndTrigger from "@hooks/useScrollEndTrigger";

const MenuSlider: React.FC<{ products: product[] }> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);
  const { pageCount, currentPage, goToPage, detectPage } = useScrollPagination(
    sliderRef,
    products.length
  );
  useScrollEndTrigger(sliderRef, detectPage);

  return (
    <div>
      <div className={styles.container}>
        <ArrowSliderButton
          onClick={() => goToPage(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
        />

        <div ref={sliderRef} className={styles.slider}>
          <div className={styles.productContainer}>
            {products.map((p) => (
              <MenuCard
                key={p.id}
                imageSrc={p.imageSrc}
                price={p.price}
                title={p.title}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        <ArrowSliderButton
          isRight={true}
          onClick={() => goToPage(Math.min(currentPage + 1, pageCount - 1))}
          disabled={currentPage >= pageCount - 1}
        />
      </div>

      <div className={styles.dotNavigation}>
        {Array.from({ length: pageCount }).map((_, i) => (
          <NavSliderDotButton
            key={i}
            isSelected={i === currentPage}
            onClick={() => goToPage(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSlider;
