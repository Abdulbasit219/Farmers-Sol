import React, { useEffect, useState } from "react";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";

export default function ModalWrapper({ isOpen, onClose, children }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 ">
        <div
          className={`bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative transform transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto ${
            showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* close icon */}
          <Button
            onClick={onClose}
            className="cursor-pointer w-full flex justify-end"
          >
            <IoMdClose className="text-2xl" />
          </Button>
          {children}
        </div>
      </div>
    </>
  );
}
