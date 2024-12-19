import { useState } from "react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    setError("");

    try {
      const response = await fetch(
        "https://your-heroku-app.herokuapp.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage({
        text: "Reset link sent successfully! Please check your email.",
        type: "success",
      });
      setEmail("");
    } catch (err) {
      setError(err.message || "An error occurred while sending the reset link");
      setMessage({
        text: err.message || "Failed to send reset link. Please try again.",
        type: "error",
      });
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
          <img src={logo} alt="Logo" className="w-32 mb-8 md:hidden" />

          {/* Header */}
          <div className="flex flex-col gap-2 mb-12 justify-center items-center">
            <h2 className="text-3xl text-[#6C31F6] font-black">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Enter your email and we will send a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-[#97B2DE]/10 w-full p-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {message.text && (
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                } mt-2 text-center`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              className={`bg-[#6C31F6] w-full p-3 text-white font-bold rounded transition-all
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#5826d9]"
                }
              `}
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
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to Login Option */}
            <div className="mt-4 text-sm text-center">
              <Link
                to="/signin"
                className="text-[#6C31F6] font-bold hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
