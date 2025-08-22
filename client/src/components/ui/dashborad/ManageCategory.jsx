import React, { useEffect, useState } from "react";
import Search from "../Search";
import DataTable from "../DataTable";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import ActionButton from "../ActionButton";
import Button from "../Button";
import { FaPlus } from "react-icons/fa";
import EditModal from "../modal/EditModal";
import AddModal from "../modal/AddModal";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/ApiSlice";
import { handleError, handleSuccess } from "../../../Utils";
import LoadingOverlay from "../loading/LoadingOverlay";
import DeleteModal from "../modal/DeleteModal";

function ManageCategory() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cat, setCat] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    categories: fetchCategories,
    isLoading: isCategoryLoading,
    refetchCategories,
  } = useCategoryFilter(search);

  const columns = [{ key: "name", header: "Name" }];

  const filterCategory = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleteLoading }] =
    useDeleteCategoryMutation();

  const handleCreateCategory = async (name) => {
    try {
      const res = await createCategory(name).unwrap();
      if (res.success) {
        handleSuccess(res.message);
        setCategories((prev) => [...prev, res.category]);
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error?.data?.message);
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      const res = await updateCategory({ id, name }).unwrap();
      if (res.success) {
        handleSuccess(res.message);
        refetchCategories();
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res.success) {
        handleSuccess(res.message);
        refetchCategories();
      } else {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error?.data?.message || "Failed to Delete category");
    }
  };

  const anyLoading =
    isLoading || isUpdateLoading || isCategoryLoading || isDeleteLoading;

  useEffect(() => {
    if (
      fetchCategories &&
      JSON.stringify(fetchCategories) !== JSON.stringify(categories)
    ) {
      setCategories(fetchCategories);
    }
  }, [fetchCategories, categories]);

  return (
    <>
      {anyLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="w-full rounded-lg overflow-x-auto px-2 sm:px-0">
          <h1 className="p-2 text-2xl font-bold text-primary">
            Manage Category
          </h1>

          <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
            {/* search and add buttons */}
            <div className="flex flex-row-reverse w-full justify-between items-center gap-4 py-4 px-4 flex-wrap">
              <div className="sm:w-auto">
                <Button
                  className="bg-primary hover:bg-white hover:text-primary cursor-pointer text-white border px-6 py-3 flex items-center gap-1"
                  onClick={() => setAddModalOpen(true)}
                >
                  <span>
                    <FaPlus className="text-md" />
                  </span>
                  Add New
                </Button>
              </div>
              <div>
                <Search search={search} setSearch={setSearch}  />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filterCategory}
              renderActions={(category) => (
                <ActionButton
                  variant="user"
                  onEdit={() => {
                    setCat(category);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => {
                    setIsDeleteModalOpen(true);
                    setCat(category);
                  }}
                />
              )}
            />
          </div>

          {/* for update category */}
          {isModalOpen && (
            <EditModal
              variant="category"
              product={cat}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              handleUpdateCategory={handleUpdateCategory}
            />
          )}

          {/* for create category */}
          {addModalOpen && (
            <AddModal
              isOpen={addModalOpen}
              onClose={() => setAddModalOpen(false)}
              createCat={handleCreateCategory}
            />
          )}

          {/* for delete category */}
          {isDeleteModalOpen && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              item={cat}
              onDelete={handleDelete}
              itemNameKey="name"
            />
          )}
        </div>
      )}
    </>
  );
}

export default ManageCategory;
