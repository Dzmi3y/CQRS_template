import styles from "./styles.module.scss";
import DeliveryImage from "@images/home/about/Delivery.png";
import QualityImage from "@images/home/about/Quality.png";
import VarietyImage from "@images/home/about/Variety.png";
import InfoCard from "./InfoCard/InfoCard";
import RevealOnScrollContainer from "../../../components/RevealOnScrollContainer/RevealOnScrollContainer";

const AboutBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>
        <RevealOnScrollContainer delay={0.2}>
          Why choose us?
        </RevealOnScrollContainer>
      </div>
      <RevealOnScrollContainer delay={0.4}>
        <div className={styles.plainText}>
          <p>
            You will choose us because we know how to surprise you, we always
            have high quality products.
          </p>
        </div>
      </RevealOnScrollContainer>
      <div className={styles.infoCardContainer}>
        <RevealOnScrollContainer delay={0.6} yDisplacement={true}>
          <InfoCard
            imgSrc={QualityImage}
            title="High Quality"
            text="All our products are of high quality. We purchase products only from verified suppliers."
          />
        </RevealOnScrollContainer>
        <RevealOnScrollContainer delay={0.8} yDisplacement={true}>
          <InfoCard
            hasBackground={true}
            imgSrc={VarietyImage}
            title="Variety"
            text="We have about 25 different flavors of macarons. Every day we come up with different flavors so that you can enjoy macarons."
          />
        </RevealOnScrollContainer>
        <RevealOnScrollContainer delay={1} yDisplacement={true}>
          <InfoCard
            imgSrc={DeliveryImage}
            title="Delivery"
            text="If you want to try our macarons outside our pastry shop, we can deliver them to you in a short time."
          />
        </RevealOnScrollContainer>
      </div>
    </div>
  );
};

export default AboutBlock;
