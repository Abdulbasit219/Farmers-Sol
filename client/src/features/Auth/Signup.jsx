import React from "react";
import Button from "../../components/ui/Button";
function Signup() {
  return (
    <div className="min-h-screen bg-[#FFFBEE] flex justify-center items-center px-4">
      <form className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Join SabzLink
        </h2>
        <div>
          <label className="block text-gray-800 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Ali"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
        <div>
          <label className="block text-gray-800 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="ali@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
        <div>
          <label className="block text-gray-800 font-medium mb-1">Role</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]">
            <option value="Farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <Button className="w-full cursor-pointer bg-primary hover:bg-white hover:border hover:border-primary text-white hover:text-primary transition duration-200">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
