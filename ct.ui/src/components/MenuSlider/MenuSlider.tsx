import MenuCard from "./MenuCard/MenuCard";
import styles from "./styles.module.scss";
import MacaronImage from "@images/Home/Test_macaron.png";

const MenuSlider = () => {
  return (
    <div>
      <MenuCard
        imageSrc={MacaronImage}
        price={1.5}
        title={"macarons with berry ganache "}
        onClick={() => {
          console.log("click");
        }}
      />
    </div>
  );
};

export default MenuSlider;
