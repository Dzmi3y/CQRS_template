import styles from "./styles.module.scss";
import BottomWaveImage from "@images/decorations/Bottom_wave.svg";
import MacaronImage from "@images/Macaron_Icon.png";
import { FormEvent, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <div className={styles.container}>
      <img className={styles.topWave} src={BottomWaveImage} alt="" />
      <div className={styles.content}>
        <div className={styles.plainText}>
          Subscribe to the newsletter and be aware of promotions
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Your email"
            enterKeyHint="send"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
