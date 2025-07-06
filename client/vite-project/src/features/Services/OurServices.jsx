import React from "react";
import { FileText, TrendingUp, ShieldCheck, PackageSearch } from "lucide-react";
import ServiceCard from "../../components/ui/Card";

function OurServices() {
  const services = [
    {
      Icon: FileText,
      title: "Secure Contract Management",
      description:
        "Easily create, sign, and manage farming contracts online with full transparency.",
    },
    {
      Icon: TrendingUp,
      title: "Real-Time Price Discovery",
      description:
        "Access live market prices to help farmers and buyers negotiate fairly.",
    },
    {
      Icon: ShieldCheck,
      title: "Verified Payments",
      description:
        "Ensure fast, secure payments upon delivery through a trusted system.",
    },
    {
      Icon: PackageSearch,
      title: "Crop & Deal Tracking",
      description:
        "Monitor your contracts and crop movements every step of the way.",
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 lg:px-16">
      <h1 className="font-bold text-4xl text-center mt-10 text-primary">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            Icon={service.Icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
}

export default OurServices;
