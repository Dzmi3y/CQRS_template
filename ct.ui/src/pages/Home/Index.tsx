import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div id="home">
        <MainBlock />
      </div>
      <div id="home2">
        <MainBlock />
      </div>
      <div id="home3">
        <MainBlock />
      </div>
      <div id="home4">
        <MainBlock />
      </div>
    </>
  );
};

export default HomePage;
