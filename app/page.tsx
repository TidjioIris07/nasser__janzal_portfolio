import Preloader from "@/components/Preloader";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import WhatsAppChat from "@/components/WhatsAppChat";

import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Impact from "@/components/Impact";
import Journey from "@/components/Journey";
import LogoMarquee from "@/components/LogoMarquee";
import Partnership from "@/components/Partnership";
import Services from "@/components/Services";

const Home = () => {
  return (
    <>
      <Preloader />
      <NavBar />
      <Hero />

      <main>
        <LogoMarquee />
        <Journey />
        <Impact />
        <Partnership />
        <Services />
        <Footer />
        <Form />
      </main>

      <WhatsAppChat />
    </>
  );
};

export default Home;