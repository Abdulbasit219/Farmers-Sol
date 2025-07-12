import React from "react";
import { User, ReceiptText, Handshake, CircleDollarSign } from "lucide-react";
import Card from "../../components/ui/Card";
import forBuyers from "../../assets/buyers.png";
import forFarmers from "../../assets/farmers.jpg";

function HowItWorks() {
  const items = [
    {
      Icon: User,
      title: "Register as Farmer/Buyer",
    },
    {
      Icon: ReceiptText,
      title: "Browse & Propose Contracts",
    },
    {
      Icon: Handshake,
      title: "Secure Agreement & Communications",
    },
    {
      Icon: CircleDollarSign,
      title: "Timely Payment After Delivery",
    },
  ];

  return (
    <div id="how-it-works" className="w-full px-4 md:px-8 lg:px-16 py-12">
      <h1 className="font-bold text-3xl sm:text-4xl text-center text-primary mb-10">
        How it works?
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {items.map((item, index) => (
          <Card
            key={index}
            Icon={item.Icon}
            title={item.title}
            className="h-[180px] w-full mx-auto"
          />
        ))}
      </div>

      {/* For Farmers & Buyers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-primary text-center">
        {/* For Farmers */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">For Farmers</h2>
          <div className="relative w-[260px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] mx-auto shadow-lg rounded-xl overflow-hidden">
            <img
              src={forFarmers}
              alt="For Farmers"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center ">
              <p className="text-primary text-sm sm:text-base md:text-lg font-semibold px-4">
                Guaranteed Buyers, Stable Income
              </p>
            </div>
          </div>
        </div>

        {/* For Buyers */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">For Buyers</h2>
          <div className="relative w-[260px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] mx-auto shadow-lg rounded-xl overflow-hidden">
            <img
              src={forBuyers}
              alt="For Buyers"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center ">
              <p className="text-primary text-sm sm:text-base md:text-lg font-semibold px-4">
                Assured Supply, Quality Produce
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
