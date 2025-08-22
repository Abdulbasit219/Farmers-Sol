import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";

function AddModal({ isOpen, onClose, createCat }) {
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!category.trim()) return;
    createCat(category.trim());
    setCategory("");
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div>
        <label className="block text-gray-800 font-medium mb-1">Category</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Title For Your Product"
            className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-center mt-4 ">
          <Button
            className="bg-primary text-md text-white py-3 cursor-pointer px-6 hover:border hover:text-primary hover:bg-white transition-all duration-500"
            onClick={handleSubmit}
          >
            Add Category
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default AddModal;
