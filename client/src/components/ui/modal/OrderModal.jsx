import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { handleError, handleSuccess } from "../../../Utils";
import { useCreateOrderMutation } from "../../../redux/ApiSlice";
import LoadingOverlay from "../loading/LoadingOverlay";

function OrderModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    buyer: "",
    product: "",
    quantity: "",
    totalPrice: 0,
    phoneNumber: "",
  });

  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      const quantity = Number(value) || 0;
      const totalPrice = product?.price * quantity;

      setFormData((prev) => ({
        ...prev,
        quantity,
        totalPrice,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        buyer: user?._id,
        product: product?._id,
      };

      if (
        !payload.buyer ||
        !payload.phoneNumber ||
        !payload.product ||
        !payload.quantity ||
        !payload.totalPrice
      ) {
        return handleError("All fields are required");
      }

      if (payload.quantity > product?.quantity) {
        return handleError(
          `The quantity must be less than or equal to ${product?.quantity}`
        );
      }

      const res = await createOrder(payload).unwrap();
      if (res.success) {
        handleSuccess(
          "Successfully order has been placed you will be contacted soon"
        );
      } else {
        handleError(res.message);
      }
      onClose();
    } catch (error) {
      handleError(error || "Failed to buy Product");
    }
  };

  if(isLoading){
    return <LoadingOverlay />
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        <h1 className="text-lg font-semibold">Order Product</h1>

        {/* title */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="title"
            value={product?.title}
            placeholder="Enter Title For Your Product"
            className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
            disabled
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Quantity <span>({product?.unit})</span>
          </label>
          <input
            type="Number"
            name="quantity"
            onChange={handleChange}
            value={formData.quantity}
            placeholder={`Enter Quantity Upto ${product.quantity}`}
            className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* phone number */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
            placeholder="Enter Title For Your Product"
            className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-2">
          <Button className="px-6 py-3 bg-gray-200 border hover:text-white hover:bg-primary cursor-pointer">
            Cancel
          </Button>
          <Button className="px-6 py-3 bg-primary border text-white hover:text-primary hover:bg-white cursor-pointer">
            Confirm Order
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default OrderModal;
