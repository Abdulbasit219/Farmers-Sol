import React from "react";
import Logo from "../../assets/sabzlink white.png";
import { Menu } from "lucide-react";
import { HashLink as Link } from "react-router-hash-link";

function Navbar() {
  return (
    <div className="bg-[#2D6A4F] w-full rounded-t-2xl shadow-md">
      <div className="max-w-[1370px] mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-[170px] object-contain" />
        </div>
        <ul className="hidden lg:flex space-x-8 text-white font-medium cursor-pointer">
          <li className="hover:text-[#D8F3DC]">
            <Link  smooth to="/" >
              Home
            </Link>
          </li>
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#about">
              About
            </Link>
          </li>
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#how-it-works">
              How It Works
            </Link>
          </li>
           <li>
            <Link to="/farmers" className="hover:text-[#D8F3DC]">
              For Farmers
            </Link>
          </li>
          <li>
            <Link to="/buyers" className="hover:text-[#D8F3DC]">
              For Buyers
            </Link>
          </li>
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#contact">
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/login"
            className="bg-[#D8F3DC] text-primary px-4 py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200"
          >
            Login
          </Link>
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
