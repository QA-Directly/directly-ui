import { useState } from "react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

    // Simulate Sign Up API call
    alert("Sign Up Successful!");
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <AuthPageSideBar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center">
        <div className="w-full md:w-[60%] h-auto flex flex-col justify-between items-center text-center md:my-12">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-1/4 mb-5 md:hidden mr-auto ml-4"
          />

          {/* Header */}
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-3xl font-bold">Sign Up!</h2>
            <p className="text-sm text-gray-600">
              Enter details below to Sign Up
            </p>
          </div>

          {/* Form */}
          <form
            className="w-[90%] md:w-full flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="bg-[#97B2DE]/10 w-full p-3 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="bg-[#97B2DE]/10 w-full p-3 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="bg-[#97B2DE]/10 w-full p-3 rounded-md"
              />
              {isPasswordVisible ? (
                <Eye
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className=" w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="bg-[#97B2DE]/10 w-full p-3 rounded-md"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center text-xs p-2">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                className="mr-2"
              />
              <p className="text-gray-600">
                By clicking "Sign Up" below you agree to the terms & policy
              </p>
              {errors.termsAgreed && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.termsAgreed}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-md text-white font-bold ${
                formData.termsAgreed
                  ? "bg-[#6C31F6]"
                  : "bg-[#6C31F6]/70 cursor-not-allowed"
              }`}
              disabled={!formData.termsAgreed}
            >
              Sign Up
            </button>
          </form>

          {/* Navigation to Login Page */}
          <div className="mt-4 text-sm">
            <p>
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="text-[#6C31F6] font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Social Auth */}
          <div className="w-full mt-6">
            <SocialAuth action={"Sign Up"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
