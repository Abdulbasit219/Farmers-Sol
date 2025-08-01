import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import Dropdown from "./Dropdown";

function Avatar() {

  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const menuItems = [
    { label: "Dashboard", onClick: () => navigate("/dashboard/farmer") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <>
      <Dropdown
        buttonContent={
          userData.profilePic ? (
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src={user.profilePic}
              alt="User avatar"
            />
          ) : (
            <RxAvatar className="text-xl bg-white w-8 h-8 rounded-full cursor-pointer text-gray-600" />
          )
        }

        header={
          <div>
            <div className="font-bold">{userData?.user?.name}</div>
            <div className="font-medium truncate">{userData?.user?.email}</div>
          </div>
        }

        menuItems={menuItems}
        className="justify-end"
        svg = {false}
        position='right-4'
      />
    </>
  );
}

export default Avatar;
