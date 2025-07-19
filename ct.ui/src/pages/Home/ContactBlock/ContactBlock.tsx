import styles from "./styles.module.scss";
import MapImage from "@images/home/Map.png";
import RevealOnScrollContainer from "../../../components/RevealOnScrollContainer/RevealOnScrollContainer";

const ContactBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>
        <RevealOnScrollContainer delay={0.2}>
          How to find us?
        </RevealOnScrollContainer>
      </div>
      <RevealOnScrollContainer delay={0.4}>
        <div className={styles.plainText}>
          <p>
            If you want to visit us, you can find up-to-date information about
            our confectionery here.
          </p>
        </div>
      </RevealOnScrollContainer>
      <RevealOnScrollContainer delay={0.6}>
        <div className={styles.mainContentContainer}>
          <div className={styles.infoBlock}>
            <div className={styles.infoCardContainer}>
              <span>Contacts</span>
              <p>+123456789</p>
              <p>macaronsmania@gmail.com</p>
            </div>
            <div className={styles.infoCardContainer}>
              <span>Working hours</span>
              <p>Mon-Sun from 09:00 to 20:00</p>
            </div>
            <div className={styles.infoCardContainer}>
              <span>Location</span>
              <p>City</p>
              <p>Street</p>
            </div>
            <div className={styles.infoCardContainer}>
              <span>Social media</span>
              <p>Instagram: macarons </p>
              <p>Facebook: macarons </p>
              <p>Twitter: macarons </p>
            </div>
          </div>
          <img src={MapImage} className={styles.image} alt="Map" />
        </div>
      </RevealOnScrollContainer>
    </div>
  );
};

export default ContactBlock;
