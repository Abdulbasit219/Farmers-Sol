import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FiFilter } from "react-icons/fi";

const Dropdown = ({
  buttonContent,
  menuItems = [],
  className = "",
  header,
  svg,
  position,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left w-full`}>
      {/* Button */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center outline-none gap-2 px-4 py-2 text-green-900 rounded-md cursor-pointer ${className}`}
      >
        {buttonContent === "Category" ? (
          <>
            <FiFilter />
            {buttonContent}
          </>
        ) : (
          buttonContent
        )}
        {svg === true && (
          <svg
            className="w-4 h-4 ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={`absolute ${position} mt-1 w-60 bg-[#E4F8E2] rounded-md shadow-lg border border-green-300 z-60`}
        >
          {header && (
            <div className="px-4 py-3 border-b text-sm text-green-900">
              {header}
            </div>
          )}
          <ul className="py-1 text-green-800">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  className="flex items-center gap-x-1 w-full text-xl text-left px-4 py-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    item.onClick && item.onClick();
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label[0].toUpperCase() + item.label.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
