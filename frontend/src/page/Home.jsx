import Companies from "../components/companies/Companies";
import Contact from "../components/contact/Contact";
import GetStarted from "../components/get started/getStarted";
import Hero from "../components/hero/Hero";
import Residencies from "../components/residencies/Residencies";
import Value from "../components/value/Value";

function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </>
  );
}

export default Home;
