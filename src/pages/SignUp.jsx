import { useState } from "react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleCPasswordVisibility = () => {
    setIsCPasswordVisible(!isCPasswordVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAgreed)
      newErrors.termsAgreed = "You must agree to the terms.";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Sign Up Successful!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-4 md:px-8 py-6 md:py-12">
        <div className="w-full max-w-lg">
          {/* Logo for mobile */}
          <img src={logo} alt="Logo" className="w-32 mb-8 md:hidden" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black">
              Sign Up!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter details below to Sign Up
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="bg-[#97B2DE]/10 w-full p-3 rounded"
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
                className="bg-[#97B2DE]/10 w-full p-3 rounded"
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
                className="bg-[#97B2DE]/10 w-full p-3 rounded"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
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
                className="bg-[#97B2DE]/10 w-full p-3 rounded"
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
                formData.termsAgreed
                  ? "bg-[#6C31F6] hover:bg-[#5826d9]"
                  : "bg-[#6C31F6]/70 cursor-not-allowed"
              }`}
              disabled={!formData.termsAgreed}
            >
              Sign Up
            </button>

            {/* Navigation to Login Page */}
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

            {/* Social Auth */}
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
