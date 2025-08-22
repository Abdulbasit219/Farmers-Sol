import React from "react";
import Button from "./Button";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

function ActionButton({ onView, onEdit, variant, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      {variant === "user" && (
        <Button
          className="text-primary cursor-pointer hover:opacity-50"
          onClick={onEdit}
          title="Edit"
        >
          <FaRegEdit className="text-xl" />
        </Button>
      )}
      {variant === "admin" && (
        <Button
          className="text-primary cursor-pointer hover:opacity-50"
          onClick={onView}
          title="View User"
        >
          <FaEye className="text-xl" />
        </Button>
      )}
      <Button
        className="text-red-600 cursor-pointer hover:opacity-50"
        onClick={onDelete}
        title="Delete"
      >
        <MdOutlineDelete className="text-xl" />
      </Button>
    </div>
  );
}

export default ActionButton;
