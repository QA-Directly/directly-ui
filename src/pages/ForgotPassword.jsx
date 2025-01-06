import { useState } from "react";
import { Link } from "react-router-dom";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(
        "https://directly-core.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to send reset link");

      setMessage({
        text: "Reset link sent successfully! Please check your email.",
        type: "success",
      });
      setEmail("");
    } catch (err) {
      setMessage({
        text: err.message || "Failed to send reset link. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ type, name, placeholder, value, onChange }) => (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full md:w-4/5">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="shadow-md w-full p-3 mb-2 rounded"
          disabled={isLoading}
          required
        />
      </div>
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
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email and we will send a link to reset your password.
            </p>
          </div>

          {message.text && (
            <div
              className={`w-full md:w-4/5 mx-auto ${
                message.type === "success"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } px-4 py-3 rounded relative mb-4 border`}
            >
              {message.text}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center text-sm mt-2">
              <p>
                Remember your password?{" "}
                <Link
                  to="/signin"
                  className="text-[#001F3F] font-bold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
