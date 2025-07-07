import React from "react";
import Logo from "../../assets/sabzlink white.png";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-[#2D6A4F] w-full rounded-t-2xl shadow-md">
      <div className="max-w-[1370px] mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-[170px] object-contain"
          />
        </div>

        {/* Menu Items (Desktop) */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium">
          <li className="hover:text-[#D8F3DC] cursor-pointer">Home</li>
          <li className="hover:text-[#D8F3DC] cursor-pointer">About</li>
          <li className="hover:text-[#D8F3DC] cursor-pointer">How It Works</li>
          <li className="hover:text-[#D8F3DC] cursor-pointer">For Farmers</li>
          <li className="hover:text-[#D8F3DC] cursor-pointer">For Buyers</li>
          <li className="hover:text-[#D8F3DC] cursor-pointer">Contact</li>
        </ul>

        {/* CTA Button (Desktop) */}
        <div className="hidden lg:block">
          <button className="bg-[#D8F3DC] text-primary px-4 py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200">
            Login / Signup
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-white">
          <Menu className="w-7 h-7 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
