import { Boxes, ChartBarStacked, ClipboardList, LayoutDashboard, Plus, ShoppingCart, UsersRound } from "lucide-react";

export const getMenuItems = (role) => {
  if (role === "admin") {
    return [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        path: "/admin/dashboard",
      },
      {
        label: "Users",
        icon: <UsersRound />,
        path: "/admin/manage-users",
      },
      {
        label: "Products",
        icon: <Boxes />,
        path: "/admin/manage-products",
      },
      {
        label: "Category",
        icon: <ChartBarStacked />,
        path: "/admin/manage-category",
      },
      {
        label: "Orders",
        icon: <ShoppingCart />,
        path: "/admin/manage-orders",
      },
    ];
  }

  return [
    {
      label: "Dashboard",
      icon: <LayoutDashboard />,
      path: "/dashboard/user",
    },
    ...(role === "farmer"
      ? [
          {
            label: "Add Products",
            icon: <Plus />,
            path: "/dashboard/add-product",
          },
          {
            label: "My Products",
            icon: <Boxes />,
            path: "/dashboard/my-products",
          },
          {
            label: "Orders",
            icon: <ShoppingCart />,
            path: "/dashboard/receivedOrders",
          },
        ]
      : []),
    ...(role === "buyer"
      ? [
          {
            label: "My Orders",
            icon: <ClipboardList />,
            path: "/dashboard/orders",
          },
        ]
      : []),
  ];
};
