import { useState } from "react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setMessage("Reset link sent successfully!");
      setIsLoading(false);
    }, 2000);
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
          <img src={logo} alt="Logo" className="w-1/4 md:hidden mr-auto ml-4" />

          {/* Header */}
          <div className="flex flex-col gap-2 mb-20 justify-center items-center">
            <h2 className="text-3xl text-[#6C31F6] font-black">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email and we will send a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form
            className="w-[90%] md:w-full flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-[#97B2DE]/10 w-full p-3"
              required
            />

            {message && (
              <p
                className={`text-sm ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                } mt-2`}
              >
                {message}
              </p>
            )}

            <button
              className={`bg-[#6C31F6] w-full p-3  text-white font-bold ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {/* Back to Login Option */}
          <div className="mt-4 text-sm text-center">
            <Link
              to="/signin"
              className="text-[#6C31F6] font-bold hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
