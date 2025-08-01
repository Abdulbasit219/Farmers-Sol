import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AddProduct from "./pages/AddProduct";
import Layout from "./Layout/Layout";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminRoutes from "./components/routes/AdminRoutes";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import PublicRoutes from "./components/routes/PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/products", element: <ProductList /> },
      { path: "/products-details/:id", element: <ProductDetail /> },

      // protect Admin routes
      {
        element: <AdminRoutes />,
        children: [{ path: "/dashboard/admin", element: <AdminDashboard /> }],
      },

      // protect user routes
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/dashboard/user", element: <UserDashboard /> },
          { path: "/add-product", element: <AddProduct /> },
        ],
      },
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
