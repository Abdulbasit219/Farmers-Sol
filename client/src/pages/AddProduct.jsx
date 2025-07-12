import React from "react";
import sm from "../assets/about.jpg";
import Button from "../components/ui/Button";
import Uploader from "../components/ui/Uploader";
function AddProduct() {
  return (
    <div className="min-h-screen bg-[#FFFBEE] px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">
          List Your Crop
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to list your farm product
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
        {/* Left: Form */}
        <form className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          {/* Title */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Title
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Title For Your Crop"
                className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <input
                type="number"
                placeholder="Expected Price $"
                className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>
          </div>
          {/* Quantity*/}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Quantity
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <select className="w-full sm:w-[140px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]">
                <option value="kg">kg</option>
                <option value="tons">tons</option>
                <option value="quintal">quintal</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>
          {/* Type  */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Category
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]">
              <option value="A+"></option>
              <option value="A"></option>
              <option value="B"></option>
              <option value="C"></option>
            </select>
          </div>
          {/* Description  */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Write something about the crop, variety, conditions, or any important details..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            ></textarea>
          </div>
        <Button className="bg-primary w-full hover:bg-white hover:border text-white hover:text-black hover:cursor-pointer">
              Submit
            </Button>
        </form>

        {/* Right */}
       <Uploader/>
      </div>
    </div>
  );
}

export default AddProduct;
