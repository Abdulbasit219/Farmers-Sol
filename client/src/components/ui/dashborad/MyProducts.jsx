import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Search from "../Search";
import LoadingOverlay from "../loading/LoadingOverlay";
import { useSelector } from "react-redux";
import {
  useDeleteProductsMutation,
  useGetProductsByFarmerIdQuery,
  useUpdateProductMutation,
} from "../../../redux/ApiSlice";
import { handleError, handleSuccess } from "../../../Utils";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";
import ActionButton from "../ActionButton";
import DataTable from "../DataTable";
import Pagination from "../Pagination";

function MyProducts() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);

  const { user } = useSelector((state) => state.user);

  const isFarmer = user?.role === "farmer";

  const {
    data,
    isLoading: farmerProductLoading,
    refetch,
  } = useGetProductsByFarmerIdQuery(
    { id: user?._id, page, query: search },
    { skip: !isFarmer }
  );

  const [deleteProducts] = useDeleteProductsMutation();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleUpdateProduct = async (
    id,
    imageIndex = null,
    updatedData = null
  ) => {
    try {
      let body;

      if (updateProduct) {
        body = new FormData();
        Object.entries(updatedData).forEach(([key, value]) => {
          if (key === "newImages") {
            value.forEach((file) => body.append("imageUrl", file)); // image files
          } else {
            body.append(key, value);
          }
        });
      }

      const res = await updateProduct({
        productId: id,
        imageIndex,
        updatedData: body,
      }).unwrap();

      if (res.success) {
        handleSuccess(res.message);
      } else {
        handleError(res.message);
      }

      if (imageIndex !== null) {
        setSelectedProduct((prev) => {
          if (!prev) return prev;
          const updatedImages = [...prev.imageUrl];
          updatedImages.splice(imageIndex, 1);
          return { ...prev, imageUrl: updatedImages };
        });
      }

      refetch();
    } catch (error) {
      console.error("Failed to remove image", error);
      handleError(error);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const res = await deleteProducts(id).unwrap();
      handleSuccess(res.message);
      refetch();
      setIsModalOpen(false);
      setSelectedProduct(null);
      setModalType(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = [
    {
      key: "title",
      header: "Name",
      render: (_, row) => (
        <div className="flex items-center">
          <img
            src={row.imageUrl[0]}
            alt="product"
            className="w-10 h-10 rounded-full"
          />
          <div className="ps-3">
            <div className="font-semibold">{row.title}</div>
            <div className="text-sm text-gray-500">
              {row.description.length > 50
                ? row.description.substring(0, 30) + "..."
                : row.description}
            </div>
          </div>
        </div>
      ),
    },
    { key: "price", header: "Price" },
    {
      key: "quantity",
      header: "Quantity",
      render: (value, row) => `${value} ${row.unit}`,
    },
    {
      key: "status",
      header: "Status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status[0].toUpperCase() + status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <div>
      {farmerProductLoading || isLoading ? (
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
                  handleSearchProduct={(e) => {
                    e.preventDefault();
                    setPage(1);
                    refetch();
                  }}
                />
              </div>
            </div>

            {/* table */}
            <DataTable
              columns={columns}
              data={data?.products || []}
              renderActions={(product) => (
                <ActionButton
                  variant="user"
                  onEdit={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                    setModalType("edit");
                  }}
                  onDelete={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                    setModalType("delete");
                  }}
                />
              )}
            />

            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.pagination?.totalPages}
            />
          </div>
        </div>
      )}

      {modalType === "edit" && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedProduct(null);
            setIsModalOpen(false);
            setModalType(null);
          }}
          product={selectedProduct}
          modalType={modalType}
          onDelete={handleConfirmDelete}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}

      {modalType === "delete" && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedProduct(null);
            setIsModalOpen(false);
            setModalType(null);
          }}
          item={selectedProduct}
          modalType={modalType}
          onDelete={handleConfirmDelete}
          itemNameKey="title"
        />
      )}
    </div>
  );
}

export default MyProducts;
