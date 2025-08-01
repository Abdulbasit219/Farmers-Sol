import { useState } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { handleSuccess } from "../../Utils";

function Uploader({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (files.length + newFiles.length > 5) {
      handleSuccess("You can upload a maximum of 5 images.");
      e.target.value = "";
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    const updatedFiles = [...files, ...newFiles];
    const updatedPreviews = [...previewImages, ...newPreviews];

    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    onFilesSelected(updatedFiles);
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    // clean memory
    URL.revokeObjectURL(previewImages[index]);
    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    onFilesSelected(updatedFiles);
  };

  return (
    <div>
      <div className="flex justify-center items-center sm:mt-[40px]">
        <div className="w-full max-w-md">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {previewImages.map((src, index) => (
              <div key={index} className="relative mt-3">
                <img
                  key={index}
                  src={src}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-3 -right-6 text-[#2D6A4F] rounded-full flex items-center justify-center cursor-pointer text-lg"
                >
                  <MdDelete />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
