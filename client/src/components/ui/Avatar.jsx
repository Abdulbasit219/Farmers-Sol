import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/UserSlice";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function Avatar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="relative flex items-center text-left">
      <div
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden flex items-center justify-center bg-gray-200"
      >
        {user.profilePic ? (
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={user.profilePic}
            alt="User dropdown"
          />
        ) : (
          <RxAvatar className="text-2xl text-gray-600"/>
        )}
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="absolute right-0 top-full mt-2 z-10  divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-[#fed264]"
        >
          <div className="px-4 py-3 text-sm text-[#2D6A4F]">
            <div className="font-bold">{user.name}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-[#2D6A4F]"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:text-[#2D6A4F] dark:hover:bg-[#2D6A4F] dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:text-[#2D6A4F] dark:hover:bg-[#2D6A4F] dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div className="py-1 text-[#2D6A4F]">
            <Link
              href="#"
              onClick={handleLogout}
              className="text-sm block px-4 py-2 hover:text-[#2D6A4F] dark:hover:bg-[#2D6A4F] dark:hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
