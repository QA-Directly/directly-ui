import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";
import { useAuth } from "../Contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  // Form validation
  const validateForm = () => {
    if (!formData.email) return "Email is required.";
    if (!formData.password) return "Password is required.";
    return null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://directly-core.onrender.com/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const token = response.data.id;
      login(token);

      navigate("/");
    } catch (err) {
      if (
        err.response.data.message == "Email not verified. Please verify email"
      ) {
        setError(
          "Email not verified. Please check your email to verify your account."
        );
        console.log("Error: ", err);
        return;
      }
      if (err.response.data.message == "User not found") {
        setError("User not found. Proceed to register an account.");
        console.log("Error: ", err);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>
      {/* Background image for smaller screens */}
      <div className="md:hidden fixed inset-0">
        <div className="flex h-full">
          <div className="w-1/2 bg-white"></div>
          <div
            className="w-4/5 bg-cover bg-center h-full"
            style={{ backgroundImage: `url(${bgright})` }}
          ></div>
        </div>
      </div>
      {/* Main content */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center relative">
        <div className="w-full px-4 md:px-8">
          <img
            src={logo}
            alt="Logo"
            className="w-32 fixed top-0 left-0 md:hidden z-10"
          />
          <div className="w-full flex flex-col items-center pt-20 md:pt-16">
            <h2 className="text-2xl md:text-3xl text-[#001F3F] font-black">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Sign in with your credentials below
            </p>
          </div>

          {/* Display error message if there is an error */}
          {error && (
            <div className="w-[90%] md:w-4/5 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          {/* SignIn form */}
          <form
            className="flex flex-col gap-4 items-center p-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="shadow-md w-full p-3 mb-2 rounded"
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow-md w-full p-3 mb-2 rounded"
                />
                <button
                  className="absolute right-3 top-3 text-gray"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-between w-full md:w-4/5">
              <div className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mt-1"
                  disabled={loading}
                />
                <p className="text-gray-600">Remember me</p>
              </div>
              <Link
                to="/forgot-password"
                className="text-[#6C31F6] text-sm font-bold hover:underline text-right"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full md:w-4/5 p-3 text-black font-bold rounded transition-all ${
                loading
                  ? "bg-[#FF851B]/70 cursor-not-allowed"
                  : "bg-[#FF851B] hover:bg-[#FF851B]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-sm mt-2">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#001F3F] font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="w-full md:w-4/5">
              <SocialAuth action="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
