import { useState } from "react";
import Button from "./Button";

const Dropdown = ({
  buttonContent,
  menuItems = [],
  className = "",
  header,
  svg,
  position
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block text-left w-full`}>
      {/* Button */}
      <Button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 text-green-900 rounded-md cursor-pointer ${className}`}
      >
        {buttonContent}
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
        <div className={`absolute ${position} mt-1 w-60 bg-[#def2e1] rounded-md shadow-lg border border-green-200 z-10`}>
          {header && (
            <div className="px-4 py-3 border-b text-sm text-green-900">
              {header}
            </div>
          )}
          <ul className="py-1 text-green-800">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    item.onClick && item.onClick();
                    setOpen(false);
                  }}
                >
                  {item.label}
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
