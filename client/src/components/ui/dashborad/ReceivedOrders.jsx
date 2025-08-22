import { useState } from "react";
import Search from "../Search";
import {
  useGetReceivedOrderByFarmerQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/ApiSlice";
import { useSelector } from "react-redux";
import DataTable from "../DataTable";
import Avatar from "../../../assets/avatarIcon.jpg";
import LoadingOverlay from "../loading/LoadingOverlay";
import { handleError, handleSuccess } from "../../../Utils";
import { Link } from "react-router-dom";

function ReceivedOrders() {
  const [search, setSearch] = useState();

  const { user } = useSelector((state) => state.user);

  const isFarmer = user?.role === "farmer";

  const { data, isLoading, refetch } = useGetReceivedOrderByFarmerQuery(
    {
      id: user._id,
      query: search,
    },
    { skip: !isFarmer }
  );
  const [updateOrderStatus, { isLoading: isStatusLoding }] =
    useUpdateOrderStatusMutation();

  const handleSearchOrder = (e) => {
    e.preventDefault();
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await updateOrderStatus({ id, status }).unwrap();
      if (res.success) {
        handleSuccess(res.message);
        refetch();
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error || "Failed to update the status");
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (_, row) => (
        <div className="flex items-center">
          <img
            src={row?.profilePic || Avatar}
            alt="product"
            className="w-10 h-10 rounded-full"
          />
          <div className="font-semibold ps-2">{row?.buyer?.name}</div>
        </div>
      ),
    },
    {
      key: "product",
      header: "Product",
      render: (_, row) => (
        <Link to={`/products-details/${row?.product?._id}`} className="flex items-center hover:underline hover:text-primary">
          <img
            src={row?.product?.imageUrl[0] || Avatar}
            alt="product"
            className="w-10 h-10 rounded-full"
          />
          <div className="font-semibold ps-2">{row?.product?.title}</div>
        </Link>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (_, row) => row?.buyer?.email,
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
    },
    {
      key: "quantity",
      header: "Quantity",
    },
    {
      key: "totalPrice",
      header: "Total Price",
    },
    {
      key: "status",
      header: "Status",
      render: (_, row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className="rounded-md px-2 py-1 text-sm outline-0"
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
  ];

  if (isLoading || isStatusLoding) {
    return <LoadingOverlay />;
  }

  return (
    <div className="w-full rounded-lg overflow-x-auto px-2 sm:px-0">
      <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
        {/* search and filter buttons */}
        <div className="flex items-center justify-between gap-4 py-4 px-4 flex-wrap">
          <div className="w-full sm:w-auto">
            <Search
              search={search}
              setSearch={setSearch}
              handleSearchProduct={handleSearchOrder}
              placeHolder="Search"
            />
          </div>
        </div>

        <DataTable columns={columns} data={data?.orders || []} />
      </div>

    </div>
  );
}

export default ReceivedOrders;
