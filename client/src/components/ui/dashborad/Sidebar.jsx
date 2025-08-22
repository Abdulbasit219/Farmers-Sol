import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";

function Sidebar({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:block fixed sm:static top-26 left-0 lg:w-[20%] bg-primary transition-transform z-40 rounded-lg border`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* close icon on small screen */}
            <li className="lg:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="flex justify-end w-full p-2 text-white rounded-lg"
              >
                <X size={30} />
              </button>
            </li>

            {/* Dynamic menu */}
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 mt-4 text-white text-2xl rounded-lg hover:bg-green-900 transition-colors ${
                    location.pathname === item.path ? "bg-green-800" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <p className="flex items-center">
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
