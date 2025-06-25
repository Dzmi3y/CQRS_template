import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div id="home">
        <MainBlock />
      </div>
      <div id="about">
        <MainBlock />
      </div>
      <div id="menu">
        <MainBlock />
      </div>
      <div id="contact">
        <MainBlock />
      </div>
    </>
  );
};

export default HomePage;
