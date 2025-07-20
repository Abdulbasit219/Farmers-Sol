import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useRegisterUserMutation } from "../../redux/ApiSlice";
import EyeIcon from "../../components/ui/EyeIcon";
import { handleError, handleSuccess } from "../../Utils";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPass, setShowPass] = useState(false);

  const [registerUser, { isLoading, error, data }] = useRegisterUserMutation();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      handleError("All fields are Required");
      return;
    }

    try {
      const res = await registerUser(formData).unwrap();
      handleSuccess(res.message);
    } catch (error) {
      handleError(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEE] flex justify-center items-center px-4">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primary text-center">
          Join SabzLink
        </h2>

        {/* name field */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Ali"
            value={formData.name}
            onChange={handleOnChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        {/* email */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ali@gmail.com"
            value={formData.email}
            onChange={handleOnChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        {/* password */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              onChange={handleOnChange}
              value={formData.password}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />

            <EyeIcon
              visible={showPass}
              toggle={() => setShowPass((prev) => !prev)}
            />
          </div>
        </div>

        {/* role */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Role</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            name="role"
            value={formData.role}
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Select your role
            </option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        {/* submit button */}
        <Button
          className="w-full cursor-pointer bg-primary hover:bg-white hover:border hover:border-primary text-white hover:text-primary transition duration-200"
          type="submit"
        >
          {isLoading ? "Signing up ..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
