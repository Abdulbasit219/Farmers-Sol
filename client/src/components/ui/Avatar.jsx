import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import AvatarIcon from "../../assets/avatarIcon.jpg";

function Avatar() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const menuItems = [
    {
      label: "DashBoard",
      icon: <LayoutDashboard />,
      onClick: () => navigate("/dashboard/user"),
    },
    {
      label: "Settings",
      icon: <Settings />,
      onClick: () => navigate("/user-profile"),
    },
    { label: "Sign out", icon: <LogOut />, onClick: handleLogout },
  ];

  return (
    <>
      <Dropdown
        buttonContent={
          <img
            className="w-12 h-12 rounded-full cursor-pointer border object-cover"
            src={user.profilePic || AvatarIcon}
            alt="User avatar"
          />
        }
        header={
          <div>
            <div className="font-bold">{user?.name}</div>
            <div className="font-medium truncate">{user?.email}</div>
          </div>
        }
        menuItems={menuItems}
        className="justify-end"
        svg={false}
        position="right-4"
      />
    </>
  );
}

export default Avatar;
