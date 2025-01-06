import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your password change API call here
      navigate("/signin");
    } catch (error) {
      setApiError(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ type, name, placeholder, value }) => (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full md:w-4/5">
        <input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`shadow-md w-full p-3 mb-2 rounded ${
            errors[name] ? "border-red-500" : ""
          }`}
          disabled={isLoading}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
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
    <div className="w-screen h-screen flex flex-row md:p-0">
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
              Change Password
            </h2>
            <p className="text-sm text-gray-600 mt-2">Create New Password</p>
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
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
            />

            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
            />

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
                  Processing...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="w-full md:w-4/5 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <Link
                to="/signin"
                className="text-[#001F3F] font-bold hover:underline"
              >
                Back to Login
              </Link>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
