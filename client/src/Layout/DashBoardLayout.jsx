import { useSelector } from "react-redux";
import Sidebar from "../components/ui/dashborad/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { getMenuItems } from "../config/MenuConfig";

function DashBoardLayout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();


  let role = user?.role;
  if (location.pathname.startsWith("/admin")) {
    role = "admin";
  }

  const menuItems = getMenuItems(role);

  return (
    <div className="relative flex lg:flex-row lg:p-8">
      <Sidebar menuItems={menuItems} />
      <div className="overflow-auto md:w-[90%]">
        <main className="flex-1 mx-4 mt-4 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashBoardLayout;
