import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";
import zxcvbn from "zxcvbn";

const SignUp = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [apiError, setApiError] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleCPasswordVisibility = () =>
    setIsCPasswordVisible(!isCPasswordVisible);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = "You must agree to the terms.";
    }
    if (passwordStrength < 2) {
      newErrors.password =
        "Password is too weak. Please choose a stronger password.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordStrength(zxcvbn(value).score);
    }

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
      const names = formData.name.trim().split(/\s+/);
      const response = await axios.post(
        "https://directly-core.onrender.com/users",
        {
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      navigate("/verify-email");
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    return (
      ["#ff4444", "#ffbb33", "#00C851", "#33b5e5"][passwordStrength] ||
      "#ff4444"
    );
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
            onClick={
              name === "password"
                ? togglePasswordVisibility
                : toggleCPasswordVisibility
            }
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
    <div className="w-screen h-screen flex flex-row md:p-0 py-10">
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
        <div className="w-full ">
          <img src={logo} alt="Logo" className="w-32 mt-24 mb-8 md:hidden" />

          <div className="w-full md:w-4/5 text-center mb-6">
            <h2 className="text-2xl md:text-3xl text-[#001F3F] font-black">
              Sign Up!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter details below to Sign Up
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
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
            />

            <InputField
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
            />

            <InputField
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              icon={isPasswordVisible ? Eye : EyeOff}
            />

            {formData.password && (
              <div className="w-full md:w-4/5 mt-2">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div
                    className="h-full rounded transition-all duration-300"
                    style={{
                      width: `${(passwordStrength + 1) * 25}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Password strength:{" "}
                  {
                    ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"][
                      passwordStrength
                    ]
                  }
                </p>
              </div>
            )}

            <InputField
              type={isCPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              icon={isCPasswordVisible ? Eye : EyeOff}
            />

            <div className="flex items-start space-x-2 text-sm w-full md:w-4/5">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                className="mt-1"
                disabled={isLoading}
              />
              <p className="text-gray-600">
                By clicking "Sign Up" below you agree to the terms & policy
              </p>
            </div>

            <button
              type="submit"
              className={`w-full md:w-4/5 p-3 text-black font-bold rounded transition-all ${
                formData.termsAgreed && !isLoading
                  ? "bg-[#FF851B] hover:bg-[#FF851B]"
                  : "bg-[#FF851B]/70 cursor-not-allowed"
              }`}
              disabled={!formData.termsAgreed || isLoading}
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
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="text-center text-sm mt-2">
              <p>
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#001F3F] font-bold hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>

            <div className="w-full md:w-4/5">
              <SocialAuth action="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
