import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
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
      const result = zxcvbn(value);
      setPasswordStrength(result.score);
    }

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
      const response = await fetch(
        "https://your-heroku-app.herokuapp.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store the token if your API returns one
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Redirect to dashboard or verification page
      navigate("/dashboard");
    } catch (error) {
      setApiError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ["#ff4444", "#ffbb33", "#00C851", "#33b5e5"];
    return colors[passwordStrength] || "#ff4444";
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>
      {/* main content */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-4 md:px-8 py-6 md:py-12">
        <div className="w-full max-w-lg">
          <img src={logo} alt="Logo" className="w-32 mb-8 md:hidden" />
          {/* header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black">
              Sign Up!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter details below to Sign Up
            </p>
          </div>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {apiError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={`bg-[#97B2DE]/10 w-full p-3 rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
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

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
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
                className="absolute right-3 top-3 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {formData.password && (
                <div className="mt-2">
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={isCPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className={`bg-[#97B2DE]/10 w-full p-3 rounded ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={toggleCPasswordVisibility}
              >
                {isCPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2 text-sm">
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
            {errors.termsAgreed && (
              <p className="text-red-500 text-sm">{errors.termsAgreed}</p>
            )}

            <button
              type="submit"
              className={`w-full p-3 text-white font-bold rounded transition-all ${
                formData.termsAgreed && !isLoading
                  ? "bg-[#6C31F6] hover:bg-[#5826d9]"
                  : "bg-[#6C31F6]/70 cursor-not-allowed"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#6C31F6] font-bold hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>

            <div className="w-full mt-6">
              <SocialAuth action="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
