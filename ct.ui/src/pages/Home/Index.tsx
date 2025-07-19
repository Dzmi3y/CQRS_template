import MainBlock from "./MainBlock/MainBlock";
import NavBar from "../../components/NavBar/NavBar";
import AboutBlock from "./AboutBlock/AboutBlock";
import MenuBlock from "./MenuBlock/MenuBlock";
import SetsBlock from "./SetsBlock/SetsBlock";
import ContactBlock from "./ContactBlock/ContactBlock";
import Footer from "@components/Footer/Footer";

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
      <section id="menu">
        <MenuBlock />
        <SetsBlock />
      </section>
      <section id="contact">
        <ContactBlock />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
