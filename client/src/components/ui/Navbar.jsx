import { useState, useEffect } from "react";
import Logo from "../../assets/sabzlink white.png";
import {
  Cog,
  House,
  Info,
  LogIn,
  Mail,
  Menu,
  PackageSearch,
} from "lucide-react";
import { HashLink as Link } from "react-router-hash-link";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <div className="sticky top-0 bg-[#2D6A4F] w-full shadow-md z-50">
      {/* for desktop */}
      <div className="mx-auto px-4 h-25 flex items-center justify-around">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-[150px] object-contain" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium text-xl cursor-pointer">
          {/* home */}
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/" className="flex items-center gap-2">
              <House /> Home
            </Link>
          </li>
          {/* about  */}
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#about" className="flex items-center gap-2">
              <Info /> About
            </Link>
          </li>
          {/* how it work */}
          <li className="hover:text-[#D8F3DC]">
            <Link
              smooth
              to="/#how-it-works"
              className="flex items-center gap-2"
            >
              <Cog /> How It Works
            </Link>
          </li>
          {/* view product */}
          <li className="hover:text-[#D8F3DC]">
            <Link to="/products" className="flex items-center gap-2">
              <PackageSearch /> View Products
            </Link>
          </li>
          {/* contact */}
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#contact" className="flex items-center gap-2">
              <Mail /> Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Login Button and profile Avatar dropdown*/}
        <div className="hidden lg:flex items-center">
          {userData.isAuthenticated ? (
            <Avatar />
          ) : (
            <Link
              to="/login"
              className="bg-[#D8F3DC] text-primary px-4 py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200 flex items-center gap-1"
            >
              <LogIn /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex items-center lg:hidden text-white">
          {userData.isAuthenticated && (
            <div>
              <Avatar />
            </div>
          )}
          <Menu
            className="w-7 h-8 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white text-black w-64 h-full fixed left-0 top-0 p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <RiCloseLargeFill
            onClick={() => setMenuOpen(false)}
            className="text-3xl self-end cursor-pointer"
          />
          <ul className="flex flex-col text-xl gap-10 mt-6 font-medium">
            {/* home */}
            <li>
              <Link
                to="/"
                smooth
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <House /> Home
              </Link>
            </li>

            {/* about  */}
            <li>
              <Link
                to="/#about"
                className="flex items-center gap-2"
                smooth
                onClick={() => setMenuOpen(false)}
              >
                <Info /> About
              </Link>
            </li>

            {/* how it works  */}
            <li>
              <Link
                to="/#how-it-works"
                smooth
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Cog /> How It Works
              </Link>
            </li>

            {/* View Products */}
            <li>
              <Link
                to="/products"
                className="flex items-center gap-2"
                smooth
                onClick={() => setMenuOpen(false)}
              >
                <PackageSearch /> View Products
              </Link>
            </li>

            {/* contact */}
            <li>
              <Link
                to="/#contact"
                className="flex items-center gap-2"
                smooth
                onClick={() => setMenuOpen(false)}
              >
                <Mail /> Contact
              </Link>
            </li>

            {/* login button */}
            {!userData.isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-center bg-[#2D6A4F] text-white px-4 py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
