import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary text-white py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">SabzLink</div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" aria-label="Twitter">
            <Twitter className="hover:text-lime-300 transition-colors" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="hover:text-lime-300 transition-colors" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="hover:text-lime-300 transition-colors" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="hover:text-lime-300 transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} SabzLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
