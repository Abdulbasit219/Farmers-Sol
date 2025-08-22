import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-white py-10 w-full z-40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">SabzLink</div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <Link to="" aria-label="Twitter">
            <Twitter className="hover:text-lime-300 transition-colors" />
          </Link>
          <Link>
            <Facebook className="hover:text-lime-300 transition-colors" />
          </Link>
          <Link to="" aria-label="Instagram">
            <Instagram className="hover:text-lime-300 transition-colors" />
          </Link>
          <Link to="" aria-label="LinkedIn">
            <Linkedin className="hover:text-lime-300 transition-colors" />
          </Link>
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
