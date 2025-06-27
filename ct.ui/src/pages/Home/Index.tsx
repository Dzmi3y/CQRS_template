import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <main>
      <NavBar />
      <section id="home">
        <MainBlock />
      </section>
      <section id="about">
        <MainBlock />
      </section>
      <section id="menu"></section>
      <section id="contact"></section>
    </main>
  );
};

export default HomePage;
