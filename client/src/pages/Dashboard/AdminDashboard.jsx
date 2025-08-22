import DashboardCard from "../../components/ui/dashborad/DashboardCard";
import { HiMiniUsers } from "react-icons/hi2";
import { BiCategoryAlt } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import {
  useGetAllOrdersQuery,
  useGetProductsQuery,
  useGetUserQuery,
} from "../../redux/ApiSlice";
import PieChart from "../../components/ui/dashborad/chart/PieChart";
import AreaChart from "../../components/ui/dashborad/chart/AreaChart";

function AdminDashboard() {
  const { data: allUsers } = useGetUserQuery();

  const { data: allOrders } = useGetAllOrdersQuery({ page: 1 });
  const { data: allProducts } = useGetProductsQuery({ page: 1, admin: true });

  return (
    <div className="px-4">
      <h1 className="text-primary text-3xl font-bold">Admin Panel</h1>

      {/* dashborad cards */}
      <div className="flex gap-4 flex-wrap mt-2">
        <DashboardCard
          title="Users"
          value={allUsers?.totalUsers}
          icon={<HiMiniUsers />}
          variant="admin"
        />
        <DashboardCard
          title="Products"
          value={allProducts?.totalProducts}
          icon={<MdInventory />}
          variant="admin"
        />
        <DashboardCard
          title="Orders"
          value={allOrders?.totalOrders}
          icon={<FaClipboardList />}
          variant="admin"
        />
        <DashboardCard
          title="Pending Approval"
          value={
            allProducts?.adminProducts?.filter((p) => p.status === "pending")
              .length
          }
          icon={<BiCategoryAlt />}
          variant="admin"
        />
      </div>

      <div className="lg:flex w-full">
        <div className="lg:w-[50%]">
          <AreaChart />
        </div>
        <div className="lg:w-[50%]">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
