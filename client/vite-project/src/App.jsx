import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FarmerDashboard from "./features/Dashboard/FarmerDashboard";
import BuyerDashboard from "./features/Dashboard/BuyerDashboard";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/dashboard/farmer", element: <FarmerDashboard /> },
  { path: "/dashboard/buyer", element: <BuyerDashboard /> },
  { path: "*", element: <PageNotFound /> }, 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
