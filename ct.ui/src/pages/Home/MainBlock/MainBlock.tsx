import styles from "./styles.module.scss";
import BottomWaveImage from "@images/decorations/Bottom_wave.svg";
import Macaron1 from "@images/Home/Macaron1.png";
import Macaron2 from "@images/Home/Macaron2.png";
import Macaron3 from "@images/Home/Macaron3.png";
import Macaron4 from "@images/Home/Macaron4.png";
import MainMacaron from "@images/Home/Main_macaron.png";

const MainBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>Welcome ın our store</div>
      <div className={styles.plainText}>
        <p>
          {" "}
          We know the recipe for happiness and we are ready to share it with
          you.
        </p>
      </div>
      {/* <img src={Macaron1} alt="MacaronImg" />
      <img src={Macaron2} alt="MacaronImg" /> */}
      <img src={MainMacaron} className={styles.mainMacaron} alt="MacaronImg" />
      {/* <img src={Macaron3} alt="MacaronImg" />
      <img src={Macaron4} alt="MacaronImg" /> */}
      <img className={styles.bottomWave} src={BottomWaveImage} alt="" />
    </div>
  );
};

export default MainBlock;
