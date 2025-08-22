import { useState } from "react";
import Search from "../Search";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../redux/ApiSlice";
import ActionButton from "../ActionButton";
import avatar from "../../../assets/avatarIcon.jpg";
import LoadingOverlay from "../loading/LoadingOverlay";
import UserModal from "../modal/UserModal";
import { handleError, handleSuccess } from "../../../Utils";
import DeleteModal from "../modal/DeleteModal";
import DataTable from "../DataTable";

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading } = useGetUserQuery(search);
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res.success) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        handleSuccess(res.message);
      } else {
        handleError(res.message);
      }
    } catch (error) {
      console.error(`Failed to delete user ${error}`);
    }
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (_, row) => (
        <div className="flex items-center">
          <img
            src={row.profilePic || avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ps-3 font-semibold">{row.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="w-full rounded-lg overflow-x-auto px-2 sm:px-0">
          <h1 className="p-2 text-2xl font-bold text-primary">Manage Users</h1>

          <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
            {/* search and filter buttons */}
            <div className="flex items-center justify-between gap-4 py-4 px-4 flex-wrap">
              <div className="w-full sm:w-auto">
                <Search
                  search={search}
                  setSearch={setSearch}
                  handleSearchProduct={handleSearchUser}
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={data?.users}
              renderActions={(user) => (
                <ActionButton
                  variant="admin"
                  onView={() => {
                    setIsModalOpen(true);
                    setSelectedUser(user);
                  }}
                  onDelete={() => {
                    setIsDeleteModalOpen(true);
                    setSelectedUser(user);
                  }}
                />
              )}
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          user={selectedUser}
          closeModal={() => {
            setSelectedUser(null);
            setIsModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setSelectedUser(null);
            setIsDeleteModalOpen(false);
          }}
          item={selectedUser}
          onDelete={handleDeleteUser}
          itemNameKey="name"
        />
      )}
    </>
  );
}

export default ManageUsers;
