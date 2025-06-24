import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div id="home">
        <MainBlock />
      </div>
    </>
  );
};

export default HomePage;
