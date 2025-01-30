import { useState } from "react";
import { useNavigate, Link, data } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName) return "Name is required";
    if (!formData.email) return "Email is required";
    if (!formData.email.includes("@")) return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords don't match";
    if (!formData.agreedToTerms) return "Please agree to terms and policy";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const names = formData.fullName.trim().split(/\s+/);
      const response = await axios.post(
        "https://directly-core.onrender.com/users",
        {
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status == 201) {
        console.log("Success");
        navigate("/verify-email", { state: { email: formData.email } });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>
      <div className="md:hidden fixed inset-0">
        <div className="flex h-full">
          <div className="w-1/2 bg-white"></div>
          <div
            className="w-4/5 bg-cover bg-center h-full"
            style={{ backgroundImage: `url(${bgright})` }}
          ></div>
        </div>
      </div>
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
              Enter details below to Sign Up
            </p>
          </div>

          {error && (
            <div className="w-full md:w-4/5 mx-auto text-center  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
              {error}
            </div>
          )}

          <form
            className="flex flex-col gap-4 items-center p-4 "
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="shadow-md w-full p-3 mb-2 rounded"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-md w-full p-3 mb-2 rounded"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow-md w-full p-3 mb-2 rounded"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="relative w-full md:w-4/5">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="shadow-md w-full p-3 mb-2 rounded"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm w-full md:w-4/5">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-1"
                disabled={loading}
              />
              <p className="text-gray-600">
                By clicking "Sign Up" below you agree to the terms & policy
              </p>
            </div>

            <button
              type="submit"
              className={`w-full md:w-4/5 p-3 text-black font-bold rounded transition-all ${
                formData.agreedToTerms && !loading
                  ? "bg-[#FF851B] hover:bg-[#FF851B]"
                  : "bg-[#FF851B]/70 cursor-not-allowed"
              }`}
              disabled={!formData.agreedToTerms || loading}
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
