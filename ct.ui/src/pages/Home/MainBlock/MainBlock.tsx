import styles from "./styles.module.scss";
import BottomWaveImage from "@images/decorations/Bottom_wave.svg";

const MainBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>Welcome ın our store</div>
      <img className={styles.bottomWave} src={BottomWaveImage} alt="" />
    </div>
  );
};

export default MainBlock;
