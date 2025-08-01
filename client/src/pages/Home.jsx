import React from "react";
import Hero from "../features/Hero/Hero";
import OurServices from "../features/Services/OurServices";
import HowItWorks from "../features/HowItWorks/HowItWorks";
import About from "../features/About/About";
import FAQSection from "../features/FAQ/FAQSection";
import Contact from "../features/Contact/Contact";

function Home() {
  return (
    <div>
      <Hero />
      <OurServices />
      <About />
      <HowItWorks />
      <FAQSection />
      <Contact />
    </div>
  );
}

export default Home;
