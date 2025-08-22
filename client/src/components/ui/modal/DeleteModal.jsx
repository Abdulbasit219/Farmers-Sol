import Button from "../Button";
import ModalWrapper from "./ModalWrapper";

function DeleteModal({ isOpen, onClose, item, onDelete, itemNameKey }) {
  if (!item) return null;
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Confirm Deletion
      </h2>
      <p className="mb-4">
        Are you sure you want to delete <strong>{item[itemNameKey]}</strong>
      </p>
      <div className="flex justify-end gap-2">
        <Button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDelete(item._id);
            onClose();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </ModalWrapper>
  );
}

export default DeleteModal;
