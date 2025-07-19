import styles from "./styles.module.scss";
import Gallery1 from "@images/home/gallery/Gallery1.png";
import Gallery2 from "@images/home/gallery/Gallery2.png";
import Gallery3 from "@images/home/gallery/Gallery3.png";
import Ellipse from "@images/home/gallery/Ellipse.png";
import RevealOnScrollContainer from "../../../components/RevealOnScrollContainer/RevealOnScrollContainer";

const GalleryBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>
          <RevealOnScrollContainer delay={0.2}>
            Our Gallery
          </RevealOnScrollContainer>
        </div>
        <RevealOnScrollContainer delay={0.4}>
          <div className={styles.plainText}>
            <p>Here you can get acquainted with our work</p>
          </div>
        </RevealOnScrollContainer>
      </div>
      <div className={styles.galleryContainer}>
        <img src={Ellipse} className={styles.topEllipse} alt="Ellipse" />
        <div className={styles.photoContainer}>
          <RevealOnScrollContainer delay={0.6}>
            <img src={Gallery1} className={styles.image} alt="Gallery1" />
          </RevealOnScrollContainer>
          <RevealOnScrollContainer delay={0.5}>
            <img src={Gallery2} className={styles.image} alt="Gallery2" />
          </RevealOnScrollContainer>
          <RevealOnScrollContainer delay={0.6}>
            <img src={Gallery3} className={styles.image} alt="Gallery3" />
          </RevealOnScrollContainer>
        </div>
        <img src={Ellipse} className={styles.bottomEllipse} alt="Ellipse" />
      </div>
    </div>
  );
};

export default GalleryBlock;
