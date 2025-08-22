import { useEffect, useRef, useState } from "react";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { MdDelete } from "react-icons/md";
import { handleSuccess } from "../../../Utils";

function EditModal({
  isOpen,
  onClose,
  product,
  handleUpdateProduct,
  variant,
  statusUpdate,
  handleUpdateCategory,
}) {
  const fileInputRef = useRef(null);
  const { categories, isLoading } = useCategoryFilter();

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]); // for UI
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    unit: "",
    category: "",
    description: "",
    status: "",
  });

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (files.length + newFiles.length > 5) {
      handleSuccess("You can upload a maximum of 5 images.");
      e.target.value = "";
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      newImages: files,
    };

    handleUpdateProduct(product._id, null, updatedData);
    onClose();
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setFormData((prev) => ({ ...prev, status: newStatus }));
    await statusUpdate(product._id, newStatus);
  };

  useEffect(() => {
    if (product) {
      if (variant === "category") {
        setFormData({
          category: product.name || "",
        });
      } else {
        setFormData({
          title: product.title || "",
          price: product.price || "",
          quantity: product.quantity || "",
          unit: product.unit || "",
          category: product.category || "",
          status: product.status || "",
          description: product.description || "",
        });
        setPreviews(product.imageUrl || []);
        setFiles(product.imageUrl);
      }
    }
  }, [product, variant]);

  if (!product) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Fields */}
      <div className="flex-1 space-y-6">
        {/* main heading */}
        <h1 className="text-lg font-semibold">
          {variant === "admin" ? "Change Status" : "Update Product:"}
        </h1>

        {variant !== "category" && (
          <div>
            {/* only for admin for images */}
            {variant === "admin" && (
              <div className="flex flex-wrap gap-2">
                {previews.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`existing-${index}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* title & price */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Title
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter Title For Your Product"
                  className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                  disabled={variant === "admin" ? true : false}
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Expected Price $"
                  className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  disabled={variant === "admin" ? true : false}
                />
              </div>
            </div>

            {/* price & unit */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Quantity
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  value={formData.quantity}
                  placeholder="Enter quantity"
                  className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  disabled={variant === "admin" ? true : false}
                />

                {/* unit */}
                <select
                  name="unit"
                  onChange={handleChange}
                  className="w-full outline-none sm:w-[140px] px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.unit}
                  disabled={variant === "admin" ? true : false}
                >
                  <option value="" disabled selected>
                    Select Unit
                  </option>
                  <option value="kg">Kg</option>
                  <option value="tons">Tons</option>
                  <option value="quintal">Quintal</option>
                  <option value="liters">Liters</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>
            </div>

            {/* category */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 cursor-pointer rounded-lg outline-none"
                disabled={variant === "admin" ? true : false}
              >
                <option value="">Select category</option>
                {isLoading && <option>Loading...</option>}
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                placeholder="Write something about the crop, variety, conditions, or any important details..."
                rows={4}
                value={formData.description.trim()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none"
                disabled={variant === "admin" ? true : false}
              ></textarea>
            </div>

            {/* status */}
            <div className="text-gray-700 mb-4">
              <strong>Status:</strong>
              {variant === "admin" ? (
                <div>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none cursor-pointer"
                    value={formData.status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Change Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Reject</option>
                  </select>
                </div>
              ) : (
                <span
                  className={`${
                    product.status !== "pending"
                      ? "text-green-600"
                      : "text-red-600"
                  } px-2 font-bol`}
                >
                  {formData.status}
                </span>
              )}
            </div>

            {/* preview,delete and upload image */}
            {variant !== "admin" && (
              <div className="flex my-2 gap-x-2 cursor-pointer flex-wrap">
                {previews.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`existing-${index}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />

                    <Button
                      type="button"
                      onClick={() =>
                        handleUpdateProduct(product._id, index, {})
                      }
                      className="absolute -top-0 -right-0 text-red-600 rounded-full flex items-center justify-center cursor-pointer text-lg hover:opacity-50"
                      title="Delete"
                    >
                      <MdDelete />
                    </Button>
                  </div>
                ))}

                {/* Upload Button if total images < 5 */}
                {files.length < 5 && (
                  <div
                    className="w-20 h-20 flex items-center justify-center border border-dashed rounded-md text-gray-400 cursor-pointer hover:border-gray-500"
                    onClick={openFilePicker}
                  >
                    +
                  </div>
                )}
              </div>
            )}

            {/* for user to update/save  the changes  */}
            {variant !== "admin" && (
              <div className="flex justify-center mt-4 ">
                <Button
                  className="bg-primary text-md text-white py-3 cursor-pointer px-6 hover:border hover:text-primary hover:bg-white transition-all duration-500"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        )}

        {variant === "category" && (
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Category
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter Category Name"
                className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="bg-primary text-md text-white py-3 cursor-pointer px-6 hover:border hover:text-primary hover:bg-white transition-all duration-500"
                onClick={() => {
                  handleUpdateCategory(product._id, formData.category);
                  onClose();
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* hidden input for user to add file */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          multiple
        />
      </div>
    </ModalWrapper>
  );
}

export default EditModal;
