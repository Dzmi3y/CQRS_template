import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";
import AboutBlock from "./AboutBlock/AboutBlock";

const HomePage = () => {
  return (
    <main>
      <NavBar />
      <section id="home">
        <MainBlock />
      </section>
      <section id="about">
        <AboutBlock />
      </section>
      <section id="menu"></section>
      <section id="contact"></section>
    </main>
  );
};

export default HomePage;
