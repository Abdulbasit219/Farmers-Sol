import React, { useState } from "react";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-[#2D6A4F] rounded-xl p-4 mb-4 bg-white shadow-sm cursor-pointer transition"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">{question}</h3>
        <span className="text-primary font-bold">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
}

export default FAQItem;
