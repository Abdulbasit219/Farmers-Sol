import Navbar from "../components/ui/Navbar";
import Footer from "../features/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/add-product"].includes(location.pathname);

  return (
    <div className="bg-[#FFFBEE] min-h-screen flex flex-col">
      <div className="max-w-[1370px] mx-auto w-full">
        {!hideLayout && <Navbar />}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default Layout;
