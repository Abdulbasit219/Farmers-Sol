import { useState } from "react";
import Search from "../Search";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../redux/ApiSlice";
import DataTable from "../DataTable";
import Avatar from "../../../assets/avatarIcon.jpg";
import ActionButton from "../ActionButton";
import Pagination from "../Pagination";
import LoadingOverlay from "../loading/LoadingOverlay";
import DeleteModal from "../modal/DeleteModal";
import { handleError, handleSuccess } from "../../../Utils";

function ManageOrders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [order, setOrder] = useState();

  const { data, isLoading, refetch } = useGetAllOrdersQuery({ page, search });
  const [deleteOrder, { isLoading: isDeleteLoading }] =
    useDeleteOrderMutation();

  const columns = [
    {
      key: "buyerDetails",
      header: "Customer",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.buyerDetails?.profilePic || Avatar}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{row.buyerDetails?.name}</span>
            <span className="text-[12px]">{row.buyerDetails?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "ProductsDetails",
      header: "Products",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.ProductsDetails?.imageUrl?.[0]}
            alt="product"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{row.ProductsDetails?.title}</span>
        </div>
      ),
    },
    {
      key: "productOwner",
      header: "Product Owner",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.productOwner?.profilePic || Avatar}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{row.productOwner?.name}</span>
            <span className="text-[12px]">{row.productOwner?.email}</span>
          </div>
        </div>
      ),
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
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "delivered"
              ? "bg-green-100 text-green-600"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : row.status === "cancelled"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {row.status}
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

  const handleDeleteOrder = async (id) => {
    try {
      const res = await deleteOrder(id).unwrap();
      if (res.success) {
        handleSuccess(res.message);
        refetch();
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error?.data?.message || "Failed to delete order");
    }
  };

  const handleSearchProduct = (e) => {
    e.preventDefault();
  };

  const anyLoading = isLoading || isDeleteLoading;

  return (
    <>
      {anyLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="w-full rounded-lg overflow-x-auto px-2 sm:px-0">
          <h1 className="p-2 text-2xl font-bold text-primary">Manage Orders</h1>
          <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
            {/* search */}
            <div className="flex items-center gap-4 py-4 px-4 flex-wrap">
              <Search
                search={search}
                setSearch={setSearch}
                handleSearchProduct={handleSearchProduct}
              />
            </div>

            <DataTable
              columns={columns}
              data={data?.orders || []}
              renderActions={(order) => (
                <ActionButton
                  onDelete={() => {
                    setIsDeleteModalOpen(true);
                    setOrder(order);
                  }}
                />
              )}
            />
          </div>

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.totalPages}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          item={order}
          onDelete={handleDeleteOrder}
          // itemNameKey="ProductsDetails.title"
        />
      )}
    </>
  );
}

export default ManageOrders;
