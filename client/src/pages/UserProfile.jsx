import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarIcon from "../assets/avatarIcon.jpg";
import Button from "../components/ui/Button";
import { useState } from "react";
import EyeIcon from "../components/ui/EyeIcon";
import { useUpdateUserMutation } from "../redux/ApiSlice";
import { handleError, handleSuccess } from "../Utils";
import { setUser } from "../redux/UserSlice";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";

function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    profilePic: null,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name || user?.name);
      form.append("password", formData.password);
      if (formData.profilePic) {
        form.append("profilePic", formData.profilePic);
      }
      const res = await updateUser({ id: user._id, formData: form }).unwrap();

      if (res.success) {
        handleSuccess(res.message);
        dispatch(setUser(res.user));
      } else {
        handleError(res.message);
      }
    } catch (err) {
      handleError(err.data.message)
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user?.name || "",
        email: user?.email || "",
      }));
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container mx-auto m-8 p-8 flex flex-col md:flex-row gap-[20px] justify-between"
        >
          {/* image icon and role badge */}
          <div className="w-full md:w-[40%] flex flex-col items-center">
            <img
              className="w-30 h-30 md:h-50 md:w-50 p-1 rounded-full dark:ring-gray-500 cursor-pointer"
              src={preview || user?.profilePic || avatarIcon}
              alt="profilePic"
              onClick={openFilePicker}
            />
            <h1 className="text-primary font-bold text-2xl mt-2">
              {user?.name}
            </h1>
            <span className="text-primary text-md mt-2 font-medium me-2 px-2.5 py-0.5 rounded-sm bg-[#E4F8E2]">
              {user?.role}
            </span>
          </div>

          {/* input fields */}
          <div className="w-full md:w-[60%]">
            {/* name */}
            <div className="flex justify-center">
              <div className="flex flex-col gap-3 w-full md:w-[80%]">
                <label className="block text-primary font-medium mb-1 text-2xl">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="outline-none sm:flex-1 px-4 py-3 border border-primary-300 rounded-lg"
                />
              </div>
            </div>

            {/* email */}
            <div className="flex justify-center mt-4">
              <div className="flex flex-col gap-3 w-full md:w-[80%]">
                <label className="block text-primary font-medium mb-1 text-2xl">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  placeholder="Enter Title For Your Name"
                  className="outline-none sm:flex-1 px-4 py-3 border border-primary-300 rounded-lg"
                />
              </div>
            </div>

            {/* password */}
            <div className="flex justify-center mt-4">
              <div className="relative flex flex-col gap-3 w-full md:w-[80%]">
                <label className="block text-primary font-medium mb-1 text-2xl">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Change Password"
                  className="outline-none sm:flex-1 px-4 py-3 border border-primary-300 rounded-lg"
                />
                <div className="absolute top-18 right-2 cursor-pointer">
                  <EyeIcon
                    visible={showPassword}
                    toggle={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>
            </div>

            {/* update button */}
            <div className="flex justify-center mt-4">
              <div className="w-full md:w-[80%]">
                <Button
                  className="bg-primary text-white px-6 py-3 hover:bg-white hover:text-primary cursor-pointer transition-all duration-300 border"
                  type="submit"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>

          <input
            type="file"
            name="profilePic"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
          />
        </form>
      )}
    </>
  );
}

export default UserProfile;
