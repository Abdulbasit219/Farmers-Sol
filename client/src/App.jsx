import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

import PrivateRoutes from "./components/routes/PrivateRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";

import DashBoardLayout from "./Layout/DashBoardLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AddProduct from "./components/ui/dashborad/AddProduct";
import MyProducts from "./components/ui/dashborad/MyProducts";
import UserProfile from "./pages/UserProfile";
import ManageUsers from "./components/ui/dashborad/ManageUsers";
import ManageProducts from "./components/ui/dashborad/ManageProducts";
import ManageCategory from "./components/ui/dashborad/ManageCategory";
import MyOrders from "./components/ui/dashborad/MyOrders";
import ReceivedOrders from "./components/ui/dashborad/ReceivedOrders";
import ManageOrders from "./components/ui/dashborad/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <ProductList /> },
      { path: "products-details/:id", element: <ProductDetail /> },

      // USER DASHBOARD
      {
        path: "/dashboard",
        element: <PrivateRoutes />,
        children: [
          {
            element: <DashBoardLayout />,
            children: [
              { path: "user", element: <UserDashboard /> },
              { path: "add-product", element: <AddProduct /> },
              { path: "my-products", element: <MyProducts /> },
              { path: "orders", element: <MyOrders /> },
              { path: "receivedOrders", element: <ReceivedOrders /> },
            ],
          },
        ],
      },

      {
        path: "/user-profile",
        element: <PrivateRoutes />,
        children: [{ path: "", element: <UserProfile /> }],
      },

      // ADMIN DASHBOARD
      {
        path: "/admin",
        element: <AdminRoutes />,
        children: [
          {
            element: <DashBoardLayout />, // sidebar here for all admin routes
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "manage-users", element: <ManageUsers /> },
              { path: "manage-products", element: <ManageProducts /> },
              { path: "manage-category", element: <ManageCategory /> },
              { path: "manage-orders", element: <ManageOrders /> },
            ],
          },
        ],
      },

      // PUBLIC ROUTES
      {
        element: <PublicRoutes />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
