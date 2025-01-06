import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      const response = await axios.post(
        "https://directly-core.onrender.com/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      if (user && !user.isEmailVerified) {
        try {
          await axios.post(
            "https://directly-core.onrender.com/auth/resend-verification",
            { email: formData.email }
          );
          setApiError(
            "Email not verified. A new verification email has been sent to your inbox."
          );
          return;
        } catch {
          setApiError(
            "Email not verified. Please check your inbox for the verification link."
          );
          return;
        }
      }

      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during sign in"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ type, name, placeholder, value, icon: Icon }) => (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full md:w-4/5">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`shadow-md w-full p-3 mb-2 rounded ${
            errors[name] ? "border-red-500" : ""
          }`}
          disabled={isLoading}
        />
        {Icon && (
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Icon size={20} />
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 w-full md:w-4/5">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-screen h-screen flex flex-row md:p-0 ">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>
      <div className="absolute inset-0 md:hidden">
        <div className="w-full h-full flex fixed">
          <div className="w-1/2 bg-white"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgright})` }}
          ></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center relative">
        <div className="w-full">
          <img src={logo} alt="Logo" className="w-32 fixed top-0 md:hidden" />

          <div className="w-full md:w-4/5 text-center mt-14 mb-6">
            <h2 className="text-2xl md:text-3xl text-[#001F3F] font-black">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Sign in with your credentials below
            </p>
          </div>

          {apiError && (
            <div className="w-full md:w-4/5 mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {apiError}
            </div>
          )}

          <form
            className="flex flex-col gap-4 items-center p-4"
            onSubmit={handleSubmit}
          >
            <InputField
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
            />

            <InputField
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              icon={isVisible ? Eye : EyeOff}
            />

            <div className="flex justify-between w-full md:w-4/5">
              <div className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mt-1"
                  disabled={isLoading}
                />
                <p className="text-gray-600">Remember me</p>
              </div>
              <Link
                to="/forgot-password"
                className="text-[#6C31F6] text-sm font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full md:w-4/5 p-3 text-black font-bold rounded transition-all ${
                isLoading
                  ? "bg-[#FF851B]/70 cursor-not-allowed"
                  : "bg-[#FF851B] hover:bg-[#FF851B]"
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
