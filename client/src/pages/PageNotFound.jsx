import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/sabzlink green.png"; 

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-6 text-center">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-32 h-auto mb-6"
      />

      {/* 404 Heading */}
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-[#2D6A4F] text-white rounded-xl font-semibold hover:bg-[#245a40] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
