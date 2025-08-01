import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import EyeIcon from "../../components/ui/EyeIcon";
import { useLoginUserMutation } from "../../redux/ApiSlice";
import { handleError, handleSuccess } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/UserSlice";
import LoadingOverlay from "../../components/ui/loading/LoadingOverlay";
function Login() {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = signIn;
    if (!email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const res = await loginUser(signIn).unwrap();
      const { message, success, user } = res;
      if (success) {
        handleSuccess(message);
        dispatch(setUser(user));
        navigate(from, { replace: true });
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-[#FFFBEE] flex justify-center items-center px-4">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-primary text-center">
          Login to SabzLink
        </h2>

        {/* email  */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleOnChange}
            placeholder="ali@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        {/* password */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
            />
            <EyeIcon
              visible={showPass}
              toggle={() => setShowPass((prev) => !prev)}
            />
          </div>
        </div>

        <Button
          className="w-full cursor-pointer bg-primary hover:bg-white hover:border hover:border-primary text-white hover:text-primary transition duration-200"
          type="submit"
        >
          {isLoading ? "Signing in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up now
          </Link>
        </p>

        {error && (
          <p className="text-red-500">
            {error.data?.message || "Login failed. Try again."}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
