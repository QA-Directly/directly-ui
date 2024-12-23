import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // First, let's check if the email is verified
      const response = await axios.post(
        "https://directly-core.onrender.com/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      // Check if user exists and is verified
      if (user && !user.isEmailVerified) {
        // If email is not verified, send a new verification email
        try {
          await axios.post(
            "https://directly-core.onrender.com/auth/resend-verification",
            { email: formData.email }
          );
          setApiError(
            "Email not verified. A new verification email has been sent to your inbox."
          );
          return;
        } catch (resendError) {
          setApiError(
            "Email not verified. Please check your inbox for the verification link."
          );
          return;
        }
      }

      // If we get here, the email is verified
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.includes("not verified")
      ) {
        // Handle specific verification error
        try {
          await axios.post(
            "https://directly-core.onrender.com/auth/resend-verification",
            { email: formData.email }
          );
          setApiError(
            "Email not verified. A new verification link has been sent to your inbox."
          );
        } catch (resendError) {
          setApiError(
            "Email not verified. Please check your inbox for the verification link."
          );
        }
      } else {
        setApiError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred during sign in"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>

      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-4 md:px-8 py-6 md:py-12">
        <div className="w-full max-w-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-1/4 mb-5 md:hidden mr-auto ml-4"
          />

          <div className="flex flex-col gap-2 mb-20 justify-center items-center">
            <h2 className="text-3xl text-[#6C31F6] font-black">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-600">
              Sign in with your credentials below
            </p>
          </div>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {apiError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={`bg-[#97B2DE]/10 w-full p-3 rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative w-full">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className={`bg-[#97B2DE]/10 w-full p-3 rounded ${
                  errors.password ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={toggleVisibility}
                disabled={isLoading}
              >
                {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="w-full text-right">
              <Link
                to="/forgot-password"
                className="text-[#6C31F6] text-sm font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`bg-[#6C31F6] w-full p-3 text-white font-bold rounded transition-all ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#5826d9]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="mt-4 text-sm text-center">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#6C31F6] font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="w-full mt-6">
              <SocialAuth action="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
