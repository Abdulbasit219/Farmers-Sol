// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FarmerDashboard from "./features/Dashboard/FarmerDashboard";
import BuyerDashboard from "./features/Dashboard/BuyerDashboard";
import PageNotFound from "./pages/PageNotFound";
import AddProduct from "./pages/AddProduct";
import Layout from "./Layout/Layout";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "dashboard/farmer", element: <FarmerDashboard /> },
      { path: "dashboard/buyer", element: <BuyerDashboard /> },
      { path: "add-product", element: <AddProduct /> },
        { path: "login", element: <Login/> },
           { path: "signup", element: <Signup/> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
