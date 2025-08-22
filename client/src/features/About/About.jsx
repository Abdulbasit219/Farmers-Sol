import React from "react";
import AboutImg from "../../assets/about.jpg";
import Button from "../../components/ui/Button";
import { HashLink as Link } from "react-router-hash-link";

function About() {
  return (
    <div id="about" className="my-16 px-4 md:px-10 lg:px-20">
      <h1 className="font-bold text-3xl sm:text-4xl text-center text-primary mb-10">
        About Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 mds:grid-cols-1 gap-10 items-center ">
        {/* Left*/}
        <div className="flex justify-center">
          <img
            src={AboutImg}
            alt="About SabzLink"
            className="rounded-2xl w-full max-w-md h-auto object-cover"
          />
        </div>

        {/* Right - Text Content */}
        <div>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>SabzLink</strong> is a digital platform designed to bridge
            the gap between farmers and buyers through secure and transparent
            contract farming. We empower farmers with guaranteed market access,
            fair pricing, and timely payments — while enabling buyers to source
            quality crops with confidence.
          </p>

          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Our mission is to build a stable, tech-enabled agricultural
            ecosystem where everyone benefits. Whether you're a farmer seeking
            dependable income or a buyer looking for reliable supply,
            <strong> SabzLink</strong> is your trusted partner in contract
            farming.
          </p>

          <div className="mt-6">
            <Button className="bg-primary border border-transparent hover:bg-white hover:border-primary text-white hover:text-primary transition duration-200 cursor-pointer py-3 px-6">
              Learn More
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default About;
