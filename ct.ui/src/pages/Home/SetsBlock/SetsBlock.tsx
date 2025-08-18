import styles from "./styles.module.scss";
import BottomWaveImage from "@images/decorations/Bottom_wave.svg";
import RevealOnScrollContainer from "@components/RevealOnScrollContainer/RevealOnScrollContainer";
import MenuSlider from "@components/MenuSlider/MenuSlider";
import { useQuery } from "@tanstack/react-query";
import Product from "@models/Product";
import { getProducts } from "@api/productApi";

const SetsBlock = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["productsSets"],
    queryFn: () => getProducts(true),
  });

  if (!isLoading) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }

  const products = isLoading || error ? [] : data || [];

  return (
    <div className={styles.container}>
      <img className={styles.topWave} src={BottomWaveImage} alt="" />
      <div className={styles.titleText}>
        <RevealOnScrollContainer delay={0.2}>
          Macarons Sets
        </RevealOnScrollContainer>
      </div>
      <RevealOnScrollContainer delay={0.4}>
        <div className={styles.plainText}>
          <p>Here you can get acquainted with our work</p>
        </div>
      </RevealOnScrollContainer>

      <RevealOnScrollContainer delay={0.6}>
        <div className={styles.slider}>
          <MenuSlider products={products} />
        </div>
      </RevealOnScrollContainer>

      <img className={styles.bottomWave} src={BottomWaveImage} alt="" />
    </div>
  );
};

export default SetsBlock;
