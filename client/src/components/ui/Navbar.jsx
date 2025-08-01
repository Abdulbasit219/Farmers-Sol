import { useState, useEffect } from "react";
import Logo from "../../assets/sabzlink white.png";
import { Menu } from "lucide-react";
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
    <div className="sticky top-0 rounded-b-4xl bg-[#2D6A4F] w-full shadow-md z-50">
      <div className="mx-auto px-4 h-25 flex items-center justify-around">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-[150px] object-contain" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium text-xl cursor-pointer">
          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/">
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
          {userData?.user?.role === "farmer" && (
            <li className="hover:text-[#D8F3DC]">
              <Link to="/add-product">Add Products</Link>
            </li>
          )}
          <li className="hover:text-[#D8F3DC]">
            <Link to="/products">View Products</Link>
          </li>

          <li className="hover:text-[#D8F3DC]">
            <Link smooth to="/#contact">
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Login Button and profile Avatar dropdown*/}
        <div className="hidden lg:block">
          {userData.isAuthenticated ? (
            <Avatar />
          ) : (
            <Link
              to="/login"
              className="bg-[#D8F3DC] text-primary px-4 py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200"
            >
              Login
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
          <ul className="flex flex-col gap-6 mt-6 text-lg font-medium">
            {/* home */}
            <li>
              <Link to="/" smooth onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            {/* about  */}
            <li>
              <Link to="/#about" smooth onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>

            {/* how it works  */}
            <li>
              <Link
                to="/#how-it-works"
                smooth
                onClick={() => setMenuOpen(false)}
              >
                How It Works
              </Link>
            </li>

            {userData?.user?.role === "farmer" && (
              <li>
                <Link to="/add-product" onClick={() => setMenuOpen(false)}>
                  Add Products
                </Link>
              </li>
            )}
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                View Products
              </Link>
            </li>

            <li>
              <Link to="/#contact" smooth onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>

            {!userData.isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  className="text-center bg-[#2D6A4F] text-white px-4 py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
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
