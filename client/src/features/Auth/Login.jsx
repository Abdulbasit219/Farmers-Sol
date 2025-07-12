import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function Login() {
  return (
    <div className="min-h-screen bg-[#FFFBEE] flex justify-center items-center px-4">
      <form className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">Login to SabzLink</h2>
        <div>
          <label className="block text-gray-800 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="ali@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
        <div>
          <label className="block text-gray-800 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
        <Button className="w-full cursor-pointer bg-primary hover:bg-white hover:border hover:border-primary text-white hover:text-primary transition duration-200">
          Login
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
