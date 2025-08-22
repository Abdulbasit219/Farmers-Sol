import ModalWrapper from "./ModalWrapper";
import avatarIcon from "../../../assets/avatarIcon.jpg";

function UserModal({ user, closeModal, isOpen }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        {/* img */}
        <div className="px-4 py-5 sm:px-6 flex justify-center">
          <img
            className="w-20 h-20 md:h-50 md:w-50 p-1 rounded-full dark:ring-gray-500 cursor-pointer"
            src={user?.profilePic || avatarIcon}
            alt="profilePic"
          />
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.role}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Admin</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.isAdmin === 1 ? "Admin" : "Not Admin"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default UserModal;
