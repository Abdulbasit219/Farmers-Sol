import React from "react";
import Navbar from "../components/ui/Navbar";
import Hero from "../features/Hero/Hero";
import OurServices from "../features/Services/OurServices";
import HowItWorks from "../features/HowItWorks/HowItWorks";
import About from "../features/About/about";
import FAQSection from "../features/FAQ/FAQSection";

function Home() {
  return (
    <div>
      <div className="max-w-[1370px] mx-auto">
        <Navbar />
        <Hero />
        <OurServices />
        <About />
        <HowItWorks />
        <FAQSection/>
      </div>
    </div>
  );
}

export default Home;
