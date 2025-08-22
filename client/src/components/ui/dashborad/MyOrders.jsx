import { useState } from "react";
import DataTable from "../DataTable";
import Search from "../Search";
import { useGetBuyerOrdersQuery } from "../../../redux/ApiSlice";
import { useSelector } from "react-redux";
import LoadingOverlay from "../loading/LoadingOverlay";
import { Link } from "react-router-dom";

function MyOrders() {
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.user);
  const isBuyer = user?.role === "buyer";

  const { data, isLoading } = useGetBuyerOrdersQuery(
    {
      id: user._id,
      query: search,
    },
    { skip: !isBuyer }
  );

  const handleSearchOrder = (e) => {
    e.preventDefault();
  };

  const columns = [
    {
      key: "title",
      header: "Product",
      render: (_, row) => (
        <Link
          to={`/products-details/${row?.product?._id}`}
          className="flex items-center gap-2"
        >
          <img
            src={row?.product?.imageUrl[0]}
            alt="Image"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{row.product?.title}</span>
        </Link>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (_, row) => row.product?.price,
    },
    {
      key: "quantity",
      header: "Quantity",
    },
    {
      key: "totalPrice",
      header: "Total",
    },
    {
      key: "status",
      header: "Status",
      render: (_, row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "delivered"
              ? "bg-green-100 text-green-600"
              : row.status === "cancelled"
              ? "bg-red-100 text-red-600"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {row.status[0].toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "orderDate",
      render: (_, row) =>
        new Date(row.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
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
      )}
    </>
  );
}

export default MyOrders;
