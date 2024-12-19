import { useState } from "react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import SocialAuth from "../components/SocialAuth";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Simulate sign-in API call
      await signInUser(email, password); // Replace with actual API call
    } catch (error) {
      setErrors({ general: "Sign-in failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-1/4 mb-5 md:hidden mr-auto ml-4"
          />

          {/* Header */}
          <div className="flex flex-col gap-2 mb-20 justify-center items-center">
            <h2 className="text-3xl text-[#6C31F6] font-black">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-600">
              Sign in with your credentials below
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <p className="text-red-500 text-sm mt-2">{errors.general}</p>
          )}

          {/* Form */}
          <form
            className="w-[90%] md:w-full flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="bg-[#97B2DE]/10 w-full p-3 "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <div className="relative w-full">
              <input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="bg-[#97B2DE]/10 w-full p-3 "
              />
              {isVisible ? (
                <Eye
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={toggleVisibility}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={toggleVisibility}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* Forgot Password Link */}
            <div className="w-full text-right text-sm">
              <Link
                to={"/forgot-password"}
                className="text-[#6C31F6] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`bg-[#6C31F6] w-full p-3 text-white font-bold ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Navigation to Sign Up Page */}
          <div className="mt-4 text-sm text-center">
            <p>
              Don’t have an account?{" "}
              <Link
                to={"/signup"}
                className="text-[#6C31F6] font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Social Auth */}
          <div className="w-full mt-6">
            <SocialAuth action={"Sign In"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
