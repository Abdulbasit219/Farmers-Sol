import { useState } from "react";
import Button from "../components/ui/Button";
import Uploader from "../components/ui/Uploader";
import {
  useCreateProductsMutation,
  useGetCategoriesQuery,
} from "../redux/ApiSlice";
import { handleError, handleSuccess } from "../Utils";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    quantity: "",
    unit: "",
    category: "",
    description: "",
  });
  const [files, setFiles] = useState([]);

  const handleImageSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const {
    isLoading: isCategoriesLoading,
    data: categoriesData,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [createProducts, { isLoading, data, error }] =
    useCreateProductsMutation();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.title.trim() ||
      !product.price ||
      !product.quantity ||
      !product.unit.trim() ||
      !product.category ||
      !product.description.trim() ||
      files.length === 0
    ) {
      handleError("Please fill in all fields and upload at least one image.");
      return;
    }
    const form = e.target;
    const formData = new FormData(form);

    files.forEach((file) => {
      formData.append("imageUrl", file);
    });

    try {
      const res = await createProducts(formData).unwrap();
      handleSuccess(res.message);
      form.reset();
      setFiles([]);
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-[#FFFBEE] px-4 py-10">
      {/* main heading */}
      <div className="text-center mb-10 w-[95%]">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">
          List Your Crop
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to list your farm product
        </p>
      </div>

      <div className="bg-white border w-[95%] md:w-[85%] mx-auto border-gray-200 shadow-md rounded-2xl">
        <form className="p-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Form Fields */}
            <div className="flex-1 space-y-6">
              {/* Title & price */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Title
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="title"
                    onChange={handleOnchange}
                    placeholder="Enter Title For Your Product"
                    className="w-full outline-none sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                  />

                  <input
                    type="number"
                    name="price"
                    onChange={handleOnchange}
                    placeholder="Expected Price $"
                    className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Quantity & unit*/}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Quantity
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    name="quantity"
                    onChange={handleOnchange}
                    placeholder="Enter quantity"
                    className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  />

                  {/* unit */}
                  <select
                    name="unit"
                    onChange={handleOnchange}
                    className="w-full outline-none sm:w-[140px] px-4 py-3 border border-gray-300 rounded-lg"
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

              {/* Category */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleOnchange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                >
                  <option value="">Select category</option>
                  {isCategoriesLoading && <option>Loading...</option>}
                  {categoriesError && <option>Error loading categories</option>}
                  {categoriesData?.categories?.map((cat) => (
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
                  onChange={handleOnchange}
                  placeholder="Write something about the crop, variety, conditions, or any important details..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none outline-none"
                ></textarea>
              </div>
            </div>

            {/* Right: Uploader*/}
            <div>
              <label className="block w-full md:w-80 text-gray-800 font-medium">
                Upload Image
              </label>
              <Uploader onFilesSelected={handleImageSelect} />
            </div>
          </div>

          {/* submit button  */}
          <div className="flex justify-center mt-6">
            <Button
              className="bg-primary w-[50%]  hover:bg-white hover:border text-white hover:text-black hover:cursor-pointer"
              type="submit"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
