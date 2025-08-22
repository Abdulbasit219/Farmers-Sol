import { useSelector } from "react-redux";
import {
  useGetBuyerOrdersQuery,
  useGetProductsByFarmerIdQuery,
  useGetReceivedOrderByFarmerQuery,
} from "../../redux/ApiSlice";
import LoadingOverlay from "../../components/ui/loading/LoadingOverlay";
import DashboardCard from "../../components/ui/dashborad/DashboardCard";
import {
  ClipboardList,
  Clock,
  DollarSign,
  PackageCheck,
  ShoppingCart,
  Store,
  Truck,
  XCircle,
} from "lucide-react";

function UserDashboard() {
  const { user } = useSelector((state) => state.user);

  const isBuyer = user?.role === "buyer";
  const isFarmer = user?.role === "farmer";

  const { data, isLoading } = useGetProductsByFarmerIdQuery(
    { id: user?._id, page: 1, query: "" },
    { skip: !user?._id || !isFarmer }
  );

  const { data: userOrder } = useGetBuyerOrdersQuery(
    { id: user._id, query: "" },
    { skip: !isBuyer }
  );

  const { data: farmerOrder } = useGetReceivedOrderByFarmerQuery(
    { id: user?._id },
    { skip: !isFarmer }
  );

  const totalRevenue = farmerOrder?.orders
    ?.filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  if (isLoading) return <LoadingOverlay />;

  return (
    <div>
      <h1 className="text-primary text-3xl font-bold">
        {user ? `Welcome, ${user.role}` : ""}
      </h1>

      <div className="flex flex-wrap gap-6 justify-center sm:justify-between mt-8">
        {isFarmer && (
          <>
            <DashboardCard
              title="Total Products"
              value={data?.pagination?.totalProducts || 0}
              icon={<Store size={40} />}
              type="user"
            />

            <DashboardCard
              title="Revenue"
              value={totalRevenue}
              icon={<DollarSign size={40} />}
            />

            <DashboardCard
              title="Total Orders"
              value={farmerOrder?.orders?.length}
              icon={<ShoppingCart size={40} />}
            />

            <DashboardCard
              title="Shipped Orders"
              value={
                farmerOrder?.orders?.filter(
                  (order) => order.status === "shipped"
                ).length
              }
              icon={<Truck size={40} />}
            />
          </>
        )}
        {isBuyer && (
          <>
            <DashboardCard
              title="Total Orders"
              value={userOrder?.orders.length}
              icon={<ClipboardList size={40} />}
            />
            <DashboardCard
              title="Pending Orders"
              value={
                userOrder?.orders.filter((order) => order.status === "pending")
                  .length
              }
              icon={<Clock size={40} />}
            />
            <DashboardCard
              title="Delivered Orders"
              value={
                userOrder?.orders.filter(
                  (order) => order.status === "delivered"
                ).length
              }
              icon={<PackageCheck size={40} />}
            />
            <DashboardCard
              title="Cancelled Orders"
              value={
                userOrder?.orders.filter(
                  (order) => order.status === "cancelled"
                ).length
              }
              icon={<XCircle size={40} />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
