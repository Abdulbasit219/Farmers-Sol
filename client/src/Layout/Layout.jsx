import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../features/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-[#FFFBEE] min-h-screen flex flex-col">
      <div className="max-w-[1370px] mx-auto w-full">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
