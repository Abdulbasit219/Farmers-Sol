import React from "react";
import FAQItem from "../../components/ui/FAQItem"; // adjust the path

const faqItems = [
  {
    question: "What is contract farming?",
    answer:
      "Contract farming is a system where farmers and buyers sign an agreement before production begins. It ensures guaranteed buyers, pricing, and timely payments.",
  },
  {
    question: "How do I register as a farmer or buyer?",
    answer:
      "Click the Login/Signup button on the top right and choose your role to start the registration process.",
  },
  {
    question: "Is the payment secure?",
    answer:
      "Yes, the platform uses secure payment gateways and holds payments in escrow until the agreement is fulfilled.",
  },
  {
    question: "Can I negotiate prices on the platform?",
    answer:
      "Absolutely. Our platform supports transparent price negotiation tools between farmers and buyers.",
  },
];

function FAQSection() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 mt-16">
      <h2 className="text-4xl font-bold text-primary text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
