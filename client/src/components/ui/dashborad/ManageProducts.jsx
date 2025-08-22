import { useEffect, useState } from "react";
import ActionButton from "../ActionButton";
import Search from "../Search";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import DataTable from "../DataTable";
import { FaCircle } from "react-icons/fa";
import Dropdown from "../Dropdown";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";
import {
  useApproveProductMutation,
  useDeleteProductsMutation,
  useFilterProductsMutation,
  useGetProductsQuery,
} from "../../../redux/ApiSlice";
import { handleError, handleSuccess } from "../../../Utils";
import Pagination from "../Pagination";
import LoadingOverlay from "../loading/LoadingOverlay";
import useSearchProducts from "../../../hooks/useSearchProducts";

function ManageProducts() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const {
    search,
    setSearch,
    searchResults,
    isSearching,
    isSearchLoading,
    handleSearchProduct,
  } = useSearchProducts();

  const { categories } = useCategoryFilter();

  const [approveProduct, { isLoading: isApproveLoading }] =
    useApproveProductMutation();
  const [deleteProducts, { isLoading: isDeleteLoading }] =
    useDeleteProductsMutation();
  const [filterProducts, { isLoading: isFilterLoading }] =
    useFilterProductsMutation();

  const { data } = useGetProductsQuery({ page, admin: true });

  const columns = [
    // title
    {
      key: "title",
      header: "Product Name",
      render: (_, row) => (
        <div className="flex items-center">
          <img
            src={row.imageUrl[0]}
            alt="product"
            className="w-10 h-10 rounded-full"
          />
          <div className="ps-3">
            <div className="font-semibold">{row.title}</div>
          </div>
        </div>
      ),
    },

    // price
    {
      key: "price",
      header: "Price",
    },

    // quantity
    {
      key: "quantity",
      header: "Quantity",
      render: (value, row) => `${value} ${row.unit}`,
    },

    // category
    {
      key: "category",
      header: "Category",
      render: (_, row) => (
        <div className="flex items-center">
          {categories.find((cat) => cat._id === row.category)?.name ||
            "unKnown"}
        </div>
      ),
    },

    // status
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

    // description
    {
      key: "description",
      header: "Description",
      render: (desc) =>
        desc.length > 20 ? desc.substring(0, 20) + "..." : desc,
    },
  ];

  const statusMenuItems = [
    {
      label: "All",
      onClick: () => {
        setStatusFilter("All");
        fetchProductsByStatus("All");
      },
    },
    {
      label: "Pending",
      onClick: () => {
        setStatusFilter("pending");
        fetchProductsByStatus("pending");
      },
    },
    {
      label: "Approved",
      onClick: () => {
        setStatusFilter("approved");
        fetchProductsByStatus("approved");
      },
    },
  ];

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await approveProduct({ id, status }).unwrap();
      if (res.success) {
        handleSuccess(res.message);

        // auto update if change status
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p))
        );
        setIsModalOpen(false);
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProducts(id).unwrap();
      handleSuccess(res.message);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const fetchProductsByStatus = async (status) => {
    try {
      const res = await filterProducts(status).unwrap();
      if (res.success) {
        setProducts(res.filterResult);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error filtering:", error);
      setProducts([]);
    }
  };

  const displayProducts = isSearching ? searchResults : products;

  useEffect(() => {
    if (data?.products.length && data?.products !== products) {
      setProducts(data?.products);
    }
  }, [data?.products]);

  if (
    isSearchLoading ||
    isApproveLoading ||
    isDeleteLoading ||
    isFilterLoading
  ) {
    return <LoadingOverlay />;
  }

  return (
    <div className="w-full rounded-lg overflow-x-auto px-2 sm:px-0">
      <h1 className="p-2 text-2xl font-bold text-primary">Manage Products</h1>

      <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
        {/* search and filter buttons */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 px-4">
          <div className="flex items-center cursor-pointer text-md">
            <Dropdown
              buttonContent={statusFilter}
              menuItems={statusMenuItems}
              svg={true}
              position="left-0"
              className="bg-[#E4F8E2] text-primary font-semibold"
              header="Filter by Status"
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center justify-between sm:w-auto">
            <Search
              setSearch={setSearch}
              search={search}
              handleSearchProduct={handleSearchProduct}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={displayProducts}
          renderActions={(product) => (
            <ActionButton
              variant="user"
              onEdit={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
              onDelete={() => {
                setSelectedProduct(product);
                setIsDeleteModalOpen(true);
              }}
            />
          )}
        />

        <Pagination
          page={page}
          totalPages={data?.totalPages}
          setPage={setPage}
        />
      </div>

      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          product={selectedProduct}
          variant="admin"
          onClose={() => setIsModalOpen(false)}
          statusUpdate={handleStatusUpdate}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          variant="admin"
          item={selectedProduct}
          itemNameKey="title"
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}

export default ManageProducts;
